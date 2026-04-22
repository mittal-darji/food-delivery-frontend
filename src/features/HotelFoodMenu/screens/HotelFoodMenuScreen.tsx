import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WishlistBtn from '../../../components/WishlistBtn/WishlistBtn';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const C = {
  primary: '#F5C518',
  primaryLight: '#FFFBEA',
  primaryMid: '#FDEEA0',
  primaryDark: '#B8860B',
  green: '#16A34A',
  greenBg: '#DCFCE7',
  greenText: '#15803D',
  red: '#DC2626',
  redBg: '#FEE2E2',
  redText: '#B91C1C',
  navy: '#0F172A',
  ink: '#1E293B',
  slate: '#475569',
  muted: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  white: '#FFFFFF',
  bgLight: '#FAFAF7',
  overlay: 'rgba(15,23,42,0.6)',
  cardShadow: '#64748B',
};

interface MenuItem {
  name: string;
  desc: string;
  price: number;
  image: string;
  isVeg: boolean;
  category: string;
  tags?: string[];
  offer: string;
  prepTime?: string;
}

interface HotelData {
  name: string;
  image: string;
  logo: string;
  rating: number;
  reviews: number;
  distance: string;
  deliveryTime: string;
  location: string;
  cuisine: string;
  offer: string;
  tag: string;
  tagColor: string;
  isVeg: boolean;
  startingPrice: number;
  menuItems: MenuItem[];
}

const HOTEL: HotelData = {
  name: 'Shree Vada Pav House',
  image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
  logo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
  rating: 4.7,
  reviews: 2340,
  distance: '1.2 km',
  deliveryTime: '20–30 min',
  location: 'Manek Chowk, Ahmedabad',
  cuisine: 'Street Food · Maharashtrian · Snacks',
  offer: '50% OFF up to ₹100',
  tag: 'BESTSELLER',
  tagColor: '#EF4444',
  isVeg: true,
  startingPrice: 20,
  menuItems: [
    {
      name: 'Vada Pav',
      desc: 'Crispy golden vada in soft pav with green & dry garlic chutney',
      price: 25,
      image:
        'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',
      isVeg: true,
      category: 'Vada Pav',
      prepTime: '5 min',
      offer: '5 off',
      tags: ['Bestseller', 'Spicy'],
    },
    {
      name: 'Bhaji Pav',
      desc: 'Buttery spiced mixed vegetable bhaji with toasted pav',
      price: 60,
      image:
        'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400',
      isVeg: true,
      category: 'Bhaji Pav',
      prepTime: '10 min',
      offer: '5 off',
      tags: ['Popular'],
    },
    {
      name: 'Masala Dosa',
      desc: 'Crispy rice crepe stuffed with spiced potato filling, served with sambar & chutney',
      price: 90,
      image:
        'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
      isVeg: true,
      category: 'Dosa',
      prepTime: '12 min',
      offer: '5 off',
      tags: ['Must Try'],
    },
    {
      name: 'Samosa (2 pcs)',
      desc: 'Crunchy fried pastry filled with spiced potato & peas',
      price: 30,
      image:
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
      isVeg: true,
      category: 'Snacks',
      offer: '5 off',
      prepTime: '7 min',
      tags: ['Crispy'],
    },
    {
      name: 'Plain Dosa',
      desc: 'Thin crispy dosa served with coconut chutney & sambar',
      price: 70,
      image:
        'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400',
      isVeg: true,
      offer: '5 off',
      category: 'Dosa',
      prepTime: '10 min',
      tags: [],
    },
    {
      name: 'Kanda Bhaji',
      desc: 'Crispy onion fritters fried to perfection, served with chutney',
      price: 45,
      image:
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',
      isVeg: true,
      offer: '5 off',
      category: 'Snacks',
      prepTime: '8 min',
      tags: ['Monsoon Special'],
    },
    {
      name: 'Misal Pav',
      desc: 'Spicy sprouted moth bean curry topped with farsan, served with pav',
      price: 80,
      image:
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
      isVeg: true,
      offer: '5 off',
      category: 'Bhaji Pav',
      prepTime: '15 min',
      tags: ['Spicy', 'Popular'],
    },
    {
      name: 'Upma',
      desc: 'Savory semolina porridge tempered with mustard, curry leaves & veggies',
      price: 50,
      image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400',
      isVeg: true,
      offer: '5 off',
      category: 'Breakfast',
      prepTime: '10 min',
      tags: ['Light'],
    },
    {
      name: 'Chai',
      desc: 'Strong ginger-cardamom milk tea brewed the tapri way',
      price: 15,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
      isVeg: true,
      offer: '5 off',
      category: 'Drinks',
      prepTime: '3 min',
      tags: [],
    },
    {
      name: 'Lassi',
      desc: 'Thick sweet yogurt lassi topped with malai',
      price: 40,
      image:
        'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
      isVeg: true,
      offer: '5 off',
      category: 'Drinks',
      prepTime: '5 min',
      tags: ['Chilled'],
    },
  ],
};

