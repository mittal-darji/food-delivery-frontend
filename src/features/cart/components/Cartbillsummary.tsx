// components/CartBillSummary.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  card: '#FFFFFF',
  cardBorder: '#EDF0F4',
  accent: '#F5C518',
  green: '#10B981',
  greenSoft: '#D1FAE5',
  textPrimary: '#1A1033',
  textSecondary: '#4A5568',
  divider: '#EDF0F4',
};

// ─── Fees (local) ─────────────────────────────────────────────────────────────
const DELIVERY_FEE = 49;
const PLATFORM_FEE = 7;

// ── BillRow ───────────────────────────────────────────────────────────────────
function BillRow({
  label,
  value,
  hint,
  valueColor,
}: {
  label: string;
  value: string;
  hint?: string;
  valueColor?: string;
}) {
  return (
    <View style={s.billRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Text style={s.billLabel}>{label}</Text>
        {hint && (
          <View style={s.billHintPill}>
            <Text style={s.billHintText}>{hint}</Text>
          </View>
        )}
      </View>
      <Text style={[s.billValue, valueColor ? { color: valueColor } : {}]}>
        {value}
      </Text>
    </View>
  );
}

// ── CartBillSummary (main export) ─────────────────────────────────────────────
interface Props {
  subtotal: number;
  deliveryType: 'standard' | 'express';
  tip: number;
  appliedCoupon: { label: string; discount: number } | null;
  total: number;
}

export default function CartBillSummary({
  subtotal,
  deliveryType,
  tip,
  appliedCoupon,
  total,
}: Props) {
  const delivery =
    deliveryType === 'express' ? DELIVERY_FEE + 30 : DELIVERY_FEE;

  return (
    <View style={s.billCard}>
      <BillRow
        label="Item total"
        value={`₹${subtotal.toLocaleString('en-IN')}`}
      />
      <BillRow
        label={`Delivery fee (${
          deliveryType === 'express' ? 'Express' : 'Standard'
        })`}
        value={`₹${delivery}`}
        hint={deliveryType === 'express' ? '+₹30 express' : undefined}
      />
      <BillRow label="Platform fee" value={`₹${PLATFORM_FEE}`} />
      {tip > 0 && <BillRow label="Rider tip" value={`₹${tip}`} />}
      {appliedCoupon && (
        <BillRow
          label="Coupon discount"
          value={`−₹${appliedCoupon.discount}`}
          valueColor={C.green}
        />
      )}
      <View style={s.billDivider} />
      <View style={s.billTotalRow}>
        <Text style={s.billTotalLabel}>To Pay</Text>
        <Text style={s.billTotalValue}>₹{total.toLocaleString('en-IN')}</Text>
      </View>
      {appliedCoupon && (
        <View style={s.savingsBanner}>
          <Ionicons name="pricetag" size={13} color={C.green} />
          <Text style={s.savingsBannerText}>
            You're saving ₹{appliedCoupon.discount} on this order!
          </Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  billCard: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: C.cardBorder,
    gap: 10,
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  billLabel: { fontSize: 14, color: C.textSecondary, fontWeight: '400' },
  billValue: { fontSize: 14, color: C.textPrimary, fontWeight: '600' },
  billHintPill: {
    backgroundColor: '#FF4D0015',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  billHintText: { fontSize: 10, color: C.accent, fontWeight: '600' },
  billDivider: { height: 1, backgroundColor: C.divider, marginVertical: 4 },
  billTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billTotalLabel: { fontSize: 16, fontWeight: '700', color: C.textPrimary },
  billTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: C.textPrimary,
    letterSpacing: -0.5,
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.greenSoft,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 2,
    borderWidth: 1,
    borderColor: '#22C55E30',
  },
  savingsBannerText: { fontSize: 12, color: C.green, fontWeight: '600' },
});
