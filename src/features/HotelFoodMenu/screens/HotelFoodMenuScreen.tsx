import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { C, MenuItem, HOTEL } from '../components/Uiatoms';
import HotelInfoCard from '../components/Hotelinfocard';
import MenuItemCard from '../components/Menuitemcard';
import MenuFAB from '../components/Menufab';
import CartBar from '../components/Cartbar';
import FoodItemDrawer from './FooditemdrawerScreen';
import FullMenuDrawer from './FullmenudrawerScreen';

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

export default function HotelFoodMenuScreen({ route }: any) {
  const navigation = useNavigation<any>();
  const { initialItem } = route?.params || {};

  // ── cart state ─────────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ── local UI state ─────────────────────────────────────────────────────────
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [drawerItem, setDrawerItem] = useState<MenuItem | null>(
    initialItem ?? null,
  );
  const [itemDrawerVisible, setItemDrawerVisible] = useState(!!initialItem);
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false);

  // ── derived ────────────────────────────────────────────────────────────────
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalAmount = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  // ── add to cart ────────────────────────────────────────────────────────────
  const addToCart = (item: MenuItem, qty: number = 1) => {
    setCartItems(prev => {
      const id = String((item as any).id ?? item.name);
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          id,
          name: item.name,
          restaurant: HOTEL.name,
          price: item.price,
          image: (item as any).image,
          emoji: (item as any).emoji,
          customization: (item as any).customization ?? '',
          qty,
          rating: (item as any).rating ?? 4.5,
          isVeg: (item as any).isVeg ?? false,
          tag: (item as any).tag,
        },
      ];
    });
  };

  const toggleWishlist = (item: MenuItem) =>
    setWishlist(prev =>
      prev.includes(item.name)
        ? prev.filter(n => n !== item.name)
        : [...prev, item.name],
    );

  const openItemDrawer = (item: MenuItem) => {
    setDrawerItem(item);
    setItemDrawerVisible(true);
  };

  // ── navigate to cart — pass items AND a callback to sync back ──────────────
  const handleViewCart = () => {
    navigation.navigate('Cart', {
      cartItems,
      // CartScreen calls this when it goes back so HotelFoodMenuScreen stays in sync
      onCartUpdate: (updatedItems: CartItem[]) => {
        setCartItems(updatedItems);
      },
    });
  };

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bgLight }}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.topBtnLeft}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={C.ink} />
        </TouchableOpacity>

        <HotelInfoCard hotel={HOTEL} />

        <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
          <View
            style={[
              styles.row,
              { justifyContent: 'space-between', marginBottom: 14 },
            ]}
          >
            <Text style={styles.sectionTitle}>Menu Highlights</Text>
            <TouchableOpacity
              style={styles.seeAllBtn}
              onPress={() => setMenuDrawerVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.seeAllText}>Full Menu</Text>
              <Ionicons
                name="chevron-forward"
                size={12}
                color={C.primaryDark}
              />
            </TouchableOpacity>
          </View>

          {HOTEL.menuItems.map((item, idx) => (
            <MenuItemCard
              key={idx}
              item={item}
              cartQty={
                cartItems.find(
                  c => c.id === String((item as any).id ?? item.name),
                )?.qty ?? 0
              }
              isWishlisted={wishlist.includes(item.name)}
              onPress={() => openItemDrawer(item)}
              onAddToCart={() => addToCart(item)}
              onWishlistToggle={() => toggleWishlist(item)}
            />
          ))}
        </View>

        <View style={{ height: 150 }} />
      </ScrollView>

      <MenuFAB
        itemCount={HOTEL.menuItems.length}
        bottom={cartCount > 0 ? 98 : 28}
        onPress={() => setMenuDrawerVisible(true)}
      />

      <CartBar
        cartCount={cartCount}
        totalAmount={totalAmount}
        onViewCart={handleViewCart}
      />

      <FoodItemDrawer
        item={drawerItem}
        visible={itemDrawerVisible}
        onClose={() => setItemDrawerVisible(false)}
        onAddToCart={addToCart}
        onWishlist={toggleWishlist}
        isWishlisted={drawerItem ? wishlist.includes(drawerItem.name) : false}
      />

      <FullMenuDrawer
        visible={menuDrawerVisible}
        onClose={() => setMenuDrawerVisible(false)}
        onSelectItem={item => openItemDrawer(item)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBtnLeft: { margin: 16, width: 40, height: 20 },
  row: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: C.ink },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 3,
  },
  seeAllText: { fontSize: 11, fontWeight: '700', color: C.primaryDark },
});
