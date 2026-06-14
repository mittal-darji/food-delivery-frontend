// components/CartCoupon.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  card: '#FFFFFF',
  cardBorder: '#EDF0F4',
  accentMid: '#fdeea0',
  green: '#10B981',
  greenSoft: '#D1FAE5',
  yellow: '#F5C518',
  textPrimary: '#1A1033',
  textSecondary: '#4A5568',
  textMuted: '#8C96A3',
  black: '#000000',
  danger: '#EF4444',
};

interface Props {
  coupon: string;
  couponError: string;
  appliedCoupon: { label: string; discount: number } | null;
  onChange: (text: string) => void;
  onApply: () => void;
  onRemove: () => void;
  onChipPress: (code: string) => void;
}

export default function CartCoupon({
  coupon,
  couponError,
  appliedCoupon,
  onChange,
  onApply,
  onRemove,
  onChipPress,
}: Props) {
  return (
    <View style={s.couponCard}>
      {appliedCoupon ? (
        <View style={s.couponApplied}>
          <View style={s.couponAppliedLeft}>
            <View style={s.couponSuccessIcon}>
              <Ionicons name="checkmark-circle" size={20} color={C.green} />
            </View>
            <View>
              <Text style={s.couponAppliedLabel}>{appliedCoupon.label}</Text>
              <Text style={s.couponSavings}>
                You save ₹{appliedCoupon.discount}!
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onRemove}>
            <Feather name="x" size={18} color={C.textSecondary} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={s.couponInputRow}>
            <MaterialCommunityIcons
              name="tag-outline"
              size={18}
              color={C.textSecondary}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={s.couponInput}
              placeholder="Enter coupon code"
              placeholderTextColor={C.textMuted}
              value={coupon}
              onChangeText={onChange}
              autoCapitalize="characters"
              returnKeyType="done"
              onSubmitEditing={onApply}
            />
            <TouchableOpacity
              onPress={onApply}
              disabled={!coupon.trim()}
              style={[s.applyBtn, !coupon.trim() && { opacity: 0.4 }]}
              activeOpacity={0.8}
            >
              <Text style={s.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {couponError ? (
            <View style={s.couponErrorRow}>
              <Ionicons
                name="alert-circle-outline"
                size={13}
                color={C.danger}
              />
              <Text style={s.couponError}>{couponError}</Text>
            </View>
          ) : null}

          <View style={s.couponHints}>
            {['FIRST50', 'SAVE20'].map(code => (
              <TouchableOpacity
                key={code}
                style={s.couponChip}
                onPress={() => onChipPress(code)}
                activeOpacity={0.7}
              >
                <Feather name="tag" size={11} color={C.black} />
                <Text style={s.couponChipText}>{code}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  couponCard: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  couponApplied: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  couponAppliedLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  couponSuccessIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponAppliedLabel: { fontSize: 14, fontWeight: '700', color: C.green },
  couponSavings: { fontSize: 12, color: C.textSecondary, marginTop: 1 },
  couponInputRow: { flexDirection: 'row', alignItems: 'center' },
  couponInput: {
    flex: 1,
    fontSize: 14,
    color: C.textPrimary,
    fontWeight: '600',
    letterSpacing: 1,
    paddingVertical: 4,
  },
  applyBtn: {
    backgroundColor: C.yellow,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: C.accentMid,
  },
  applyBtnText: { color: C.black, fontWeight: '700', fontSize: 13 },
  couponErrorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  couponError: { fontSize: 12, color: C.danger, fontWeight: '500' },
  couponHints: { flexDirection: 'row', gap: 8, marginTop: 12 },
  couponChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: C.yellow,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  couponChipText: {
    fontSize: 12,
    color: C.black,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
