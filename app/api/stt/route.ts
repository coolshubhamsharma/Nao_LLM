import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "Missing audio file" }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY!;
    const uploadForm = new FormData();

    uploadForm.append("file", file, "full_audio.ogg");

    // SCRIBE MODELS ONLY
    uploadForm.append("model_id", "scribe_v2");

    const resp = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: { "xi-api-key": apiKey },
      body: uploadForm,
    });

    const json = await resp.json();

    console.log("ELEVENLABS STT:", JSON.stringify(json, null, 2));

    const text =
      json.text ||
      json.transcription ||
      json.output_text ||
      "";

    return NextResponse.json({ text });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
