"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react"; // icons

export default function MicrophoneButton({ onTranscript }: any) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mimeType =
        MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")
          ? "audio/ogg;codecs=opus"
          : "audio/webm;codecs=opus";

      const recorder = new MediaRecorder(stream, { mimeType });

      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
      alert("Microphone access blocked.");
    }
  }

  function stopRecording() {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    recorder.stop();
    recorder.stream.getTracks().forEach((t) => t.stop());
    mediaRecorderRef.current = null;
    setRecording(false);

    // Combine all chunks into 1 full audio blob
    setTimeout(async () => {
      const fullBlob = new Blob(chunksRef.current, { type: "audio/ogg" });
      await sendToServer(fullBlob);
    }, 300);
  }

  async function sendToServer(blob: Blob) {
    const formData = new FormData();
    formData.append("file", blob, "full_audio.ogg");

    const res = await fetch("/api/stt", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.text) onTranscript(data.text);
  }

  return (
    <motion.button
      onClick={() => (recording ? stopRecording() : startRecording())}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-md text-white transition ${
        recording ? "bg-red-600" : "bg-blue-600"
      }`}
    >
      {/* Pulse Animation While Recording */}
      {recording && (
        <motion.span
          className="w-3 h-3 rounded-full bg-red-300"
          initial={{ scale: 1 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "easeOut",
          }}
        />
      )}

      {/* Icon */}
      {recording ? <Square size={18} /> : <Mic size={18} />}

      {recording ? "Stop & Transcribe" : "Start Recording"}
    </motion.button>
  );
}
