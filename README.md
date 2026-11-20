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
- `src/lib/concierge.js` ports the notebook's scikit-learn matching logic.
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
notebook's five demonstration questions, and fallback behavior.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
