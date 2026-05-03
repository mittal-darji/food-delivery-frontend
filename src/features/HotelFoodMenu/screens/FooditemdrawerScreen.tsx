import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WishlistBtn from '../../../components/WishlistBtn/WishlistBtn';
import {
  C,
  MenuItem,
  HOTEL,
  VegLabel,
  Stars,
  InfoChip,
  TagPill,
  sharedStyles,
} from '../components/Uiatoms';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FoodItemDrawerProps {
  item: MenuItem | null;
  visible: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, qty: number) => void;
  onWishlist: (item: MenuItem) => void;
  isWishlisted: boolean;
}

const FoodItemDrawer = ({
  item,
  visible,
  onClose,
  onAddToCart,
  onWishlist,
  isWishlisted,
}: FoodItemDrawerProps) => {
  const [qty, setQty] = useState(1);

  React.useEffect(() => {
    if (visible) setQty(1);
  }, [visible, item?.name]);

  if (!item) return null;

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: C.overlay }}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.drawer}>
          <View style={styles.handle} />

          {/* ── Image block ── */}
          <View>
            <Image source={{ uri: item.image }} style={styles.drawerImg} resizeMode="cover" />

            <WishlistBtn
              isWishlisted={isWishlisted}
              onToggle={() => onWishlist(item)}
              size="md"
              variant="overlay"
              style={styles.wishBtnPos}
            />

            {item.tags && item.tags.length > 0 && (
              <View style={styles.imgTags}>
                {item.tags.map(t => (
                  <TagPill key={t} label={t} color={t === 'Spicy' ? '#EF4444' : undefined} />
                ))}
              </View>
            )}

            {/* Offer badge with real icon */}
            <View style={sharedStyles.offerBadge}>
              <Ionicons name="pricetag" size={10} color={C.ink} />
              <Text style={sharedStyles.offerText}>{item.offer}</Text>
            </View>

            <View style={{ position: 'absolute', top: '80%', left: '80%' }}>
              <VegLabel isVeg={item.isVeg} />
            </View>
          </View>

          {/* ── Content ── */}
          <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={{ flexGrow: 0 }}>
            <View style={{ paddingHorizontal: 18, paddingTop: 14, paddingBottom: 4 }}>
              <Text style={styles.drawerName}>{item.name}</Text>

              <View style={[sharedStyles.row, { gap: 8, marginBottom: 12 }]}>
                <Stars rating={HOTEL.rating} />
                <Text style={styles.metaText}>
                  {HOTEL.rating} · {HOTEL.reviews} reviews
                </Text>
              </View>

              {/* InfoChips with real icons */}
              <View style={[sharedStyles.row, { gap: 5, marginBottom: 14 }]}>
                <InfoChip iconName="navigate-circle" label={HOTEL.distance} />
                <InfoChip iconName="bicycle" label={HOTEL.deliveryTime} accent />
                {item.prepTime && (
                  <InfoChip
                    iconName="time-outline"
                    label={`Prep: ${item.prepTime}`}
                  />
                )}
              </View>

              <Text style={styles.drawerDesc}>{item.desc}</Text>
              <View style={styles.divider} />

              {/* ── Price & Qty ── */}
              <View style={[sharedStyles.row, { justifyContent: 'space-between', marginBottom: 16 }]}>
                <View>
                  <Text style={styles.priceLabel}>Total Price</Text>
                  <Text style={styles.drawerPrice}>₹{item.price * qty}</Text>
                  {qty > 1 && (
                    <Text style={styles.perItem}>₹{item.price} × {qty}</Text>
                  )}
                </View>
                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyMinus}
                    onPress={() => setQty(q => Math.max(1, q - 1))}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="remove" size={20} color={C.ink} />
                  </TouchableOpacity>
                  <Text style={styles.qtyNum}>{qty}</Text>
                  <TouchableOpacity
                    style={styles.qtyPlus}
                    onPress={() => setQty(q => q + 1)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="add" size={20} color={C.ink} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* ── Action buttons ── */}
              <View style={[sharedStyles.row, { gap: 10, paddingBottom: 10 }]}>
                <TouchableOpacity
                  style={styles.wishlistBtn}
                  onPress={() => onWishlist(item)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={isWishlisted ? 'heart' : 'heart-outline'}
                    size={16}
                    color={C.red}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.wishlistBtnText}>
                    {isWishlisted ? 'Saved' : 'Wishlist'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.addCartBtn}
                  onPress={() => { onAddToCart(item, qty); onClose(); }}
                  activeOpacity={0.85}
                >
                  <Ionicons name="cart" size={16} color={C.ink} style={{ marginRight: 7 }} />
                  <Text style={styles.addCartBtnText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: C.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    overflow: 'hidden',
    maxHeight: SCREEN_HEIGHT * 0.88,
  },
  handle: {
    width: 40, height: 4, borderRadius: 3,
    backgroundColor: C.border, alignSelf: 'center', marginTop: 10, marginBottom: 2,
  },
  drawerImg: { width: '100%', height: 250 },
  wishBtnPos: { position: 'absolute', top: 12, right: 12 },
  imgTags: { position: 'absolute', bottom: 10, left: 12, flexDirection: 'row' },
  drawerName: { fontSize: 20, fontWeight: '900', color: C.ink, marginTop: 6, marginBottom: 8 },
  metaText: { fontSize: 11, color: C.muted, fontWeight: '500' },
  drawerDesc: { fontSize: 13, color: C.slate, lineHeight: 20, fontWeight: '500' },
  divider: { height: 1, backgroundColor: C.border, marginVertical: 14 },
  priceLabel: { fontSize: 11, color: C.muted, fontWeight: '600', marginBottom: 2 },
  drawerPrice: { fontSize: 28, fontWeight: '900', color: C.primaryDark, letterSpacing: -0.5 },
  perItem: { fontSize: 11, color: C.muted, marginTop: 2 },
  qtyRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.borderLight, borderRadius: 14, padding: 4, gap: 2,
  },
  qtyMinus: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: C.white, borderWidth: 1, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyPlus: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  qtyNum: { fontSize: 16, fontWeight: '900', color: C.ink, paddingHorizontal: 16 },
  wishlistBtn: {
    flex: 1, height: 52, borderRadius: 14,
    borderWidth: 1.5, borderColor: C.red,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  wishlistBtnText: { fontSize: 13, fontWeight: '800', color: C.red },
  addCartBtn: {
    flex: 2, height: 52, borderRadius: 14,
    backgroundColor: C.primary, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    elevation: 5, shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8,
  },
  addCartBtnText: { fontSize: 14, fontWeight: '900', color: C.ink },
});

export default FoodItemDrawer;