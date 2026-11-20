import { useEffect, useRef, useState } from "react";
import conciergeIcon from "../assets/concierge.png";
import { conciergeTopics } from "../lib/concierge";
import { getConciergeResponse } from "../lib/conciergeResponse";
import "./AIConcierge.css";

const WELCOME = {
  role: "assistant",
  text: "Welcome to Elan Hotels. How can I help with your stay?",
};
const MAX_MESSAGE_LENGTH = 500;

export default function AIConcierge({ hidden = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState({ messages: [WELCOME], fallbackCount: 0 });
  const { messages } = conversation;
  const [draft, setDraft] = useState("");
  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const transcriptRef = useRef(null);
  const latestReply = messages.length > 1 ? messages.at(-1).text : "";

  useEffect(() => {
    if (isOpen && !hidden) inputRef.current?.focus();
  }, [isOpen, hidden]);

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (transcript && isOpen && !hidden) {
      transcript.scrollTop = transcript.scrollHeight;
    }
  }, [messages, isOpen, hidden]);

  function closeChat() {
    setIsOpen(false);
    launcherRef.current?.focus();
  }

  function sendMessage(text) {
    const question = text.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!question) return;

    setConversation((previous) => {
      const result = getConciergeResponse(question, previous);
      return {
        fallbackCount: result.fallbackCount,
        messages: [
          ...previous.messages,
          { role: "user", text: question },
          { role: "assistant", text: result.answer, handoff: result.handoff },
        ],
      };
    });
    setDraft("");
    inputRef.current?.focus();
  }

  function clearChat() {
    setConversation({ messages: [WELCOME], fallbackCount: 0 });
    setDraft("");
    inputRef.current?.focus();
  }

  return (
    <div
      className="ai-concierge"
      hidden={hidden}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          event.stopPropagation();
          closeChat();
        }
      }}
    >
      {isOpen && (
        <section
          className="ai-concierge__panel"
          id="ai-concierge-panel"
          role="dialog"
          aria-labelledby="ai-concierge-title"
          aria-describedby="ai-concierge-description"
        >
          <header className="ai-concierge__header">
            <img src={conciergeIcon} alt="" className="ai-concierge__emblem" />
            <div className="ai-concierge__heading">
              <h2 id="ai-concierge-title">Elan AI Concierge</h2>
              <p id="ai-concierge-description">Your hotel FAQ assistant</p>
            </div>
            <button
              type="button"
              className="ai-concierge__close"
              onClick={closeChat}
              aria-label="Close AI Concierge"
            >
              <span aria-hidden="true" />
            </button>
          </header>

          <div className="ai-concierge__transcript" ref={transcriptRef}>
            <ol className="ai-concierge__messages" aria-label="Conversation">
              {messages.map((message, index) => (
                <li
                  key={index}
                  className={"ai-concierge__message ai-concierge__message--" + message.role}
                >
                  <span className="ai-concierge__speaker">
                    {message.role === "user" ? "You" : "Elan Concierge"}
                  </span>
                  <p>{message.text}</p>
                </li>
              ))}
            </ol>
            {messages.length === 1 && (
              <div className="ai-concierge__topics" aria-label="Suggested questions">
                {conciergeTopics.map(({ label, question }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => sendMessage(question)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="ai-concierge__sr-only" role="status" aria-live="polite" aria-atomic="true">
            {latestReply && `Reply ${Math.floor(messages.length / 2)}. ${latestReply}`}
          </p>
          <form
            className="ai-concierge__composer"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
          >
            <label htmlFor="ai-concierge-question" className="ai-concierge__sr-only">
              Ask about your stay
            </label>
            <input
              ref={inputRef}
              id="ai-concierge-question"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Ask about your stay…"
              autoComplete="off"
            />
            <button type="submit" disabled={!draft.trim()}>Send</button>
          </form>
          <footer className="ai-concierge__footer">
            <p>Automated FAQ answers. For more help, contact reception.</p>
            <button type="button" onClick={clearChat}>Clear chat</button>
          </footer>
        </section>
      )}

      <button
        ref={launcherRef}
        className="ai-concierge__launcher"
        type="button"
        aria-expanded={isOpen}
        aria-controls={isOpen ? "ai-concierge-panel" : undefined}
        aria-label={isOpen ? "Close AI Concierge" : "Open AI Concierge"}
        onClick={() => {
          if (isOpen) closeChat();
          else setIsOpen(true);
        }}
      >
        <img src={conciergeIcon} alt="" />
        <span>AI Concierge</span>
      </button>
    </div>
  );
}
