// components/CartAddressBar.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  card: '#FFFFFF',
  cardBorder: '#EDF0F4',
  accent: '#F5C518',
  textPrimary: '#1A1033',
  textSecondary: '#4A5568',
};

interface Props {
  address: string;
  onPress?: () => void;
}

export default function CartAddressBar({ address, onPress }: Props) {
  return (
    <TouchableOpacity
      style={s.addressRow}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View style={s.addressLeft}>
        <Ionicons name="location-sharp" size={18} color={C.accent} />
        <View style={{ marginLeft: 10 }}>
          <Text style={s.addressLabel}>Delivering to</Text>
          <Text style={s.addressValue} numberOfLines={1}>
            {address}
          </Text>
        </View>
      </View>
      <Feather name="chevron-right" size={18} color={C.textSecondary} />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  addressLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  addressLabel: {
    fontSize: 11,
    color: C.textSecondary,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addressValue: {
    fontSize: 14,
    color: C.textPrimary,
    fontWeight: '600',
    marginTop: 2,
  },
});
