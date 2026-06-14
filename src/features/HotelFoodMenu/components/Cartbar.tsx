import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { C } from './Uiatoms';

// ✅ Removed useNavigation — was bypassing onViewCart prop and losing cartItems
interface CartBarProps {
  cartCount: number;
  totalAmount: number;
  onViewCart: () => void;
}

const CartBar = ({ cartCount, totalAmount, onViewCart }: CartBarProps) => {
  if (cartCount === 0) return null;

  return (
    <View style={styles.cartBar}>
      <View style={{ gap: 2 }}>
        <Text style={styles.cartBarLabel}>
          {cartCount} item{cartCount !== 1 ? 's' : ''} · ₹{totalAmount}
        </Text>
        <Text style={styles.cartBarSub}>Free delivery above ₹199</Text>
      </View>

      <TouchableOpacity
        style={styles.viewCartBtn}
        onPress={onViewCart} // ✅ uses prop — carries cartItems via navigation.push
        activeOpacity={0.85}
      >
        <Ionicons
          name="cart"
          size={16}
          color={C.ink}
          style={{ marginRight: 6 }}
        />
        <Text style={styles.viewCartText}>View Cart</Text>
        <View style={styles.cartNumBadge}>
          <Text style={styles.cartNumText}>{cartCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 28,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cartBarLabel: { fontSize: 14, fontWeight: '800', color: C.ink },
  cartBarSub: { fontSize: 10, color: C.muted },
  viewCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.primary,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 11,
    elevation: 5,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  viewCartText: { fontSize: 13, fontWeight: '800', color: C.ink },
  cartNumBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
  },
  cartNumText: { fontSize: 9, fontWeight: '900', color: C.ink },
});

export default CartBar;