const groupByCategory = (items: MenuItem[]) => {
  const map: { [cat: string]: MenuItem[] } = {};
  items.forEach(item => {
    if (!map[item.category]) map[item.category] = [];
    map[item.category].push(item);
  });
  return map;
};

const VegLabel = ({ isVeg }: { isVeg: boolean }) => (
  <View
    style={{
      backgroundColor: isVeg ? C.greenBg : C.redBg,
      borderRadius: 5,
      paddingHorizontal: 7,
      paddingVertical: 3,
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    }}
  >
    <View
      style={{
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: isVeg ? C.greenText : C.redText,
      }}
    />
    <Text
      style={{
        fontSize: 9,
        fontWeight: '800',
        color: isVeg ? C.greenText : C.redText,
        letterSpacing: 0.5,
      }}
    >
      {isVeg ? 'VEG' : 'NON VEG'}
    </Text>
  </View>
);

const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  return (
    <View style={{ flexDirection: 'row', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Text
          key={i}
          style={{ fontSize: 11, color: i <= full ? C.primary : C.border }}
        >
          ★
        </Text>
      ))}
    </View>
  );
};

const TagPill = ({ label, color }: { label: string; color?: string }) => (
  <View
    style={{
      backgroundColor: color ? color + '18' : C.primaryLight,
      borderRadius: 5,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginRight: 4,
      borderWidth: 0.5,
      borderColor: color ? color + '40' : C.primaryMid,
    }}
  >
    <Text
      style={{ fontSize: 9, fontWeight: '700', color: color ?? C.primaryDark }}
    >
      {label}
    </Text>
  </View>
);

const InfoChip = ({
  icon,
  label,
  accent,
}: {
  icon: string;
  label: string;
  accent?: boolean;
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: accent ? C.primaryLight : C.borderLight,
      borderRadius: 8,
      paddingHorizontal: 9,
      paddingVertical: 6,
      gap: 4,
    }}
  >
    <Text style={{ fontSize: 13 }}>{icon}</Text>
    <Text
      style={{
        fontSize: 11,
        fontWeight: '700',
        color: accent ? C.primaryDark : C.slate,
      }}
    >
      {label}
    </Text>
  </View>
);

