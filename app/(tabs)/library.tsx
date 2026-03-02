import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import AudioPlayer from '../../components/Library/AudioPlayer';
import BreathingAnimation from '../../components/Library/BreathingAnimation';
import ContentCard from '../../components/Library/ContentCard';
import { AUDIO_TRACKS, READING_MATERIALS, AudioTrack } from '../../constants/RelaxationContent';

const AUDIO_CATEGORIES = [
  { key: 'meditation', label: '🧘 Meditation' },
  { key: 'whitenoise', label: '🌊 White Noise' },
  { key: 'breathing', label: '🌬️ Breathing' },
];

const MAIN_TABS = ['Audio', 'Breathing', 'Reading'];

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState('Audio');
  const [activeAudioCategory, setActiveAudioCategory] = useState<string>('meditation');
  const filteredTracks = AUDIO_TRACKS.filter((t) => t.category === activeAudioCategory);
  const handleSetTab = useCallback((tab: string) => setActiveTab(tab), []);
  const handleSetAudioCat = useCallback((key: string) => setActiveAudioCategory(key), []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Relaxation Library 📚</Text>
        <Text style={styles.subtitle}>Guided tools for calm and clarity</Text>
      </View>
      <View style={styles.tabRow}>
        {MAIN_TABS.map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]} onPress={() => handleSetTab(tab)} activeOpacity={0.8}>
            <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'Audio' && (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.audioCatScroll}>
              {AUDIO_CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat.key} style={[styles.audioCatChip, activeAudioCategory === cat.key && styles.audioCatChipActive]} onPress={() => handleSetAudioCat(cat.key)} activeOpacity={0.7}>
                  <Text style={[styles.audioCatText, activeAudioCategory === cat.key && styles.audioCatTextActive]}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {filteredTracks.map((track: AudioTrack) => <AudioPlayer key={track.id} track={track} />)}
          </>
        )}
        {activeTab === 'Breathing' && (
          <>
            <BreathingAnimation />
            <View style={styles.breathingInfo}>
              <Text style={styles.breathingInfoTitle}>About Box Breathing</Text>
              <Text style={styles.breathingInfoText}>Box breathing — also called square breathing — is a powerful stress-relief technique used by Navy SEALs, athletes, and therapists. The four equal phases of 4 seconds each engage your parasympathetic nervous system, slowing your heart rate and reducing cortisol levels almost immediately.</Text>
              <Text style={styles.breathingInfoText}>Regular practice (5–10 minutes daily) has been shown to reduce anxiety, improve focus, and build resilience to stress over time.</Text>
            </View>
            <View style={styles.techniqueCard}>
              <Text style={styles.techniqueTitle}>🌬️ 4-7-8 Breathing</Text>
              <Text style={styles.techniqueSubtitle}>Dr. Andrew Weil's relaxation technique</Text>
              <View style={styles.techniqueSteps}>
                {[{ step: '1', text: 'Inhale through your nose for 4 counts' }, { step: '2', text: 'Hold your breath for 7 counts' }, { step: '3', text: 'Exhale completely through your mouth for 8 counts' }, { step: '4', text: 'Repeat 3–4 cycles' }].map((item) => (
                  <View key={item.step} style={styles.techniqueStep}>
                    <View style={styles.stepNum}><Text style={styles.stepNumText}>{item.step}</Text></View>
                    <Text style={styles.stepText}>{item.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
        {activeTab === 'Reading' && READING_MATERIALS.map((material) => <ContentCard key={material.id} material={material} />)}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  title: { fontSize: 20, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: 12, color: Colors.textLight, marginTop: 1 },
  tabRow: { flexDirection: 'row', padding: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: Colors.border, backgroundColor: Colors.background },
  tabBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center', backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  tabBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabBtnText: { fontSize: 13, fontWeight: '600', color: Colors.textLight },
  tabBtnTextActive: { color: '#FFFFFF' },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 12 },
  audioCatScroll: { gap: 8, paddingBottom: 4 },
  audioCatChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  audioCatChipActive: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  audioCatText: { fontSize: 13, color: Colors.textLight, fontWeight: '500' },
  audioCatTextActive: { color: '#FFFFFF', fontWeight: '700' },
  breathingInfo: { backgroundColor: Colors.card, borderRadius: 16, padding: 16, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  breathingInfoTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  breathingInfoText: { fontSize: 13, color: Colors.textLight, lineHeight: 20 },
  techniqueCard: { backgroundColor: Colors.primary + '15', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.primary + '40' },
  techniqueTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  techniqueSubtitle: { fontSize: 12, color: Colors.textLight, marginBottom: 12 },
  techniqueSteps: { gap: 10 },
  techniqueStep: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  stepNum: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  stepNumText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  stepText: { flex: 1, fontSize: 13, color: Colors.text, lineHeight: 19 },
});
