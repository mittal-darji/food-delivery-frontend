import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const C = {
  primary: '#F5C518',
  primaryDark: '#C49A00',
  ink: '#1A1033',
  slate: '#4A5568',
  muted: '#8C96A3',
  border: '#EDF0F4',
  bgLight: '#FEFDDF',
  white: '#FFFFFF',
};

const CATEGORIES = [
  { id: 0, label: 'All', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=90' },
  { id: 1, label: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=90' },
  { id: 2, label: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=90' },
  { id: 3, label: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&q=90' },
  { id: 4, label: 'Mexican', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&q=90' },
  { id: 5, label: 'Noodles', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&q=90' },
  { id: 6, label: 'Salads', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=90' },
  { id: 7, label: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&q=90' },
  { id: 8, label: 'Drinks', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&q=90' },
  { id: 9, label: 'Tacos', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=90' },
  { id: 10, label: 'Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&q=90' },
  { id: 11, label: 'Steak', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=90' },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  activeCat: number;
  setActiveCat: (id: number) => void;
}

export default function AllCategoriesModal({ visible, onClose, activeCat, setActiveCat }: Props) {
  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={S.backdrop}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
        <View style={S.sheet}>
          <View style={S.handle} />
          <View style={[S.row, { justifyContent: 'space-between', marginBottom: 18 }]}>
            <Text style={S.title}>All Categories</Text>
            <TouchableOpacity onPress={onClose} style={S.closeBtn}>
              <Text style={{ color: C.muted, fontSize: 16, fontWeight: '700' }}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={S.grid}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={S.item}
                  onPress={() => { setActiveCat(cat.id); onClose(); }}
                  activeOpacity={0.8}
                >
                  <View style={[S.imgWrap, activeCat === cat.id && { borderColor: C.primary, borderWidth: 2.5 }]}>
                    <Image source={{ uri: cat.image }} style={S.img} resizeMode="cover" />
                    {activeCat === cat.id && (
                      <View style={S.checkOverlay}>
                        <Text style={{ color: C.ink, fontSize: 14, fontWeight: '900' }}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[S.label, activeCat === cat.id && { color: C.primaryDark, fontWeight: '800' }]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const S = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: C.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 10,
    paddingTop: 14,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: C.border,
    borderRadius: 1,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: '900', color: C.ink, marginLeft: 10 },
  closeBtn: {
    width: 32,
    height: 32,
    backgroundColor: C.bgLight,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, paddingBottom: 24 },
  item: { width: (SCREEN_WIDTH - 68) / 4, alignItems: 'center', gap: 7 },
  imgWrap: {
    width: 62,
    height: 62,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  img: { width: '100%', height: '100%' },
  checkOverlay: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: C.slate,
    textAlign: 'center',
  },
});