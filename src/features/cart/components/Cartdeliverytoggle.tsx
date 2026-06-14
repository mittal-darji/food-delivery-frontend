// components/CartDeliveryToggle.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  card: '#FFFFFF',
  cardBorder: '#EDF0F4',
  yellow: '#F5C518',
  textSecondary: '#4A5568',
  black: '#000000',
};

interface Props {
  deliveryType: 'standard' | 'express';
  onChange: (type: 'standard' | 'express') => void;
}

export default function CartDeliveryToggle({ deliveryType, onChange }: Props) {
  return (
    <View style={s.deliveryToggle}>
      {(['standard', 'express'] as const).map(type => {
        const active = deliveryType === type;
        return (
          <TouchableOpacity
            key={type}
            style={[s.delivTab, active && s.delivTabActive]}
            onPress={() => onChange(type)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={type === 'standard' ? 'bicycle-outline' : 'flash-outline'}
              size={16}
              color={active ? C.black : C.textSecondary}
            />
            <Text style={[s.delivTabText, active && s.delivTabTextActive]}>
              {type === 'standard' ? 'Standard · 30 min' : 'Express · 15 min'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  deliveryToggle: {
    flexDirection: 'row',
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  delivTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 11,
  },
  delivTabActive: {
    backgroundColor: C.yellow,
    borderWidth: 1,
    borderColor: C.yellow,
  },
  delivTabText: { fontSize: 13, color: C.black, fontWeight: '500' },
  delivTabTextActive: { color: C.black, fontWeight: '600' },
});
