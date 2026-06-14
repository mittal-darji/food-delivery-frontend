// components/CartTip.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  card: '#FFFFFF',
  cardBorder: '#EDF0F4',
  accentMid: '#fdeea0',
  yellow: '#F5C518',
  textSecondary: '#4A5568',
  black: '#000000',
};

interface Props {
  tip: number;
  onSelect: (t: number) => void;
}

export default function CartTip({ tip, onSelect }: Props) {
  return (
    <View style={s.tipCard}>
      <Text style={s.tipSubtitle}>100% goes to your delivery partner 🙏</Text>
      <View style={s.tipRow}>
        {[0, 20, 30, 50].map(t => (
          <TouchableOpacity
            key={t}
            style={[s.tipChip, tip === t && s.tipChipActive]}
            onPress={() => onSelect(t)}
            activeOpacity={0.7}
          >
            <Text style={[s.tipChipText, tip === t && s.tipChipTextActive]}>
              {t === 0 ? 'None' : `₹${t}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tipCard: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  tipSubtitle: { fontSize: 12, color: C.textSecondary, marginBottom: 12 },
  tipRow: { flexDirection: 'row', gap: 8 },
  tipChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  tipChipActive: { backgroundColor: C.yellow, borderColor: C.accentMid },
  tipChipText: { fontSize: 13, color: C.textSecondary, fontWeight: '600' },
  tipChipTextActive: { color: C.black },
});
