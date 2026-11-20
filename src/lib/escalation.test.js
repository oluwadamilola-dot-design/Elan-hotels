import assert from "node:assert/strict";
import test from "node:test";
import hotelFaq from "../data/hotelFaq.js";
import { evaluateAndRoute, scoreUrgency } from "./escalation.js";
import { getConciergeResponse } from "./conciergeResponse.js";

const suppliedCases = [
  ["Standard FAQ", "What time is breakfast served?", 0.95, 1, null],
  ["Low confidence", "Can I bring my pet iguana?", 0.42, 1, "ESC-001"],
  ["Explicit staff request", "I want to speak to a human agent please", 0.88, 1, "ESC-002"],
  ["Repeated fallback", "This isn't answering my question", 0.61, 2, "ESC-003"],
  ["Billing issue", "My Paystack payment failed and money was debited", 0.78, 1, "ESC-004"],
  ["Urgent maintenance", "My AC is leaking water all over the floor", 0.5, 1, "ESC-005"],
];

for (const [name, queryText, botConfidence, turnCount, expectedId] of suppliedCases) {
  test("Data Science case: " + name, () => {
    const result = evaluateAndRoute({ queryText, botConfidence, turnCount });
    assert.equal(result.escalate, expectedId !== null);
    assert.equal(result.escalation_details?.esc_id ?? null, expectedId);
  });
}

test("constructs a pending handoff payload with UTC time and optional guest context", () => {
  const transcript = [{ role: "user", content: "Can I speak to an agent?" }];
  const result = evaluateAndRoute({
    queryText: "Can I speak to an agent?", botConfidence: 0.9,
    guestContext: { guest_id: "DEMO-1", full_name: "Demo Guest", session_transcript: transcript },
  });
  assert.equal(result.status, "HANDOFF_REQUIRED");
  assert.equal(result.csr_payload.guest_id, "DEMO-1");
  assert.equal(result.csr_payload.guest_name, "Demo Guest");
  assert.equal(result.csr_payload.room_number, null);
  assert.equal(result.csr_payload.booking_id, null);
  assert.deepEqual(result.csr_payload.session_transcript, transcript);
  assert.match(result.csr_payload.timestamp, /^\d{4}-\d{2}-\d{2}T.*Z$/);
  assert.doesNotMatch(result.escalation_details.bot_response, /connecting|created|alerted|transferring|routing/i);
});

test("distinguishes Urgent, High, and Medium requests", () => {
  assert.equal(scoreUrgency("There is no water in my room"), "Urgent");
  assert.equal(scoreUrgency("My payment failed"), "High");
  assert.equal(scoreUrgency("What time is breakfast?"), "Medium");
});

test("avoids substring matches inside personal and contact", () => {
  assert.equal(evaluateAndRoute({
    queryText: "Are there personalized packages?", botConfidence: 0.95,
  }).escalate, false);
  assert.equal(evaluateAndRoute({
    queryText: "A broken contact form", botConfidence: 0.95,
  }).escalate, false);
});

test("applies confidence boundaries from the Data Science middleware", () => {
  assert.equal(evaluateAndRoute({ queryText: "Something else", botConfidence: 0.699 }).escalate, true);
  assert.equal(evaluateAndRoute({ queryText: "Something else", botConfidence: 0.7 }).escalate, false);
  assert.equal(evaluateAndRoute({ queryText: "My payment failed", botConfidence: 0.849 }).escalate, true);
  assert.equal(evaluateAndRoute({ queryText: "My payment failed", botConfidence: 0.85 }).escalate, false);
  assert.equal(evaluateAndRoute({ queryText: "Unknown", botConfidence: NaN }).escalate, true);
});

test("the integrated pipeline applies the stricter middleware cutoff to weak FAQ matches", () => {
  const result = getConciergeResponse("When should I leave my room?");
  assert(result.confidence >= 0.5 && result.confidence < 0.7);
  assert.equal(result.handoff.escalation_details.esc_id, "ESC-001");
});

test("prioritizes explicit staff requests and urgent maintenance over general fallback", () => {
  const explicit = evaluateAndRoute({
    queryText: "I need an agent about leaking water", botConfidence: 0, turnCount: 3,
  });
  assert.equal(explicit.escalation_details.esc_id, "ESC-002");
  assert.equal(explicit.escalation_details.urgency_level, "Urgent");
  const maintenance = evaluateAndRoute({
    queryText: "My AC is leaking water", botConfidence: 0, turnCount: 3,
  });
  assert.equal(maintenance.escalation_details.esc_id, "ESC-005");
});

test("answers every supplied FAQ variation through the integrated response pipeline", () => {
  for (const { question, variations, answer } of hotelFaq) {
    for (const text of [question, ...variations]) {
      const result = getConciergeResponse(text);
      assert.equal(result.answer, answer, text);
      assert.equal(result.handoff, null, text);
    }
  }
});

test("greetings bypass escalation and reset consecutive fallbacks", () => {
  for (const greeting of ["hi", "hello", "hey"]) {
    const result = getConciergeResponse(greeting, { fallbackCount: 2 });
    assert.equal(result.handoff, null);
    assert.equal(result.fallbackCount, 0);
    assert.equal(result.kind, "greeting");
  }
});

test("escalates the second consecutive miss, rather than the second conversation turn", () => {
  const first = getConciergeResponse("Can I bring my pet iguana?", { messages: [
    { role: "user", text: "Breakfast?" }, { role: "assistant", text: hotelFaq[0].answer },
  ] });
  assert.equal(first.handoff.escalation_details.esc_id, "ESC-001");
  assert.equal(first.fallbackCount, 1);
  const second = getConciergeResponse("Can I bring my pet iguana?", { fallbackCount: first.fallbackCount });
  assert.equal(second.handoff.escalation_details.esc_id, "ESC-003");
  const resolved = getConciergeResponse("What time is breakfast served?", { fallbackCount: 1 });
  assert.equal(resolved.fallbackCount, 0);
  assert.equal(resolved.handoff, null);
  assert.equal(getConciergeResponse("Can I bring my pet iguana?", resolved).handoff.escalation_details.esc_id, "ESC-001");
});

test("prepares real transcript content without inventing guest identity or sending requests", () => {
  const result = getConciergeResponse("Hey, my AC is leaking water", {
    messages: [{ role: "assistant", text: "How can I help?" }],
  });
  assert.equal(result.handoff.escalation_details.esc_id, "ESC-005");
  assert.equal(result.handoff.csr_payload.guest_id, null);
  assert.deepEqual(result.handoff.csr_payload.session_transcript, [
    { role: "assistant", content: "How can I help?" },
    { role: "user", content: "Hey, my AC is leaking water" },
  ]);
});
