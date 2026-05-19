"use client";

import React from "react";
import "./Gbtn.css";

export default function AnimatedButton({
  isLoading = false,
  onClick,
  disabled = false,
  label = "Generate Site",
}) {
  return (
    <div className="generate-button-wrapper">
      <button
        type="button"
        className="generate-button"
        onClick={onClick}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
      >
        {!isLoading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="sparkle"
          >
            <path
              className="path"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"
            />
          </svg>
        )}

        <div className={`loader ${isLoading ? "visible" : ""}`}>
          <div className="spinner"></div>
        </div>

        <span className="text-button">
          {isLoading ? "Generating..." : label}
        </span>
      </button>
    </div>
  );
}