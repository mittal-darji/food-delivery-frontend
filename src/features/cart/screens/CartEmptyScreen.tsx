// screens/CartEmptyScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  bg: '#ffffff',
  accent: '#F5C518',
  textPrimary: '#1A1033',
  textSecondary: '#4A5568',
  white: '#FFFFFF',
};

interface Props {
  onBrowse: () => void;
}

export default function CartEmptyScreen({ onBrowse }: Props) {
  return (
    <View style={s.emptyContainer}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <Text style={s.emptyEmoji}>🛒</Text>
      <Text style={s.emptyTitle}>Your cart is empty</Text>
      <Text style={s.emptySubtitle}>
        Looks like you haven't added anything yet
      </Text>
      <TouchableOpacity
        style={s.browseBtn}
        activeOpacity={0.85}
        onPress={onBrowse}
      >
        <Text style={s.browseBtnText}>Browse Restaurants</Text>
        <Ionicons name="arrow-forward" size={16} color={C.white} />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyEmoji: { fontSize: 72, marginBottom: 20 },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: C.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: C.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  browseBtn: {
    backgroundColor: C.accent,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  browseBtnText: { color: C.white, fontSize: 16, fontWeight: '800' },
});
