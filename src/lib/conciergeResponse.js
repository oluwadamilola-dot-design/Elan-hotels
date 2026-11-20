import { getConciergeMatch } from "./concierge.js";
import { evaluateAndRoute, FALLBACK_THRESHOLD } from "./escalation.js";

export function getConciergeResponse(message, { fallbackCount = 0, messages = [] } = {}) {
  const match = getConciergeMatch(message);
  if (match.kind === "greeting" || match.kind === "empty") {
    return { ...match, fallbackCount: 0, handoff: null };
  }

  const nextFallbackCount = match.confidence < FALLBACK_THRESHOLD ? fallbackCount + 1 : 0;
  const routing = evaluateAndRoute({
    queryText: message,
    botConfidence: match.confidence,
    turnCount: nextFallbackCount,
    guestContext: {
      session_transcript: [
        ...messages.map(({ role, text }) => ({ role, content: text })),
        { role: "user", content: message },
      ],
    },
  });
  const handoff = routing.escalate ? routing : null;
  const isFallback = ["ESC-001", "ESC-003"].includes(handoff?.escalation_details.esc_id);

  return {
    ...match,
    answer: handoff ? handoff.escalation_details.bot_response : match.answer,
    fallbackCount: isFallback ? nextFallbackCount : 0,
    handoff,
  };
}
