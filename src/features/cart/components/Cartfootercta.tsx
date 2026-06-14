// components/CartFooterCTA.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  bg: '#ffffff',
  card: '#FFFFFF',
  cardBorder: '#EDF0F4',
  accent: '#F5C518',
  divider: '#EDF0F4',
  textPrimary: '#1A1033',
  textSecondary: '#4A5568',
  white: '#FFFFFF',
};

interface Props {
  total: number;
  itemCount: number;
  onPlace: () => void;
}

export default function CartFooterCTA({ total, itemCount, onPlace }: Props) {
  return (
    <View style={s.ctaContainer}>
      <View style={s.ctaInner}>
        <View>
          <Text style={s.ctaTotal}>₹{total.toLocaleString('en-IN')}</Text>
          <Text style={s.ctaSub}>
            {itemCount} item{itemCount !== 1 ? 's' : ''} · incl. taxes
          </Text>
        </View>
        <TouchableHighlight
          style={s.ctaBtn}
          underlayColor="#D94000"
          onPress={onPlace}
        >
          <View style={s.ctaBtnInner}>
            <Text style={s.ctaBtnText}>Place Order</Text>
            <Ionicons name="arrow-forward" size={18} color={C.white} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.bg,
    borderTopWidth: 1,
    borderTopColor: C.divider,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    paddingHorizontal: 16,
  },
  ctaInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 12,
    paddingLeft: 18,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  ctaTotal: {
    fontSize: 20,
    fontWeight: '800',
    color: C.textPrimary,
    letterSpacing: -0.4,
  },
  ctaSub: { fontSize: 11, color: C.textSecondary, marginTop: 1 },
  ctaBtn: { backgroundColor: C.accent, borderRadius: 14, overflow: 'hidden' },
  ctaBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  ctaBtnText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
});