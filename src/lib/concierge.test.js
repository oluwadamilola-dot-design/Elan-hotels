import assert from "node:assert/strict";
import test from "node:test";
import hotelFaq from "../data/hotelFaq.js";
import { conciergeTopics, getConciergeMatch, getConciergeReply } from "./concierge.js";

const fallback =
  "I'm sorry, I don't have information about that. Please contact hotel reception for assistance.";

test("answers all approved questions and variations from the AI/ML notebook", () => {
  for (const { question, variations, answer } of hotelFaq) {
    for (const text of [question, ...variations]) {
      assert.equal(getConciergeReply(text), answer, text);
    }
  }
});

test("preserves the notebook's five demonstration questions", () => {
  const questions = [
    "When can I have breakfast?",
    "What time should I leave my room?",
    "Can I swim at the hotel?",
    "Do you provide internet?",
    "I need to speak to housekeeping.",
  ];
  questions.forEach((question, index) => {
    assert.equal(getConciergeReply(question), hotelFaq[index].answer, question);
  });
});

test("normalizes case and punctuation", () => {
  assert.equal(getConciergeReply("  BREAKFAST!!!  "), hotelFaq[0].answer);
  assert.equal(getConciergeReply("Is WI-FI available?"), hotelFaq[3].answer);
});

test("falls back for unknown vocabulary and weak similarity", () => {
  assert.equal(getConciergeReply("Where is the nearest museum?"), fallback);
  assert.equal(getConciergeReply("time services pool breakfast internet housekeeping"), fallback);
});

test("handles empty questions without inventing an answer", () => {
  for (const question of ["", "   ", undefined, null]) {
    assert.equal(getConciergeReply(question), "Please enter a question so I can assist you.");
  }
  assert.equal(getConciergeReply("?! 123456"), fallback);
});

test("suggested topics use the team's questions", () => {
  assert.equal(conciergeTopics.length, 5);
  conciergeTopics.forEach((topic, index) => {
    assert.equal(topic.question, hotelFaq[index].question);
    assert.equal(getConciergeReply(topic.question), hotelFaq[index].answer);
  });
});

test("greets hi, hello, and hey with case and punctuation variations", () => {
  for (const question of ["hi", "hello", "hey", "HI!", " Hello. ", "hey there!", "hi 👋"]) {
    const match = getConciergeMatch(question);
    assert.equal(match.kind, "greeting", question);
    assert.match(match.answer, /Hello! Welcome to Elan Hotels/);
    assert.equal(match.confidence, 1);
  }
});

test("a greeting prefix does not replace a guest's actual question", () => {
  assert.equal(getConciergeReply("Hi, what time is breakfast served?"), hotelFaq[0].answer);
  assert.notEqual(getConciergeMatch("highway").kind, "greeting");
});
