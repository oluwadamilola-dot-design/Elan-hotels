// Browser port of the Data Science team's test_escalation_engine.md.
// This module prepares a handoff decision. A backend must deliver it to staff.
export const FALLBACK_THRESHOLD = 0.7;
const BILLING_THRESHOLD = 0.85;

function normalizeText(text) {
  return String(text ?? "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function includesPhrase(text, phrases) {
  const padded = " " + text + " ";
  return phrases.some((phrase) => padded.includes(" " + phrase + " "));
}

export function scoreUrgency(queryText) {
  const query = normalizeText(queryText);
  if (includesPhrase(query, [
    "broken", "leak", "no water", "no ac", "emergency", "stolen", "hazard",
    "injury", "keycard", "key card", "leaking",
  ])) return "Urgent";
  if (includesPhrase(query, [
    "failed", "double charge", "refund", "not working", "stuck",
    "complaint", "wrong", "debited",
  ])) return "High";
  return "Medium";
}

function requestsStaff(query) {
  return includesPhrase(query, [
    "agent", "agents", "representative", "representatives", "human agent",
    "live person", "speak to human", "speak to a human", "talk to a human",
    "speak to a person", "talk to a person", "speak to someone", "talk to someone",
    "need a person", "want a person", "connect front desk", "connect me to front desk",
    "connect me to the front desk", "speak to reception", "talk to reception",
    "talk to the front desk", "speak to the front desk",
  ]);
}

function buildPayload(rule, guestContext, queryText, urgency) {
  return {
    status: "HANDOFF_REQUIRED",
    escalate: true,
    escalation_details: {
      esc_id: rule.id,
      category: rule.category,
      action_type: rule.action,
      target_department: rule.department,
      bot_response: rule.answer,
      trigger_reason: rule.reason,
      urgency_level: urgency,
    },
    csr_payload: {
      guest_id: guestContext.guest_id ?? null,
      guest_name: guestContext.full_name ?? null,
      room_number: guestContext.room_number ?? null,
      booking_id: guestContext.booking_id ?? null,
      loyalty_tier: guestContext.loyalty_tier ?? "None",
      query_text: queryText,
      session_transcript: guestContext.session_transcript ?? [],
      timestamp: new Date().toISOString(),
    },
  };
}

export function evaluateAndRoute({
  guestContext = {}, queryText = "", botConfidence = 0, turnCount = 1,
}) {
  const query = normalizeText(queryText);
  const confidence = Number.isFinite(botConfidence)
    ? Math.max(0, Math.min(1, botConfidence))
    : 0;
  const urgency = scoreUrgency(query);
  let rule;

  if (requestsStaff(query)) {
    rule = {
      id: "ESC-002", category: "Explicit Request", action: "Direct Transfer",
      department: "Front Desk", reason: "explicit_user_request",
      answer: "For help from a staff member, please contact hotel reception directly.",
    };
  } else if (urgency === "Urgent" && includesPhrase(query, [
    "ac", "air conditioner", "leak", "leaking", "plumbing", "water",
    "door lock", "keycard", "key card", "power",
  ])) {
    rule = {
      id: "ESC-005", category: "Engineering & Facilities",
      action: "Service Request Creation & Alert",
      department: "Engineering / Housekeeping", reason: "urgent_facility_issue",
      answer: "This needs urgent staff attention. Please contact hotel reception immediately for maintenance assistance.",
    };
  } else if (confidence < BILLING_THRESHOLD && includesPhrase(query, [
    "payment", "payments", "paystack", "refund", "charged", "double charge",
    "failed payment", "receipt", "debited", "billing",
  ])) {
    rule = {
      id: "ESC-004", category: "Billing & Payments", action: "Priority Queue Transfer",
      department: "Finance / Front Desk", reason: "billing_verification_required",
      answer: "Billing questions need staff verification. Please contact hotel reception for help, and keep card details and payment PINs out of this chat.",
    };
  } else if (confidence < FALLBACK_THRESHOLD && turnCount >= 2) {
    rule = {
      id: "ESC-003", category: "System Fallback", action: "Automated Escalation",
      department: "Customer Support", reason: "repeated_low_confidence_fallback",
      answer: "I am still unable to find a reliable answer. Please contact hotel reception so a staff member can help.",
    };
  } else if (confidence < FALLBACK_THRESHOLD) {
    rule = {
      id: "ESC-001", category: "Unmatched Intent", action: "Fallback Handoff",
      department: "Front Desk / Concierge", reason: "out_of_distribution_low_confidence",
      answer: "I do not have a reliable FAQ answer for that. Please contact hotel reception for assistance.",
    };
  }

  return rule ? buildPayload(rule, guestContext, queryText, urgency) : {
    status: "SUCCESS", message: "Query handled by chatbot", escalate: false,
  };
}
