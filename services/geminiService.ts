import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';

const SYSTEM_INSTRUCTION = `You are Anchor 🌿, a compassionate AI mental wellness companion built into the MindAnchor app.
Your role is to provide empathetic, supportive conversation to help users reflect on their emotions and wellbeing.
Guidelines:
- Be warm, non-judgmental, and supportive.
- Ask thoughtful follow-up questions to encourage reflection.
- Keep responses concise (2–4 sentences) unless a longer response is genuinely helpful.
- Never diagnose, prescribe, or give medical advice.
- If a user expresses thoughts of self-harm or suicide, respond with immediate care and direct them to professional help and crisis resources.
- Do not roleplay as a human — you are a wellness AI companion.`;

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
  }
  return genAI;
}

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export async function sendMessageToGemini(
  history: GeminiMessage[],
  userMessage: string
): Promise<string> {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Please set EXPO_PUBLIC_GEMINI_API_KEY.');
  }

  const client = getClient();
  const model = client.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}
