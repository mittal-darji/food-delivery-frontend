// components/CartSafetyBadges.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  card: '#FFFFFF',
  cardBorder: '#EDF0F4',
  green: '#10B981',
  textSecondary: '#4A5568',
};

const BADGES = [
  { icon: 'shield-check-outline', label: 'Safe delivery' },
  { icon: 'hand-wash', label: 'Hygienic packing' },
  { icon: 'clock-outline', label: 'On-time guarantee' },
];

export default function CartSafetyBadges() {
  return (
    <View style={s.safetyRow}>
      {BADGES.map(b => (
        <View key={b.label} style={s.safetyItem}>
          <MaterialCommunityIcons
            name={b.icon as any}
            size={20}
            color={C.green}
          />
          <Text style={s.safetyLabel}>{b.label}</Text>
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  safetyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  safetyItem: { flex: 1, alignItems: 'center', gap: 6 },
  safetyLabel: {
    fontSize: 11,
    color: C.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
});
