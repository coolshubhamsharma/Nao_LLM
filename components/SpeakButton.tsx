"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Loader2 } from "lucide-react";

export default function SpeakButton({ translatedText }: { translatedText: string }) {
  const [loading, setLoading] = useState(false);

  async function speak() {
    if (!translatedText) return;

    setLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: translatedText })
      });

      const data = await res.json();
      if (!data.audioBase64) return;

      const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
      audio.play();
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.button
      onClick={speak}
      whileTap={{ scale: 0.92 }}
      disabled={loading || !translatedText}
      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-md text-white transition
        ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"}
        disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Processing…
        </>
      ) : (
        <>
          <Volume2 size={18} />
          Speak
        </>
      )}
    </motion.button>
  );
}
