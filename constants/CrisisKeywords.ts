export const CRISIS_KEYWORDS: string[] = [
  'suicide',
  'suicidal',
  'kill myself',
  'end my life',
  'self-harm',
  'self harm',
  'hurt myself',
  'want to die',
  'no reason to live',
  'better off dead',
  'not worth living',
  'cutting myself',
  'overdose',
  'end it all',
];

export const CRISIS_RESOURCES = {
  hotline: '988',
  hotlineName: 'Suicide & Crisis Lifeline',
  text: 'Text HOME to 741741',
  textName: 'Crisis Text Line',
  chat: 'https://988lifeline.org/chat',
};

export const containsCrisisKeyword = (text: string): boolean => {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((kw) => lower.includes(kw));
};
