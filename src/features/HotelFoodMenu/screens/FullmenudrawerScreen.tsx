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
import { C, MenuItem, HOTEL, groupByCategory, VegLabel, sharedStyles } from '../components/Uiatoms';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FullMenuDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
}

const FullMenuDrawer = ({ visible, onClose, onSelectItem }: FullMenuDrawerProps) => {
  const [openCats, setOpenCats] = useState<{ [cat: string]: boolean }>({});
  const grouped = groupByCategory(HOTEL.menuItems);

  const toggleCat = (cat: string) =>
    setOpenCats(prev => ({ ...prev, [cat]: !prev[cat] }));

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

          {/* ── Header ── */}
          <View style={styles.header}>
            <View style={[sharedStyles.row, { gap: 10, flex: 1 }]}>
              <Ionicons name="restaurant" size={20} color={C.primaryDark} />
              <View>
                <Text style={styles.title}>Full Menu</Text>
                <Text style={styles.subtitle}>
                  {HOTEL.menuItems.length} items · {Object.keys(grouped).length} categories
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={16} color={C.slate} />
            </TouchableOpacity>
          </View>

          {/* ── Accordion list ── */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.entries(grouped).map(([cat, items]) => (
              <View key={cat}>
                <TouchableOpacity
                  style={styles.catHeader}
                  onPress={() => toggleCat(cat)}
                  activeOpacity={0.75}
                >
                  <View style={[sharedStyles.row, { flex: 1, gap: 10 }]}>
                    <Text style={styles.catName}>{cat}</Text>
                    <View style={styles.countBadge}>
                      <Text style={styles.countText}>{items.length}</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={openCats[cat] ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={C.muted}
                  />
                </TouchableOpacity>

                {openCats[cat] &&
                  items.map((item, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.menuRow}
                      onPress={() => { onClose(); setTimeout(() => onSelectItem(item), 320); }}
                      activeOpacity={0.8}
                    >
                      <Image source={{ uri: item.image }} style={styles.itemThumb} resizeMode="cover" />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <VegLabel isVeg={item.isVeg} />
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDesc} numberOfLines={1}>{item.desc}</Text>
                        <Text style={styles.itemPrice}>₹{item.price}</Text>
                      </View>
                      <View style={styles.arrowBtn}>
                        <Ionicons name="chevron-forward" size={16} color={C.muted} />
                      </View>
                    </TouchableOpacity>
                  ))}

                <View style={{ height: 1, backgroundColor: C.border, marginHorizontal: 16 }} />
              </View>
            ))}
            <View style={{ height: 30 }} />
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
    maxHeight: SCREEN_HEIGHT * 0.75,
    overflow: 'hidden',
  },
  handle: {
    width: 40, height: 4, borderRadius: 3,
    backgroundColor: C.border, alignSelf: 'center', marginTop: 10, marginBottom: 6,
  },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 18, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  title: { fontSize: 16, fontWeight: '900', color: C.ink },
  subtitle: { fontSize: 11, color: C.muted, fontWeight: '500', marginTop: 1 },
  closeBtn: {
    width: 32, height: 32, borderRadius: 9,
    backgroundColor: C.borderLight, alignItems: 'center', justifyContent: 'center',
  },
  catHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 18, paddingVertical: 13, backgroundColor: C.bgLight,
  },
  catName: { fontSize: 13, fontWeight: '800', color: C.ink },
  countBadge: { backgroundColor: C.primary, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  countText: { fontSize: 10, fontWeight: '900', color: C.ink },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 11, backgroundColor: C.white,
  },
  itemThumb: { width: 58, height: 58, borderRadius: 12, backgroundColor: C.border },
  itemName: { fontSize: 13, fontWeight: '700', color: C.ink, marginTop: 4 },
  itemDesc: { fontSize: 11, color: C.muted, marginTop: 2 },
  itemPrice: { fontSize: 12, fontWeight: '800', color: C.primaryDark, marginTop: 3 },
  arrowBtn: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: C.borderLight, alignItems: 'center', justifyContent: 'center', marginLeft: 8,
  },
});

export default FullMenuDrawer;