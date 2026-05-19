import React, { useEffect, useState } from "react";
import { aiInvoiceModalStyles } from "../assets/dummyStyles";
import GeminiIcon from "./GeminiIcon";
import AnimatedButton from "../assets/GenerateBtn/Gbtn";

const AiInvoiceModal = ({
  open,
  onClose,
  onGenerate,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setText(initialText || "");
    setError("");
    setLoading(false);
  }, [open, initialText]);

  if (!open) return null;

  async function handleGenerateClick() {
    setError("");

    const raw = (text || "").trim();

    if (!raw) {
      setError("Please paste Invoice text to generate from AI.");
      return;
    }

    try {
      setLoading(true);

      const maybePromise = onGenerate && onGenerate(raw);

      if (maybePromise && typeof maybePromise.then === "function") {
        await maybePromise;
      }
    } catch (err) {
      console.error("onGenerate handle failed:", err);

      setError(err?.message || "Failed to generate. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={aiInvoiceModalStyles.overlay}>
      <div
        className={aiInvoiceModalStyles.backdrop}
        onClick={() => onClose && onClose()}
      />

      <div className={aiInvoiceModalStyles.modal}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className={aiInvoiceModalStyles.title}>
              <GeminiIcon className="w-6 h-6 group-hover:scale-110 transition-transform flex-none" />
              Create Invoice With AI
            </h3>

            <p className={aiInvoiceModalStyles.description}>
              Paste any text that contains invoice details (client, items, qty,
              prices) and we will attempt to extract an Invoice.
            </p>
          </div>

          <button
            onClick={() => onClose && onClose()}
            className={aiInvoiceModalStyles.closeButton}
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
          <label className={aiInvoiceModalStyles.label}>
            Paste Invoice Text
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`e.g. A person wants a logo design for her organic brand "GreenVibe." Quoted for $120 for 2 logo options and final delivery in PNG and Vector Format.`}
            rows={8}
            className={aiInvoiceModalStyles.textarea}
          />
        </div>

        {error && (
          <div className={aiInvoiceModalStyles.error} role="alert">
            {String(error)
              .split("\n")
              .map((line, i) => (
                <div key={i}>{line}</div>
              ))}

            {/quota|exhausted|resource_exhausted/i.test(String(error)) && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  color: "#374151",
                }}
              >
                Tip: AI is temporarily unavailable (quota). Try again in a few
                minutes, or create the invoice manually.
              </div>
            )}
          </div>
        )}

        <div className={aiInvoiceModalStyles.actions}>
          <AnimatedButton
            onClick={handleGenerateClick}
            isLoading={loading}
            disabled={loading}
            label="Generate"
          />
        </div>
      </div>
    </div>
  );
};

export default AiInvoiceModal;