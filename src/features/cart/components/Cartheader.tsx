// components/CartHeader.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  bg: '#ffffff',
  card: '#FFFFFF',
  cardBorder: '#EDF0F4',
  textPrimary: '#1A1033',
  textSecondary: '#4A5568',
  divider: '#EDF0F4',
  danger: '#EF4444',
};

interface Props {
  itemCount: number;
  onBack: () => void;
  onClear: () => void;
}

export default function CartHeader({ itemCount, onBack, onClear }: Props) {
  return (
    <View style={s.header}>
      <TouchableOpacity style={s.backBtn} activeOpacity={0.7} onPress={onBack}>
        <Ionicons name="arrow-back" size={22} color={C.textPrimary} />
      </TouchableOpacity>
      <View>
        <Text style={s.headerTitle}>Your Cart</Text>
        <Text style={s.headerSub}>
          {itemCount} item{itemCount !== 1 ? 's' : ''}
        </Text>
      </View>
      <TouchableOpacity
        style={s.clearBtn}
        activeOpacity={0.7}
        onPress={onClear}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={20}
          color={C.danger}
        />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:
      Platform.OS === 'ios' ? 56 : (StatusBar.currentHeight ?? 0) + 12,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: C.bg,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
    gap: 14,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: C.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: C.textPrimary,
    letterSpacing: -0.3,
  },
  headerSub: { fontSize: 12, color: C.textSecondary, marginTop: 1 },
  clearBtn: {
    marginLeft: 'auto',
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EF444415',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EF444430',
  },
});
