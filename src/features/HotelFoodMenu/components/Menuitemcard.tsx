import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WishlistBtn from '../../../components/WishlistBtn/WishlistBtn';
import { C, MenuItem, VegLabel, TagPill, sharedStyles } from './Uiatoms';

interface MenuItemCardProps {
  item: MenuItem;
  cartQty: number;
  isWishlisted: boolean;
  onPress: () => void;
  onAddToCart: () => void;
  onWishlistToggle: () => void;
}

const MenuItemCard = ({
  item,
  cartQty,
  isWishlisted,
  onPress,
  onAddToCart,
  onWishlistToggle,
}: MenuItemCardProps) => (
  <TouchableOpacity style={styles.menuCard} onPress={onPress} activeOpacity={0.88}>
    <Image source={{ uri: item.image }} style={styles.menuImg} resizeMode="cover" />

    <View style={{ flex: 1, marginLeft: 12 }}>
      <VegLabel isVeg={item.isVeg} />
      <Text style={styles.menuName}>{item.name}</Text>
      <Text style={styles.menuDesc} numberOfLines={2}>
        {item.desc}
      </Text>
      {item.tags && item.tags.length > 0 && (
        <View style={[sharedStyles.row, { marginTop: 5, flexWrap: 'wrap' }]}>
          {item.tags.map(t => (
            <TagPill key={t} label={t} color={t === 'Spicy' ? '#EF4444' : undefined} />
          ))}
        </View>
      )}
      <View style={[sharedStyles.row, { marginTop: 7, justifyContent: 'space-between' }]}>
        <Text style={styles.menuPrice}>₹{item.price}</Text>
      </View>
    </View>

    <View style={{ alignItems: 'center', marginLeft: 10, gap: 10 }}>
      {cartQty > 0 && (
        <View style={styles.cartCountBadge}>
          <Text style={styles.cartCountText}>{cartQty}</Text>
        </View>
      )}
      <View style={{ alignItems: 'center', gap: 8 }}>
        <WishlistBtn
          isWishlisted={isWishlisted}
          onToggle={onWishlistToggle}
          size="sm"
          variant="plain"
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={e => {
            e.stopPropagation?.();
            onAddToCart();
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={22} color={C.ink} />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: C.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: C.border,
  },
  menuImg: { width: 82, height: 82, borderRadius: 12, backgroundColor: C.border },
  menuName: { fontSize: 13, fontWeight: '800', color: C.ink, marginTop: 5, marginBottom: 3 },
  menuDesc: { fontSize: 11, color: C.muted, lineHeight: 15 },
  menuPrice: { fontSize: 14, fontWeight: '900', color: C.primaryDark },
  cartCountBadge: {
    backgroundColor: C.primaryLight,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  cartCountText: { fontSize: 10, fontWeight: '900', color: C.primaryDark },
  addBtn: {
    width: 30,
    height: 30,
    backgroundColor: C.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 5,
  },
});

export default MenuItemCard;