// ─── Food Item Drawer ─────────────────────────────────────────────────────────
const FoodItemDrawer = ({
  item,
  visible,
  onClose,
  onAddToCart,
  onWishlist,
  isWishlisted,
}: {
  item: MenuItem | null;
  visible: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, qty: number) => void;
  onWishlist: (item: MenuItem) => void;
  isWishlisted: boolean;
}) => {
  const [qty, setQty] = useState(1);

  React.useEffect(() => {
    if (visible) setQty(1);
  }, [visible, item?.name]);

  if (!item) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: C.overlay }}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={FDS.drawer}>
          <View style={FDS.handle} />

          <View>
            <Image
              source={{ uri: item.image }}
              style={FDS.drawerImg}
              resizeMode="cover"
            />

            {/* ── WishlistBtn on drawer image ── */}
            <WishlistBtn
              isWishlisted={isWishlisted}
              onToggle={() => onWishlist(item)}
              size="md"
              variant="overlay"
              style={FDS.wishBtnPos}
            />

            {item.tags && item.tags.length > 0 && (
              <View style={FDS.imgTags}>
                {item.tags.map(t => (
                  <TagPill
                    key={t}
                    label={t}
                    color={t === 'Spicy' ? '#EF4444' : undefined}
                  />
                ))}
              </View>
            )}
            <View style={S.offerBadge}>
              <Ionicons
                name="pricetag"
                size={9}
                color={C.ink}
                style={{ marginRight: 3 }}
              />
              <Text style={S.offerText}>{item.offer}</Text>
            </View>
            <View style={{ position: 'absolute', top: '80%', left: '80%' }}>
              <VegLabel isVeg={item.isVeg} />
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={{ flexGrow: 0 }}
          >
            <View
              style={{
                paddingHorizontal: 18,
                paddingTop: 14,
                paddingBottom: 4,
              }}
            >
              <Text style={FDS.drawerName}>{item.name}</Text>

              <View style={[S.row, { gap: 8, marginBottom: 12 }]}>
                <Stars rating={HOTEL.rating} />
                <Text style={FDS.metaText}>
                  {HOTEL.rating} · {HOTEL.reviews} reviews
                </Text>
              </View>

              <View style={[S.row, { gap: 5, marginBottom: 14 }]}>
                <InfoChip icon="📍" label={HOTEL.distance} />
                <InfoChip icon="🛵" label={HOTEL.deliveryTime} accent />
                {item.prepTime && (
                  <InfoChip icon="👨‍🍳" label={`Prep: ${item.prepTime}`} />
                )}
              </View>

              <Text style={FDS.drawerDesc}>{item.desc}</Text>
              <View style={FDS.divider} />

              <View
                style={[
                  S.row,
                  { justifyContent: 'space-between', marginBottom: 16 },
                ]}
              >
                <View>
                  <Text style={FDS.priceLabel}>Total Price</Text>
                  <Text style={FDS.drawerPrice}>₹{item.price * qty}</Text>
                  {qty > 1 && (
                    <Text style={FDS.perItem}>
                      ₹{item.price} × {qty}
                    </Text>
                  )}
                </View>
                <View style={FDS.qtyRow}>
                  <TouchableOpacity
                    style={FDS.qtyMinus}
                    onPress={() => setQty(q => Math.max(1, q - 1))}
                    activeOpacity={0.7}
                  >
                    <Text style={FDS.qtyBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={FDS.qtyNum}>{qty}</Text>
                  <TouchableOpacity
                    style={FDS.qtyPlus}
                    onPress={() => setQty(q => q + 1)}
                    activeOpacity={0.7}
                  >
                    <Text style={FDS.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[S.row, { gap: 10, paddingBottom: 10 }]}>
                {/* ── WishlistBtn in plain variant for action row ── */}
                <TouchableOpacity
                  style={FDS.wishlistBtn}
                  onPress={() => onWishlist(item)}
                  activeOpacity={0.8}
                >
                  <WishlistBtn
                    isWishlisted={isWishlisted}
                    onToggle={() => onWishlist(item)}
                    size="sm"
                    variant="plain"
                  />
                  <Text style={FDS.wishlistBtnText}>
                    {isWishlisted ? 'Saved' : 'Wishlist'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={FDS.addCartBtn}
                  onPress={() => {
                    onAddToCart(item, qty);
                    onClose();
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={{ fontSize: 15, marginRight: 7 }}>🛒</Text>
                  <Text style={FDS.addCartBtnText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ─── Full Menu Drawer ─────────────────────────────────────────────────────────
const FullMenuDrawer = ({
  visible,
  onClose,
  onSelectItem,
}: {
  visible: boolean;
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
}) => {
  const [openCats, setOpenCats] = useState<{ [cat: string]: boolean }>({});
  const grouped = groupByCategory(HOTEL.menuItems);

  const toggleCat = (cat: string) =>
    setOpenCats(prev => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: C.overlay }}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={MDS.drawer}>
          <View style={MDS.handle} />

          <View style={MDS.header}>
            <View style={[S.row, { gap: 10, flex: 1 }]}>
              <Text style={{ fontSize: 20 }}>🍽️</Text>
              <View>
                <Text style={MDS.title}>Full Menu</Text>
                <Text style={MDS.subtitle}>
                  {HOTEL.menuItems.length} items · {Object.keys(grouped).length}{' '}
                  categories
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={MDS.closeBtn}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: C.slate }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.entries(grouped).map(([cat, items]) => (
              <View key={cat}>
                <TouchableOpacity
                  style={MDS.catHeader}
                  onPress={() => toggleCat(cat)}
                  activeOpacity={0.75}
                >
                  <View style={[S.row, { flex: 1, gap: 10 }]}>
                    <Text style={MDS.catName}>{cat}</Text>
                    <View style={MDS.countBadge}>
                      <Text style={MDS.countText}>{items.length}</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 13, color: C.muted }}>
                    {openCats[cat] ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {openCats[cat] &&
                  items.map((item, i) => (
                    <TouchableOpacity
                      key={i}
                      style={MDS.menuRow}
                      onPress={() => {
                        onClose();
                        setTimeout(() => onSelectItem(item), 320);
                      }}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={MDS.itemThumb}
                        resizeMode="cover"
                      />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <VegLabel isVeg={item.isVeg} />
                        <Text style={MDS.itemName}>{item.name}</Text>
                        <Text style={MDS.itemDesc} numberOfLines={1}>
                          {item.desc}
                        </Text>
                        <Text style={MDS.itemPrice}>₹{item.price}</Text>
                      </View>
                      <View style={MDS.arrowBtn}>
                        <Text style={{ fontSize: 16, color: C.muted }}>›</Text>
                      </View>
                    </TouchableOpacity>
                  ))}

                <View
                  style={{
                    height: 1,
                    backgroundColor: C.border,
                    marginHorizontal: 16,
                  }}
                />
              </View>
            ))}
            <View style={{ height: 30 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function HotelFoodMenuScreen({
  initialItem,
  onBack,
}: {
  initialItem?: MenuItem;
  onBack?: () => void;
}) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [drawerItem, setDrawerItem] = useState<MenuItem | null>(
    initialItem ?? null,
  );
  const [itemDrawerVisible, setItemDrawerVisible] = useState(!!initialItem);
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false);

  const addToCart = (item: MenuItem, qty: number = 1) => {
    setCartCount(c => c + qty);
    setCartItems(prev => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + qty,
    }));
  };

  const toggleWishlist = (item: MenuItem) => {
    setWishlist(prev =>
      prev.includes(item.name)
        ? prev.filter(n => n !== item.name)
        : [...prev, item.name],
    );
  };

  const openItemDrawer = (item: MenuItem) => {
    setDrawerItem(item);
    setItemDrawerVisible(true);
  };

  const totalAmount = HOTEL.menuItems.reduce(
    (sum, item) => sum + (cartItems[item.name] || 0) * item.price,
    0,
  );

  const fabBottom = cartCount > 0 ? 98 : 28;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bgLight }}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={SS.topBtnLeft} onPress={onBack}>
          <Text
            style={{
              fontSize: 30,
              color: C.ink,
              position: 'absolute',
              bottom: '2%',
            }}
          >
            ←
          </Text>
        </TouchableOpacity>

        {/* ── Hotel Info Card ── */}
        <View style={SS.infoCard}>
          <View style={[S.row, { marginBottom: 12 }]}>
            <Image source={{ uri: HOTEL.logo }} style={SS.logo} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={SS.hotelName}>{HOTEL.name}</Text>
              <Text style={SS.cuisine}>{HOTEL.cuisine}</Text>
              <View style={[S.row, { gap: 6, marginTop: 5 }]}>
                <Stars rating={HOTEL.rating} />
                <Text style={SS.ratingText}>{HOTEL.rating}</Text>
                <Text style={SS.reviewText}>({HOTEL.reviews})</Text>
              </View>
            </View>
            <VegLabel isVeg={HOTEL.isVeg} />
          </View>

          <View
            style={[
              S.row,
              {
                gap: 8,
                marginBottom: 14,
                padding: 10,
                backgroundColor: C.borderLight,
                borderRadius: 10,
              },
            ]}
          >
            <Text style={{ fontSize: 14 }}>📍</Text>
            <Text style={SS.locationText} numberOfLines={1}>
              {HOTEL.location}
            </Text>
          </View>

          <View style={SS.statsRow}>
            {[
              { icon: '⭐', val: String(HOTEL.rating), label: 'Rating' },
              { icon: '🗣️', val: String(HOTEL.reviews), label: 'Reviews' },
              { icon: '🛵', val: HOTEL.deliveryTime, label: 'Delivery' },
              { icon: '📍', val: HOTEL.distance, label: 'Distance' },
              { icon: '💰', val: `₹${HOTEL.startingPrice}`, label: 'From' },
            ].map((s, i) => (
              <View key={s.label} style={[SS.statItem, i < 4 && SS.statBorder]}>
                <Text style={{ fontSize: 14, marginBottom: 3 }}>{s.icon}</Text>
                <Text style={SS.statVal}>{s.val}</Text>
                <Text style={SS.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Menu Items ── */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
          <View
            style={[
              S.row,
              { justifyContent: 'space-between', marginBottom: 14 },
            ]}
          >
            <Text style={SS.sectionTitle}>Menu Highlights</Text>
            <TouchableOpacity
              style={SS.seeAllBtn}
              onPress={() => setMenuDrawerVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={SS.seeAllText}>Full Menu →</Text>
            </TouchableOpacity>
          </View>

          {HOTEL.menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={SS.menuCard}
              onPress={() => openItemDrawer(item)}
              activeOpacity={0.88}
            >
              <Image
                source={{ uri: item.image }}
                style={SS.menuImg}
                resizeMode="cover"
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <VegLabel isVeg={item.isVeg} />
                <Text style={SS.menuName}>{item.name}</Text>
                <Text style={SS.menuDesc} numberOfLines={2}>
                  {item.desc}
                </Text>
                {item.tags && item.tags.length > 0 && (
                  <View style={[S.row, { marginTop: 5, flexWrap: 'wrap' }]}>
                    {item.tags.map(t => (
                      <TagPill
                        key={t}
                        label={t}
                        color={t === 'Spicy' ? '#EF4444' : undefined}
                      />
                    ))}
                  </View>
                )}
                <View
                  style={[
                    S.row,
                    { marginTop: 7, justifyContent: 'space-between' },
                  ]}
                >
                  <Text style={SS.menuPrice}>₹{item.price}</Text>
                </View>
              </View>

              <View style={{ alignItems: 'center', marginLeft: 10, gap: 10 }}>
                {(cartItems[item.name] ?? 0) > 0 && (
                  <View style={SS.cartCountBadge}>
                    <Text style={SS.cartCountText}>{cartItems[item.name]}</Text>
                  </View>
                )}

                {/* ── WishlistBtn plain variant on menu row ── */}
                <View
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <View>
                    <WishlistBtn
                      isWishlisted={wishlist.includes(item.name)}
                      onToggle={() => toggleWishlist(item)}
                      size="sm"
                      variant="plain"
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={SS.addBtn}
                      onPress={e => {
                        e.stopPropagation?.();
                        addToCart(item);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={{ fontSize: 20, color: C.ink, lineHeight: 22 }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 150 }} />
      </ScrollView>

      {/* ── Full Menu FAB ── */}
      <TouchableOpacity
        style={[SS.menuFab, { bottom: fabBottom }]}
        onPress={() => setMenuDrawerVisible(true)}
        activeOpacity={0.85}
      >
        <Text style={SS.fabIcon}>≡</Text>
        <Text style={SS.fabLabel}>Menu</Text>
        <View style={SS.fabBadge}>
          <Text style={SS.fabBadgeText}>{HOTEL.menuItems.length}</Text>
        </View>
      </TouchableOpacity>

      {/* ── Cart Bar ── */}
      {cartCount > 0 && (
        <View style={SS.cartBar}>
          <View>
            <Text style={SS.cartBarLabel}>
              {cartCount} item{cartCount !== 1 ? 's' : ''} · ₹{totalAmount}
            </Text>
            <Text style={SS.cartBarSub}>Free delivery above ₹199</Text>
          </View>
          <TouchableOpacity style={SS.viewCartBtn} activeOpacity={0.85}>
            <Text style={{ fontSize: 14, marginRight: 6 }}>🛒</Text>
            <Text style={SS.viewCartText}>View Cart</Text>
            <View style={SS.cartNumBadge}>
              <Text style={SS.cartNumText}>{cartCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

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

// ─── Shared ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  offerBadge: {
    position: 'absolute',
    top: '5%',
    left: '2%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.primary,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  offerText: { fontSize: 9, fontWeight: '900', color: C.ink },
});

// ─── Main Screen Styles ───────────────────────────────────────────────────────
const SS = StyleSheet.create({
  topBtnLeft: {
    marginBottom: 0,
    margin: 20,
    width: 40,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  infoCard: {
    marginTop: 0,
    margin: 14,
    padding: 10,
    elevation: 5,
  },
  logo: { width: 60, height: 60, borderRadius: 14, backgroundColor: C.border },
  hotelName: { fontSize: 20, fontWeight: '800', color: C.ink },
  cuisine: { fontSize: 13, color: C.muted, fontWeight: '500', marginTop: 2 },
  ratingText: { fontSize: 14, fontWeight: '700', color: C.ink },
  reviewText: { fontSize: 13, color: C.muted },
  locationText: { fontSize: 13, fontWeight: '600', color: C.slate, flex: 1 },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: C.primaryLight,
    borderRadius: 14,
    overflow: 'hidden',
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  statBorder: { borderRightWidth: 1, borderRightColor: C.primaryMid },
  statVal: { fontSize: 12, fontWeight: '800', color: C.ink },
  statLabel: { fontSize: 11, color: C.muted, fontWeight: '600', marginTop: 1 },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: C.ink },
  seeAllBtn: {
    backgroundColor: C.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  seeAllText: { fontSize: 11, fontWeight: '700', color: C.primaryDark },

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
  menuImg: {
    width: 82,
    height: 82,
    borderRadius: 12,
    backgroundColor: C.border,
  },
  menuName: {
    fontSize: 13,
    fontWeight: '800',
    color: C.ink,
    marginTop: 5,
    marginBottom: 3,
  },
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
    width: 36,
    height: 36,
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

  menuFab: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.navy,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 11,
    elevation: 12,
    shadowColor: C.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    gap: 7,
  },
  fabIcon: { fontSize: 16, color: C.white, fontWeight: '700' },
  fabLabel: { fontSize: 12, fontWeight: '800', color: C.white },
  fabBadge: {
    backgroundColor: C.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  fabBadgeText: { fontSize: 10, fontWeight: '900', color: C.ink },

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
  cartBarSub: { fontSize: 10, color: C.muted, marginTop: 1 },
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

// ─── Food Item Drawer Styles ──────────────────────────────────────────────────
const FDS = StyleSheet.create({
  drawer: {
    backgroundColor: C.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    overflow: 'hidden',
    maxHeight: SCREEN_HEIGHT * 0.88,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 3,
    backgroundColor: C.border,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  drawerImg: { width: '100%', height: 250 },
  // position only for WishlistBtn on image
  wishBtnPos: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  imgTags: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    flexDirection: 'row',
  },
  drawerName: {
    fontSize: 20,
    fontWeight: '900',
    color: C.ink,
    marginTop: 6,
    marginBottom: 8,
  },
  metaText: { fontSize: 11, color: C.muted, fontWeight: '500' },
  drawerDesc: {
    fontSize: 13,
    color: C.slate,
    lineHeight: 20,
    fontWeight: '500',
  },
  divider: { height: 1, backgroundColor: C.border, marginVertical: 14 },
  priceLabel: {
    fontSize: 11,
    color: C.muted,
    fontWeight: '600',
    marginBottom: 2,
  },
  drawerPrice: {
    fontSize: 28,
    fontWeight: '900',
    color: C.primaryDark,
    letterSpacing: -0.5,
  },
  perItem: { fontSize: 11, color: C.muted, marginTop: 2 },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.borderLight,
    borderRadius: 14,
    padding: 4,
    gap: 2,
  },
  qtyMinus: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyPlus: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 20, fontWeight: '600', color: C.ink, lineHeight: 24 },
  qtyNum: {
    fontSize: 16,
    fontWeight: '900',
    color: C.ink,
    paddingHorizontal: 16,
  },
  wishlistBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistBtnText: { fontSize: 13, fontWeight: '800', color: C.red },
  addCartBtn: {
    flex: 2,
    height: 52,
    borderRadius: 14,
    backgroundColor: C.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  addCartBtnText: { fontSize: 14, fontWeight: '900', color: C.ink },
});

// ─── Full Menu Drawer Styles ──────────────────────────────────────────────────
const MDS = StyleSheet.create({
  drawer: {
    backgroundColor: C.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    maxHeight: SCREEN_HEIGHT * 0.75,
    overflow: 'hidden',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 3,
    backgroundColor: C.border,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  title: { fontSize: 16, fontWeight: '900', color: C.ink },
  subtitle: { fontSize: 11, color: C.muted, fontWeight: '500', marginTop: 1 },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: C.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: C.bgLight,
  },
  catName: { fontSize: 13, fontWeight: '800', color: C.ink },
  countBadge: {
    backgroundColor: C.primary,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  countText: { fontSize: 10, fontWeight: '900', color: C.ink },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: C.white,
  },
  itemThumb: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: C.border,
  },
  itemName: { fontSize: 13, fontWeight: '700', color: C.ink, marginTop: 4 },
  itemDesc: { fontSize: 11, color: C.muted, marginTop: 2 },
  itemPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: C.primaryDark,
    marginTop: 3,
  },
  arrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: C.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
