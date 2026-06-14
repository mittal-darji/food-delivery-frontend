// components/CartItemCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  card: '#FFFFFF',
  cardBorder: '#EDF0F4',
  accent: '#F5C518',
  accentSoft: '#FEFDDF',
  green: '#10B981',
  yellow: '#F5C518',
  textPrimary: '#1A1033',
  textSecondary: '#4A5568',
  textMuted: '#8C96A3',
  black: '#000000',
  danger: '#EF4444',
};

// ─── Types (local) ────────────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  image?: string;
  emoji?: string;
  customization: string;
  qty: number;
  rating: number;
  isVeg: boolean;
  tag?: string;
}

// ── VegBadge ──────────────────────────────────────────────────────────────────
function VegBadge({ isVeg }: { isVeg: boolean }) {
  return (
    <View style={[s.vegBadge, { borderColor: isVeg ? C.green : C.danger }]}>
      <View
        style={[s.vegDot, { backgroundColor: isVeg ? C.green : C.danger }]}
      />
    </View>
  );
}

// ── Tag ───────────────────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <View style={s.tag}>
      <Text style={s.tagText}>{label}</Text>
    </View>
  );
}

// ── StarRow ───────────────────────────────────────────────────────────────────
function StarRow({ rating }: { rating: number }) {
  return (
    <View style={s.starRow}>
      <Ionicons name="star" size={11} color={C.yellow} />
      <Text style={s.ratingText}>{rating}</Text>
    </View>
  );
}

// ── QtyControl ────────────────────────────────────────────────────────────────
function QtyControl({
  qty,
  onInc,
  onDec,
}: {
  qty: number;
  onInc(): void;
  onDec(): void;
}) {
  return (
    <View style={s.qtyWrap}>
      <TouchableOpacity onPress={onDec} style={s.qtyBtn} activeOpacity={0.7}>
        <Feather
          name={qty === 1 ? 'trash-2' : 'minus'}
          size={14}
          color={qty === 1 ? C.danger : C.textPrimary}
        />
      </TouchableOpacity>
      <Text style={s.qtyNum}>{qty}</Text>
      <TouchableOpacity
        onPress={onInc}
        style={[s.qtyBtn, s.qtyBtnPlus]}
        activeOpacity={0.7}
      >
        <Feather name="plus" size={14} color={C.accent} />
      </TouchableOpacity>
    </View>
  );
}

// ── CartItemCard (main export) ────────────────────────────────────────────────
interface Props {
  item: CartItem;
  onInc: () => void;
  onDec: () => void;
}

export default function CartItemCard({ item, onInc, onDec }: Props) {
  return (
    <View style={s.itemCard}>
      {/* Thumbnail */}
      <View style={s.itemEmoji}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={s.itemImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={s.itemEmojiText}>{item.emoji ?? '🍽️'}</Text>
        )}
      </View>

      {/* Details */}
      <View style={s.itemDetails}>
        <View style={s.itemTopRow}>
          <VegBadge isVeg={item.isVeg} />
          <Text style={s.itemName} numberOfLines={1}>
            {item.name}
          </Text>
        </View>

        <View style={s.itemMeta}>
          <Ionicons name="storefront-outline" size={11} color={C.textMuted} />
          <Text style={s.itemRestaurant}>{item.restaurant}</Text>
          <View style={s.dotSep} />
          <StarRow rating={item.rating} />
        </View>

        {item.customization ? (
          <View style={s.customRow}>
            <Ionicons name="options-outline" size={11} color={C.textMuted} />
            <Text style={s.customText} numberOfLines={1}>
              {item.customization}
            </Text>
          </View>
        ) : null}

        {item.tag ? <Tag label={item.tag} /> : null}

        <View style={s.itemFooter}>
          <Text style={s.itemPrice}>
            ₹{(item.price * item.qty).toLocaleString('en-IN')}
          </Text>
          <QtyControl qty={item.qty} onInc={onInc} onDec={onDec} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.cardBorder,
    gap: 12,
  },
  itemEmoji: {
    width: 68,
    height: 68,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  itemImage: { width: 68, height: 68, borderRadius: 14 },
  itemEmojiText: { fontSize: 36 },
  itemDetails: { flex: 1 },
  itemTopRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: C.textPrimary,
    flex: 1,
    letterSpacing: -0.2,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  itemRestaurant: { fontSize: 12, color: C.textMuted, fontWeight: '500' },
  dotSep: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: C.textMuted,
    marginHorizontal: 2,
  },
  starRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 11, color: C.yellow, fontWeight: '700' },
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 5,
  },
  customText: { fontSize: 11, color: C.textMuted, flex: 1 },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: C.black,
    letterSpacing: -0.3,
  },
  vegBadge: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  vegDot: { width: 6, height: 6, borderRadius: 3 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF4D0018',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#FF4D0030',
  },
  tagText: {
    fontSize: 10,
    color: C.accent,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  qtyWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.cardBorder,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnPlus: { backgroundColor: C.accentSoft },
  qtyNum: {
    width: 28,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: C.textPrimary,
  },
});
