export interface AudioTrack {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'meditation' | 'whitenoise' | 'breathing';
  icon: string;
}

export interface ReadingMaterial {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  icon: string;
}

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'm1',
    title: 'Morning Calm',
    description: 'A gentle guided meditation to start your day with intention and clarity.',
    duration: '10 min',
    category: 'meditation',
    icon: '🌅',
  },
  {
    id: 'm2',
    title: 'Body Scan for Sleep',
    description: 'Progressive relaxation from head to toe to prepare your body for restful sleep.',
    duration: '20 min',
    category: 'meditation',
    icon: '🌙',
  },
  {
    id: 'm3',
    title: 'Anxiety Relief',
    description: 'A grounding meditation using the 5-4-3-2-1 sensory technique.',
    duration: '8 min',
    category: 'meditation',
    icon: '🌿',
  },
  {
    id: 'w1',
    title: 'Rain on Leaves',
    description: 'Gentle rain sounds recorded in a quiet forest.',
    duration: '60 min',
    category: 'whitenoise',
    icon: '🌧️',
  },
  {
    id: 'w2',
    title: 'Ocean Waves',
    description: 'Rhythmic ocean waves for focus and relaxation.',
    duration: '60 min',
    category: 'whitenoise',
    icon: '🌊',
  },
  {
    id: 'w3',
    title: 'Café Ambience',
    description: 'Soft café background sounds for productive focus.',
    duration: '45 min',
    category: 'whitenoise',
    icon: '☕',
  },
  {
    id: 'b1',
    title: 'Box Breathing Guide',
    description: 'Audio-guided box breathing (4-4-4-4) for immediate stress relief.',
    duration: '5 min',
    category: 'breathing',
    icon: '📦',
  },
  {
    id: 'b2',
    title: '4-7-8 Breathing',
    description: "Dr. Weil's relaxation technique for calming the nervous system.",
    duration: '7 min',
    category: 'breathing',
    icon: '🌬️',
  },
];

export const READING_MATERIALS: ReadingMaterial[] = [
  {
    id: 'r1',
    title: 'Understanding Cognitive Distortions',
    description:
      'Learn to identify the 10 most common thinking traps and how CBT helps you reframe them.',
    readTime: '5 min read',
    category: 'CBT',
    icon: '🧠',
  },
  {
    id: 'r2',
    title: 'The Science of Gratitude',
    description:
      'Research shows that a daily gratitude practice rewires your brain for more positive emotions.',
    readTime: '4 min read',
    category: 'Wellbeing',
    icon: '💛',
  },
  {
    id: 'r3',
    title: 'Sleep Hygiene: A Complete Guide',
    description:
      'Evidence-based strategies to improve sleep quality, from screen time to temperature.',
    readTime: '7 min read',
    category: 'Sleep',
    icon: '😴',
  },
  {
    id: 'r4',
    title: 'Managing Anxiety in the Moment',
    description:
      'Practical grounding techniques you can use anywhere when anxiety spikes.',
    readTime: '3 min read',
    category: 'Anxiety',
    icon: '🌱',
  },
  {
    id: 'r5',
    title: 'The Connection Between Movement and Mood',
    description:
      'How even 10 minutes of movement can significantly impact your mental state.',
    readTime: '4 min read',
    category: 'Wellbeing',
    icon: '🚶',
  },
];
