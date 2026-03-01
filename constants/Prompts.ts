export const DAILY_PROMPTS: string[] = [
  'What is one thing you are grateful for today?',
  'Describe a moment today when you felt at peace.',
  'What small step can you take today to care for yourself?',
  'What emotion has been most present for you today?',
  'What is something that made you smile recently?',
  'What is one challenge you navigated well this week?',
  'Who in your life brings you comfort, and why?',
  'What does rest mean to you, and did you get any today?',
  'What would you like to let go of before tomorrow?',
  'What is one thing you are looking forward to?',
  'How did your body feel today — tight, relaxed, tired, energized?',
  'What story are you telling yourself today? Is it kind?',
  'What is one thing you learned about yourself recently?',
  'What boundaries did you set or wish you had set today?',
  'What would self-compassion look like for you right now?',
  'What colors, sounds, or textures brought you calm today?',
  'What is a fear you faced, even just a little bit, recently?',
  'What does your inner critic say, and how can you respond with kindness?',
  'How did you connect with another person today?',
  'What does your ideal peaceful morning look like?',
  'What is something your body is doing well for you today?',
  'What would you say to a friend feeling the way you feel now?',
  'What is one thing you want to remember about today?',
  'What does your mind need right now — rest, stimulation, or quiet?',
  'What is one way you showed up for yourself this week?',
  'Describe a place where you feel completely safe.',
  'What habit supports your wellbeing most right now?',
  'What do you need to say out loud that you have been keeping inside?',
  'What does joy look like in your everyday life?',
  'What is one act of kindness you offered or received today?',
];

const MS_PER_DAY = 86400000;

export const getDailyPrompt = (): string => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / MS_PER_DAY
  );
  return DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length];
};
