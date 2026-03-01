import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type MoodLevel = 0 | 1 | 2 | 3 | 4;

export interface MoodEntry {
  date: string;
  mood: MoodLevel;
  response?: string;
  prompt?: string;
}

const STORAGE_KEY = '@mindanchor_mood_entries';

export function useMoodTracker() {
  const [entries, setEntries] = useState<Record<string, MoodEntry>>({});
  const [loaded, setLoaded] = useState(false);

  const loadEntries = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch (_) {
      // ignore
    } finally {
      setLoaded(true);
    }
  }, []);

  const saveEntry = useCallback(async (entry: MoodEntry) => {
    setEntries((prev) => {
      const updated = { ...prev, [entry.date]: entry };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const getEntry = useCallback(
    (date: string) => entries[date] ?? null,
    [entries]
  );

  const getTodayDate = useCallback(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  return { entries, loaded, loadEntries, saveEntry, getEntry, getTodayDate };
}
