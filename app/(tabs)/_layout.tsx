import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

function PillButton({
  onPress,
  children,
  selected,
  label,
  isLeft,
}: {
  onPress?: () => void;
  children?: React.ReactNode;
  selected?: boolean;
  label: string;
  isLeft: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.pillButton,
        isLeft ? styles.pillLeft : styles.pillRight,
        selected && styles.pillButtonSelected,
      ]}
      activeOpacity={0.85}
    >
      {children}
      {selected && <Text style={styles.pillLabel}>{label}</Text>}
    </TouchableOpacity>
  );
}

function TabIcon({ icon, selected }: { icon: string; selected: boolean }) {
  return (
    <View style={[styles.tabIconWrap, selected && styles.tabIconWrapSelected]}>
      <Text style={[styles.tabIcon, selected && styles.tabIconSelected]}>{icon}</Text>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          height: 68 + (insets.bottom > 0 ? insets.bottom : 8),
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Daily Log',
          tabBarIcon: ({ focused }) => <TabIcon icon="🕐" selected={focused} />,
        }}
      />
      <Tabs.Screen
        name="companion"
        options={{
          title: 'AI Companion',
          tabBarIcon: () => <Text style={styles.pillIcon}>🎙️</Text>,
          tabBarButton: (props) => (
            <PillButton
              onPress={props.onPress as () => void}
              selected={(props as { 'aria-selected'?: boolean })['aria-selected']}
              label="Companion"
              isLeft={true}
            >
              {props.children}
            </PillButton>
          ),
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: 'Community',
          tabBarIcon: () => <Text style={styles.pillIcon}>💬</Text>,
          tabBarButton: (props) => (
            <PillButton
              onPress={props.onPress as () => void}
              selected={(props as { 'aria-selected'?: boolean })['aria-selected']}
              label="Community"
              isLeft={false}
            >
              {props.children}
            </PillButton>
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ focused }) => <TabIcon icon="📚" selected={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 10,
  },
  tabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  tabIconWrapSelected: {
    backgroundColor: Colors.primary + '20',
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.5,
  },
  tabIconSelected: {
    opacity: 1,
  },
  pillButton: {
    flex: 1,
    height: 50,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  pillLeft: {
    backgroundColor: Colors.pillLeft,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: 8,
    marginRight: 1,
  },
  pillRight: {
    backgroundColor: Colors.pillRight,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    marginRight: 8,
    marginLeft: 1,
  },
  pillButtonSelected: {
    opacity: 1,
  },
  pillIcon: {
    fontSize: 22,
  },
  pillLabel: {
    fontSize: 11,
    color: Colors.text,
    fontWeight: '700',
  },
});
