"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function TranscriptBoxes({
  original,
  translated,
}: {
  original: string;
  translated: string;
}) {
  const originalRef = useRef<HTMLDivElement | null>(null);
  const translatedRef = useRef<HTMLDivElement | null>(null);

  // auto-scroll to bottom on update
  useEffect(() => {
    if (originalRef.current)
      originalRef.current.scrollTop = originalRef.current.scrollHeight;
  }, [original]);

  useEffect(() => {
    if (translatedRef.current)
      translatedRef.current.scrollTop = translatedRef.current.scrollHeight;
  }, [translated]);

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
      {/* ORIGINAL BOX */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.25 }}
        className="bg-white rounded-xl shadow-md border border-blue-100 p-4 h-52 overflow-auto"
        ref={originalRef}
      >
        <h3 className="text-blue-700 font-medium text-sm tracking-wide">
          ORIGINAL TRANSCRIPT
        </h3>

        <p className="whitespace-pre-wrap mt-2 text-gray-800 text-sm leading-relaxed">
          {original?.trim() || "—"}
        </p>
      </motion.div>

      {/* TRANSLATED BOX */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.25, delay: 0.1 }}
        className="bg-white rounded-xl shadow-md border border-green-100 p-4 h-52 overflow-auto"
        ref={translatedRef}
      >
        <h3 className="text-green-700 font-medium text-sm tracking-wide">
          TRANSLATED TRANSCRIPT
        </h3>

        <p className="whitespace-pre-wrap mt-2 text-gray-800 text-sm leading-relaxed">
          {translated?.trim() || "—"}
        </p>
      </motion.div>
    </div>
  );
}
