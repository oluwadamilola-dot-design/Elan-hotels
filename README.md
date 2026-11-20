# React + Vite

## Elan AI Concierge

The floating AI Concierge panel uses a JavaScript port of the AI/ML team's
`dgep_chatbot.ipynb` FAQ matcher in the browser. It preserves the supplied questions,
approved variations, answers, stop words, unigram and bigram TF-IDF features,
cosine similarity, and 0.50 minimum match score. This is an automated FAQ
retrieval assistant covering breakfast, check-in and checkout, the pool,
Wi-Fi, and housekeeping.

- `src/data/hotelFaq.js` contains the team's knowledge base. Confirm its service
  details with Product Management before using the answers with real guests.
- `src/lib/concierge.js` ports the notebook's scikit-learn matching logic and
  returns its similarity score. Standalone hi, hello, and hey greetings receive
  a welcome response before FAQ matching.
- `src/lib/escalation.js` ports the Data Science team's
  `test_escalation_engine.md` routing rules. `conciergeResponse.js` combines
  matching, conversation state, and escalation decisions.
- `src/components/AIConcierge.jsx` and its stylesheet add the chat panel using
  the hotel's existing colors, typography, and concierge artwork.
- Messages remain in React memory for the current page session. Closing the
  panel preserves the conversation. Clear chat or a page reload resets it.
- The chatbot runs locally in the browser and needs no API key or Colab runtime.
  It has no booking lookup, booking creation, payment, or staff-action access.
- The panel is hidden during checkout and existing booking dialogs so it does
  not cover those controls. The underlying booking handlers are unchanged.

Run `npm ci`, `npm run dev`, `npm test`, `npm run build`, and
`npm run lint` using the existing project tooling.

Demo checks: open AI Concierge on the home and rooms screens, choose a topic,
send a free-text question, send an unsupported question, close and reopen,
clear the conversation, and close with Escape. Repeat at mobile width.
The matcher tests exercise all 30 approved questions and variations, the
notebook's five demonstration questions, greeting variants, all six supplied
Data Science cases, routing boundaries, and consecutive fallback behavior.

### Escalation handoff

The widget prepares escalation decisions for unmatched questions (ESC-001),
explicit staff requests (ESC-002), repeated low-confidence replies (ESC-003),
billing issues (ESC-004), and urgent maintenance (ESC-005). Greeting-only
messages stay in the chatbot. Fallback counting resets after a greeting or
a successful FAQ answer.

The FAQ matcher retains its 0.50 similarity threshold. The integrated middleware
uses the team's stricter 0.70 threshold for fallback and 0.85 threshold for
billing routing. These values are similarity cutoffs, not calibrated
probabilities. Matching phrases uses whole words to avoid treating
"personalized" as "person" or "contact" as "ac".

The higher middleware cutoff changes some paraphrase responses. For example,
"When should I leave my room?" scores about 0.56, so the integrated chat
directs it to reception even though the FAQ matcher alone returns checkout
information. The exact approved FAQ questions and variations still pass.
Have the Data Science team review these cutoffs against guest questions before
treating the similarity score as a measure of answer reliability.

There is currently no CSR backend endpoint. An escalation result has
`status: "HANDOFF_REQUIRED"`, routing metadata in `escalation_details`, and
a `csr_payload` containing the guest's question, role-tagged transcript, optional
guest fields, and a UTC ISO timestamp. The assistant message retains this result
in its `handoff` property in React memory. The current widget directs guests to
reception and makes no claim that staff received a message or created a ticket.

When the backend endpoint is available, send the handoff from the user action
handler, handle delivery failure, and show a transfer or ticket acknowledgement
only after the backend confirms acceptance. Derive guest identity and permissions
on the server. Validate the payload and restrict staff access there as well.
The optional guest fields are currently null because the FAQ widget does not
read guest booking data. Clear chat also clears routing history.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
