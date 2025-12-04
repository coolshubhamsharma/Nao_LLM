import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { text, inputLang, outputLang } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    // NEW SDK FORMAT
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Translate the following text from ${inputLang} to ${outputLang}.
      Preserve all medical terminology.
      Return ONLY the translation without explanation.
      Text: "${text}"
    `;

    const result = await model.generateContent(prompt);
    const translated = result.response.text();

    return NextResponse.json({ translation: translated });

  } catch (err: any) {
    console.error("TRANSLATE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
