import hotelFaq from "../data/hotelFaq.js";

// Ported from the AI/ML team's dgep_chatbot.ipynb.
const STOP_WORDS = new Set([
  "what", "is", "the", "a", "an", "do", "does", "how", "can", "i", "you",
  "your", "me", "my", "to", "at", "in", "of", "and", "when", "where",
  "please", "tell", "about", "have", "gym",
]);
const MATCH_THRESHOLD = 0.5;
const UNKNOWN_ANSWER =
  "I'm sorry, I don't have information about that. Please contact hotel reception for assistance.";

function termCounts(text) {
  const tokens = (text.toLowerCase().match(/\b[a-z]{2,}\b/g) || []).filter(
    (token) => !STOP_WORDS.has(token),
  );
  const counts = new Map();

  for (const token of tokens) {
    counts.set(token, (counts.get(token) || 0) + 1);
  }
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const bigram = tokens[index] + " " + tokens[index + 1];
    counts.set(bigram, (counts.get(bigram) || 0) + 1);
  }
  return counts;
}

const questions = hotelFaq.flatMap(({ question, variations, answer }) =>
  [question, ...variations].map((text) => ({ text, answer })),
);
const questionTerms = questions.map(({ text }) => termCounts(text));
const documentFrequencies = new Map();

for (const terms of questionTerms) {
  for (const term of terms.keys()) {
    documentFrequencies.set(term, (documentFrequencies.get(term) || 0) + 1);
  }
}

function normalize(terms) {
  const vector = new Map();
  let squaredLength = 0;

  for (const [term, count] of terms) {
    const frequency = documentFrequencies.get(term);
    if (!frequency) continue;
    // scikit-learn defaults: smooth_idf=True, sublinear_tf=False, norm="l2".
    const weight = count * (Math.log((1 + questions.length) / (1 + frequency)) + 1);
    vector.set(term, weight);
    squaredLength += weight * weight;
  }

  const length = Math.sqrt(squaredLength);
  if (length > 0) {
    for (const [term, weight] of vector) {
      vector.set(term, weight / length);
    }
  }
  return vector;
}

const questionVectors = questionTerms.map(normalize);

export const conciergeTopics = hotelFaq.map(({ label, question }) => ({
  label,
  question,
}));

export function getConciergeMatch(message) {
  if (!message || !message.trim()) {
    return {
      answer: "Please enter a question so I can assist you.",
      confidence: 1,
      kind: "empty",
    };
  }

  const cleaned = message.toLowerCase().trim().replace(/[^a-z0-9\s]/g, " ");
  const greeting = cleaned.replace(/\s+/g, " ").trim();
  if (/^(hi|hello|hey)(?: there)?$/.test(greeting)) {
    return {
      answer: "Hello! Welcome to Elan Hotels. I can help with breakfast, check-in and checkout, the pool, Wi-Fi, or housekeeping. What would you like to know?",
      confidence: 1,
      kind: "greeting",
    };
  }

  const guestVector = normalize(termCounts(cleaned));
  if (guestVector.size === 0) {
    return { answer: UNKNOWN_ANSWER, confidence: 0, kind: "unmatched" };
  }

  let bestScore = 0;
  let bestAnswer = UNKNOWN_ANSWER;
  for (const [index, vector] of questionVectors.entries()) {
    let score = 0;
    for (const [term, weight] of guestVector) {
      score += weight * (vector.get(term) || 0);
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = questions[index].answer;
    }
  }

  const matched = bestScore >= MATCH_THRESHOLD;
  return {
    answer: matched ? bestAnswer : UNKNOWN_ANSWER,
    confidence: Math.min(1, bestScore),
    kind: matched ? "faq" : "unmatched",
  };
}

export function getConciergeReply(message) {
  return getConciergeMatch(message).answer;
}
