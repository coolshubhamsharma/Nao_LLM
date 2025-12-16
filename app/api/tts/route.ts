import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY!;
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // default voice (Rachel)

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2"
      })
    });

    const audioBuffer = await response.arrayBuffer(); //reading the response body as raw binary audio data
    const audioBase64 = Buffer.from(audioBuffer).toString("base64");//Converting binary audio into a Base64 string so it can be safely returned inside JSON.

    return NextResponse.json({ audioBase64 });
  } catch (error: any) {
    console.error("TTS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
