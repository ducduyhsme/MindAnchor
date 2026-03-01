import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import MoodTracker from '../../components/ActivityLog/MoodTracker';
import DailyPrompts from '../../components/ActivityLog/DailyPrompts';
import CalendarView from '../../components/ActivityLog/CalendarView';
import { useMoodTracker, MoodLevel } from '../../hooks/useMoodTracker';
import { getDailyPrompt } from '../../constants/Prompts';

export default function DailyLogScreen() {
  const { entries, loaded, loadEntries, saveEntry, getEntry, getTodayDate } = useMoodTracker();
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [response, setResponse] = useState('');
  const todayDate = getTodayDate();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    if (loaded) {
      const todayEntry = getEntry(todayDate);
      if (todayEntry) {
        setSelectedMood(todayEntry.mood);
        setResponse(todayEntry.response ?? '');
      }
    }
  }, [loaded, getEntry, todayDate]);

  const handleSave = async () => {
    if (selectedMood === null) {
      Alert.alert('Select Mood', 'Please select how you are feeling before saving.');
      return;
    }
    await saveEntry({
      date: todayDate,
      mood: selectedMood,
      response,
      prompt: getDailyPrompt(),
    });
    Alert.alert('Saved ✓', 'Your daily entry has been saved.');
  };

  const today = new Date();
  const dateLabel = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Daily Check-In 🌿</Text>
          <Text style={styles.date}>{dateLabel}</Text>
        </View>
        <MoodTracker selectedMood={selectedMood} onSelectMood={setSelectedMood} />
        <DailyPrompts response={response} onChangeResponse={setResponse} onSave={handleSave} />
        <CalendarView entries={entries} />
        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16 },
  header: { marginBottom: 4 },
  greeting: { fontSize: 22, fontWeight: '700', color: Colors.text },
  date: { fontSize: 13, color: Colors.textLight, marginTop: 2 },
  bottomPad: { height: 20 },
});
