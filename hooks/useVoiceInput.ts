import { useState, useCallback, useRef, useEffect } from 'react';

// Simulated push-to-talk: in a real app this would use expo-speech / Voice API.
// Returns a mock transcript after a short delay.
const MOCK_TRANSCRIPTS = [
  "I've been feeling really overwhelmed lately with work.",
  "I'm having trouble sleeping and I feel anxious all the time.",
  "Today was actually a pretty good day for once.",
  "I don't know how to cope with all the stress.",
  "I feel lonely and disconnected from everyone.",
];

let transcriptIdx = 0;

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startListening = useCallback(() => {
    setIsListening(true);
  }, []);

  const stopListening = useCallback(
    (onTranscript: (text: string) => void) => {
      setIsListening(false);
      timeoutRef.current = setTimeout(() => {
        const transcript = MOCK_TRANSCRIPTS[transcriptIdx % MOCK_TRANSCRIPTS.length];
        transcriptIdx++;
        onTranscript(transcript);
      }, 400);
    },
    []
  );

  return { isListening, startListening, stopListening };
}
