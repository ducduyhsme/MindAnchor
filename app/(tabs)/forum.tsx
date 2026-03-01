import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  TouchableOpacity, Modal, TextInput, Alert,
} from 'react-native';
import Colors from '../../constants/Colors';
import ThreadList, { Thread } from '../../components/Forum/ThreadList';
import AudioRoom from '../../components/Forum/AudioRoom';

const CATEGORIES = ['All', 'Anxiety', 'Depression', 'Sleep Issues', 'General Venting', 'Gratitude'];

const INITIAL_THREADS: Thread[] = [
  { id: '1', category: 'Anxiety', title: 'How do you manage anxiety at work without anyone noticing?', author: 'QuietStorm42', replies: 14, timestamp: '2h ago', preview: 'I have been dealing with constant anxiety attacks during meetings...' },
  { id: '2', category: 'Gratitude', title: 'Small wins thread — share something positive from your week 🌟', author: 'SunriseWalker', replies: 31, timestamp: '4h ago', preview: 'I actually made it to the gym today for the first time in 3 months...' },
  { id: '3', category: 'Sleep Issues', title: 'Racing thoughts at 2am — any real solutions?', author: 'NightOwlNervous', replies: 22, timestamp: '6h ago', preview: "Every night my brain decides to replay every embarrassing thing I've ever done..." },
  { id: '4', category: 'Depression', title: 'On the days it is hard to get out of bed, what gets you up?', author: 'CloudsAndMore', replies: 18, timestamp: '9h ago', preview: 'Not looking for advice necessarily, just want to hear what works for others...' },
  { id: '5', category: 'General Venting', title: 'Nobody in my life understands what I am going through', author: 'InvisibleBurden', replies: 27, timestamp: '12h ago', preview: 'I keep trying to explain how I feel to my family and friends...' },
  { id: '6', category: 'Anxiety', title: 'Social anxiety tips that actually work?', author: 'WallflowerWalking', replies: 19, timestamp: '1d ago', preview: "I have read all the generic tips. What are the unconventional things that actually worked?" },
];

const AUDIO_ROOMS = [
  { id: 'ar1', roomName: 'Sunday Wind-Down', topic: 'Gentle end-of-week reflections', participants: [{ id: '1', name: 'MoonlitPath', isSpeaking: true }, { id: '2', name: 'CalmWaters', isSpeaking: false }, { id: '3', name: 'SoftEcho', isSpeaking: false }, { id: '4', name: 'QuietMind', isSpeaking: true }] },
  { id: 'ar2', roomName: 'Anxiety Support Circle', topic: 'Share coping strategies in real time', participants: [{ id: '5', name: 'BreezyHills', isSpeaking: false }, { id: '6', name: 'TranquilFog', isSpeaking: true }] },
];

export default function ForumScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General Venting');

  const filteredThreads = activeCategory === 'All' ? threads : threads.filter((t) => t.category === activeCategory);

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newContent.trim()) { Alert.alert('Required', 'Please fill in the title and content.'); return; }
    const newThread: Thread = { id: Date.now().toString(), category: newCategory, title: newTitle.trim(), author: 'Anonymous' + Math.floor(Math.random() * 9000 + 1000), replies: 0, timestamp: 'Just now', preview: newContent.trim() };
    setThreads([newThread, ...threads]);
    setNewTitle(''); setNewContent(''); setShowNewPost(false);
    Alert.alert('Posted ✓', 'Your anonymous post is live.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Community 💬</Text>
        <Text style={styles.subtitle}>Anonymous • Judgment-free • Safe</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll} style={styles.categoryBar}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat} style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]} onPress={() => setActiveCategory(cat)} activeOpacity={0.7}>
            <Text style={[styles.categoryChipText, activeCategory === cat && styles.categoryChipTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>🎙️ Live Audio Rooms</Text></View>
        {AUDIO_ROOMS.map((room) => <AudioRoom key={room.id} roomName={room.roomName} topic={room.topic} participants={room.participants} />)}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📝 Discussion Threads</Text>
          <TouchableOpacity style={styles.newPostButton} onPress={() => setShowNewPost(true)} activeOpacity={0.8}>
            <Text style={styles.newPostButtonText}>+ New Post</Text>
          </TouchableOpacity>
        </View>
        <ThreadList threads={filteredThreads} onPressThread={() => {}} />
        <View style={{ height: 24 }} />
      </ScrollView>
      <Modal visible={showNewPost} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowNewPost(false)}><Text style={styles.modalCancel}>Cancel</Text></TouchableOpacity>
            <Text style={styles.modalTitle}>New Post</Text>
            <TouchableOpacity onPress={handleCreatePost}><Text style={styles.modalPost}>Post</Text></TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.anonymousNote}>🙈 You are posting anonymously. Your identity is never revealed.</Text>
            <Text style={styles.fieldLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.modalCatScroll}>
              {CATEGORIES.slice(1).map((cat) => (
                <TouchableOpacity key={cat} style={[styles.categoryChip, newCategory === cat && styles.categoryChipActive]} onPress={() => setNewCategory(cat)} activeOpacity={0.7}>
                  <Text style={[styles.categoryChipText, newCategory === cat && styles.categoryChipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.fieldLabel}>Title</Text>
            <TextInput style={styles.titleInput} value={newTitle} onChangeText={setNewTitle} placeholder="What's on your mind?" placeholderTextColor={Colors.textLight} maxLength={120} />
            <Text style={styles.fieldLabel}>Content</Text>
            <TextInput style={styles.contentInput} value={newContent} onChangeText={setNewContent} placeholder="Share your thoughts, feelings, or experiences..." placeholderTextColor={Colors.textLight} multiline numberOfLines={8} textAlignVertical="top" />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  title: { fontSize: 20, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: 12, color: Colors.textLight, marginTop: 1 },
  categoryBar: { maxHeight: 52, borderBottomWidth: 1, borderBottomColor: Colors.border },
  categoryScroll: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  categoryChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  categoryChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  categoryChipText: { fontSize: 12, color: Colors.textLight, fontWeight: '500' },
  categoryChipTextActive: { color: '#FFFFFF', fontWeight: '700' },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.text },
  newPostButton: { backgroundColor: Colors.secondary, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  newPostButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  modalSafe: { flex: 1, backgroundColor: Colors.background },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.border },
  modalTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },
  modalCancel: { fontSize: 14, color: Colors.textLight },
  modalPost: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
  modalContent: { padding: 16, gap: 10 },
  anonymousNote: { backgroundColor: Colors.secondary + '25', borderRadius: 12, padding: 12, fontSize: 13, color: Colors.text, lineHeight: 18 },
  fieldLabel: { fontSize: 12, fontWeight: '700', color: Colors.textLight, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 6 },
  modalCatScroll: { gap: 8, paddingVertical: 4 },
  titleInput: { backgroundColor: Colors.card, borderRadius: 12, padding: 14, fontSize: 15, color: Colors.text, borderWidth: 1, borderColor: Colors.border },
  contentInput: { backgroundColor: Colors.card, borderRadius: 12, padding: 14, fontSize: 14, color: Colors.text, minHeight: 150, borderWidth: 1, borderColor: Colors.border, lineHeight: 20 },
});
