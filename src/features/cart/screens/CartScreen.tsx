// screens/CartScreen.tsx  — thin orchestrator, all UI lives in components/
import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// ── components ────────────────────────────────────────────────────────────────
import CartHeader from '../components/Cartheader';
import CartDeliveryToggle from '../components/Cartdeliverytoggle';
import CartAddressBar from '../components/Cartaddressbar';
import CartItemCard, { CartItem } from '../components/Cartitemcard';
import CartCoupon from '../components/Cartcoupon';
import CartTip from '../components/Carttip';
import CartBillSummary from '../components/Cartbillsummary';
import CartSafetyBadges from '../components/Cartsafetybadges';
import CartFooterCTA from '../components/Cartfootercta';
import CartEmptyScreen from './CartEmptyScreen';

// ─── Colors (local) ───────────────────────────────────────────────────────────
const C = {
  bg: '#ffffff',
  card: '#FFFFFF',
  cardBorder: '#EDF0F4',
  accent: '#F5C518',
  textSecondary: '#4A5568',
};

// ─── Constants (local) ────────────────────────────────────────────────────────
const VALID_COUPONS: Record<
  string,
  { type: 'flat' | 'percent'; value: number; label: string }
> = {
  FIRST50: { type: 'flat', value: 50, label: '₹50 OFF applied' },
  SAVE20: { type: 'percent', value: 20, label: '20% OFF applied' },
};
const DELIVERY_FEE = 49;
const PLATFORM_FEE = 7;

export default function CartScreen({ navigation, route }: any) {
  // ── items — initialized from HotelFoodMenuScreen via navigation.push() ─────
  const [items, setItems] = useState<CartItem[]>(
    () => route?.params?.cartItems ?? [],
  );

  // ── callback syncs every change back to HotelFoodMenuScreen instantly ──────
  const onCartUpdate: ((items: CartItem[]) => void) | undefined =
    route?.params?.onCartUpdate;

  const syncItems = useCallback(
    (updater: (prev: CartItem[]) => CartItem[]) => {
      setItems(prev => {
        const next = updater(prev);
        onCartUpdate?.(next); // ← CartBar on HotelFoodMenuScreen updates in real-time
        return next;
      });
    },
    [onCartUpdate],
  );

  // ── local UI state ─────────────────────────────────────────────────────────
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    label: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>(
    'standard',
  );
  const [tip, setTip] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // ── math ───────────────────────────────────────────────────────────────────
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const couponDiscount = appliedCoupon?.discount ?? 0;
  const delivery =
    deliveryType === 'express' ? DELIVERY_FEE + 30 : DELIVERY_FEE;
  const total = subtotal - couponDiscount + delivery + PLATFORM_FEE + tip;
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  // ── handlers ───────────────────────────────────────────────────────────────
  const changeQty = useCallback(
    (id: string, delta: number) => {
      const item = items.find(i => i.id === id);
      if (!item) return;
      if (item.qty + delta <= 0) {
        Alert.alert('Remove item?', `Remove "${item.name}" from cart?`, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => syncItems(prev => prev.filter(i => i.id !== id)),
          },
        ]);
        return;
      }
      syncItems(prev =>
        prev.map(i => (i.id === id ? { ...i, qty: i.qty + delta } : i)),
      );
    },
    [items, syncItems],
  );

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const c = VALID_COUPONS[code];
    if (!c) {
      setCouponError('Invalid coupon code. Try FIRST50 or SAVE20');
      setAppliedCoupon(null);
      return;
    }
    setCouponError('');
    const discount =
      c.type === 'flat' ? c.value : Math.floor((subtotal * c.value) / 100);
    setAppliedCoupon({ label: c.label, discount });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCoupon('');
    setCouponError('');
  };

  const handleClear = () =>
    Alert.alert('Clear cart?', 'Remove all items?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => syncItems(() => []),
      },
    ]);

  // ── empty state ────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return <CartEmptyScreen onBrowse={() => navigation?.goBack()} />;
  }

  // ── main render ────────────────────────────────────────────────────────────
  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      <CartHeader
        itemCount={itemCount}
        onBack={() => navigation?.goBack()}
        onClear={handleClear}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
        <CartDeliveryToggle
          deliveryType={deliveryType}
          onChange={setDeliveryType}
        />

        <CartAddressBar address="42, Sector 9, Gandhinagar, Gujarat" />

        {/* Items section */}
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={16}
            color={C.textSecondary}
          />
          <Text style={s.sectionTitle}>Items</Text>
        </View>

        {items.map(item => (
          <CartItemCard
            key={item.id}
            item={item}
            onInc={() => changeQty(item.id, 1)}
            onDec={() => changeQty(item.id, -1)}
          />
        ))}

        {/* Add more */}
        <TouchableOpacity
          style={s.addMoreBtn}
          activeOpacity={0.75}
          onPress={() => navigation?.goBack()}
        >
          <Feather name="plus-circle" size={16} color={C.accent} />
          <Text style={s.addMoreText}>Add more items</Text>
        </TouchableOpacity>

        {/* Coupon section */}
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons
            name="ticket-percent-outline"
            size={16}
            color={C.textSecondary}
          />
          <Text style={s.sectionTitle}>Offers & Coupons</Text>
        </View>
        <CartCoupon
          coupon={coupon}
          couponError={couponError}
          appliedCoupon={appliedCoupon}
          onChange={(t: string) => {
            setCoupon(t);
            setCouponError('');
          }}
          onApply={handleApplyCoupon}
          onRemove={handleRemoveCoupon}
          onChipPress={(code: string) => {
            setCoupon(code);
            setCouponError('');
          }}
        />

        {/* Tip section */}
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={16}
            color={C.textSecondary}
          />
          <Text style={s.sectionTitle}>Tip Your Rider</Text>
        </View>
        <CartTip tip={tip} onSelect={setTip} />

        {/* Bill section */}
        <View style={s.sectionHeader}>
          <MaterialCommunityIcons
            name="receipt"
            size={16}
            color={C.textSecondary}
          />
          <Text style={s.sectionTitle}>Bill Summary</Text>
        </View>
        <CartBillSummary
          subtotal={subtotal}
          deliveryType={deliveryType}
          tip={tip}
          appliedCoupon={appliedCoupon}
          total={total}
        />

        <CartSafetyBadges />

        <View style={{ height: 110 }} />
      </ScrollView>

      <CartFooterCTA
        total={total}
        itemCount={itemCount}
        onPlace={() =>
          Alert.alert('Order Placed! 🎉', 'Your food is being prepared.')
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scrollContent: { paddingTop: 16, paddingHorizontal: 16 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  addMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    backgroundColor: C.card,
    borderRadius: 13,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderStyle: 'dashed',
  },
  addMoreText: { fontSize: 14, color: C.accent, fontWeight: '600' },
});
