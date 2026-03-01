import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Colors from '../../constants/Colors';
import { MoodEntry } from '../../hooks/useMoodTracker';

interface Props {
  entries: Record<string, MoodEntry>;
}

export default function CalendarView({ entries }: Props) {
  const markedDates = useMemo(() => {
    const marks: Record<string, { dots?: { color: string }[]; selected?: boolean; selectedColor?: string }> = {};
    Object.values(entries).forEach((entry) => {
      marks[entry.date] = {
        selected: true,
        selectedColor: Colors.moodColors[entry.mood] + 'CC',
      };
    });
    return marks;
  }, [entries]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Journey 📅</Text>
      <Calendar
        markedDates={markedDates}
        theme={{
          backgroundColor: Colors.card,
          calendarBackground: Colors.card,
          textSectionTitleColor: Colors.textLight,
          selectedDayBackgroundColor: Colors.primary,
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: Colors.primary,
          dayTextColor: Colors.text,
          textDisabledColor: Colors.border,
          arrowColor: Colors.primary,
          monthTextColor: Colors.text,
          textMonthFontWeight: '700',
          textDayFontSize: 13,
          textMonthFontSize: 15,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    padding: 16,
    paddingBottom: 0,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
