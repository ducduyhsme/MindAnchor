const API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY || process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';
const API_URL = process.env.EXPO_PUBLIC_OPENAI_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = process.env.EXPO_PUBLIC_AI_MODEL || 'openai/gpt-oss-120b';

const SYSTEM_INSTRUCTION = `You are Anchor 🌿, a compassionate AI mental wellness companion built into the MindAnchor app.
Your role is to provide empathetic, supportive conversation to help users reflect on their emotions and wellbeing.
Guidelines:
- Be warm, non-judgmental, and supportive.
- Ask thoughtful follow-up questions to encourage reflection.
- Keep responses concise (2–4 sentences) unless a longer response is genuinely helpful.
- Never diagnose, prescribe, or give medical advice.
- If a user expresses thoughts of self-harm or suicide, respond with immediate care and direct them to professional help and crisis resources.
- Do not roleplay as a human — you are a wellness AI companion.`;

export interface ChatMessageInterface {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export async function sendMessageToAI(
    history: ChatMessageInterface[],
    userMessage: string
): Promise<string> {
    if (!API_KEY) {
        throw new Error('API key is not configured. Please set EXPO_PUBLIC_OPENAI_API_KEY or EXPO_PUBLIC_OPENROUTER_API_KEY.');
    }

    const messages = [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        ...history,
        { role: 'user', content: userMessage }
    ];

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'HTTP-Referer': 'https://mindanchor.app',
                'X-Title': 'MindAnchor',
            },
            body: JSON.stringify({
                model: MODEL,
                messages: messages,
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            if (response.status === 429) {
                return "I'm receiving too many messages at once! I need a quiet moment—please wait about a minute before messaging again. 🌿";
            }
            throw new Error(`API error: ${response.status} ${errorData}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "I'm sorry, I couldn't understand that.";
    } catch (error: any) {
        console.error('AI Service Error:', error);
        throw error;
    }
}
