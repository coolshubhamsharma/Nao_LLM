# 🏥 AI-Powered Healthcare Translator

A web-based prototype that enables **multilingual voice translation between patients and healthcare providers** using generative AI.  
The application converts patient speech into text, translates it into the provider’s preferred language, and plays back the translated audio — all in a clean, mobile-friendly interface.

---

## 🚀 Live Demo
Link - <a href="https://nao-inky.vercel.app/"> Healthcare Translator</a>

<img src="/public/image.png" width="700" title="Youtube-Clone">

---

## 🎯 Problem Statement

Language barriers in healthcare can impact patient safety and quality of care.  
This project demonstrates how **Speech-to-Text, AI Translation, and Text-to-Speech** can be combined to enable smoother communication in clinical environments.

---

## ✨ Key Features

- 🎤 Speech-to-Text using ElevenLabs (SCRIBE v2)
- 🌐 AI-powered translation using Google Gemini
- 🔊 Natural Text-to-Speech playback
- 📱 Mobile-first, responsive UI
- 📝 Dual transcript view (Original + Translated)
- 🎨 Modern UI with animations

---

## 🧠 AI Tools & Technologies

| Purpose      |    Tools  |
|   ------     |    ------   |
| Speech-to-Text | ElevenLabs SCRIBE v2 |
| Translation | Google Gemini 1.5 Flash |
| Text-to-Speech | ElevenLabs Multilingual TTS |
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |



## ⚙️ Application Flow

1. Select input and output languages  
2. Record patient speech  
3. Speech is transcribed using STT  
4. Text is translated via Gemini AI  
5. Translated text is displayed and played using TTS  
6. Click on the Speak button to hear the translation

---

## 🔐 Privacy & Security

- No patient data is stored
- All processing is in-memory
- HTTPS-only communication
- API keys stored securely in environment variables
- Designed with HIPAA principles in mind (prototype-level)

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/coolshubhamsharma/Nao_LLM
cd Nao_LLM
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment variables
Create `.env.local`:
```env
ELEVENLABS_API_KEY=your_elevenlabs_key
GEMINI_API_KEY=your_gemini_key

NEXT_PUBLIC_DEFAULT_INPUT_LANG=en-US
NEXT_PUBLIC_DEFAULT_OUTPUT_LANG=es
```

### 4️⃣ Run the app
```bash
npm run dev
```

---

## 📌 Limitations & Future Improvements

- Authentication & session management
- Audit logging
- Provider fallback strategies
- Expanded language support
- Production HIPAA compliance

---

