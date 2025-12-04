"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LanguageSelector({
  inputLang,
  outputLang,
  onInputChange,
  onOutputChange
}: any) {
  const languages = [
    { code: "en-US", label: "English (US)" },
    { code: "es", label: "Spanish" },
    { code: "hi-IN", label: "Hindi" },
    { code: "bn", label: "Bengali" },
    { code: "ta", label: "Tamil" },
    { code: "te", label: "Telugu" }
  ];

  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Input Language */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium text-blue-700 mb-1">
          Patient Speaking
        </label>
        <motion.select
          whileTap={{ scale: 0.97 }}
          className="w-full border border-blue-300 p-2 rounded-lg shadow-sm bg-white
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={inputLang}
          onChange={(e) => onInputChange(e.target.value)}
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </motion.select>
      </div>

      {/* Output Language */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium text-blue-700 mb-1">
          Translate To
        </label>
        <motion.select
          whileTap={{ scale: 0.97 }}
          className="w-full border border-blue-300 p-2 rounded-lg shadow-sm bg-white
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={outputLang}
          onChange={(e) => onOutputChange(e.target.value)}
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </motion.select>
      </div>
    </motion.div>
  );
}
