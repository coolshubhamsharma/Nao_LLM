"use client";

import React, { useState } from "react";
import LanguageSelector from "../components/LanguageSelector";
import MicrophoneButton from "../components/MicrophoneButton";
import TranscriptBoxes from "../components/TranscriptBoxes";
import SpeakButton from "../components/SpeakButton";
import { motion } from "framer-motion";

export default function HomePage() {
  const [inputLang, setInputLang] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_INPUT_LANG || "en-US"
  );
  const [outputLang, setOutputLang] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_OUTPUT_LANG || "es"
  );
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  async function handleTranscript(chunk: string) {
    if (!chunk) return;

    setOriginalText((prev) => (prev ? prev + " " + chunk : chunk));

    setIsTranslating(true);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: chunk, inputLang, outputLang })
      });

      const data = await res.json();

      if (data.translation) {
        setTranslatedText((prev) =>
          prev ? prev + "\n" + data.translation : data.translation
        );
      }
    } finally {
      setIsTranslating(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-6 sm:px-6">
      {/* Header */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-700"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Nao Medical 
      </motion.h1>

      {/* Card Container */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-5 sm:p-6"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {/* Language UI */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <LanguageSelector
            inputLang={inputLang}
            outputLang={outputLang}
            onInputChange={setInputLang}
            onOutputChange={setOutputLang}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="mt-5 flex flex-col sm:flex-row items-center sm:justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <MicrophoneButton onTranscript={handleTranscript} />

          <SpeakButton translatedText={translatedText} />

          <span className="text-gray-500 text-sm sm:text-base">
            {isTranslating ? "Translating…" : "Idle"}
          </span>
        </motion.div>

        {/* Transcripts */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <TranscriptBoxes
            original={originalText}
            translated={translatedText}
          />
        </motion.div>
      </motion.div>
    </main>
  );
}
