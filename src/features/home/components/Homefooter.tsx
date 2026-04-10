import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const C = {
  primary: '#F5C518',
  navy: '#1A1033',
  white: '#FFFFFF',
};

const LINKS = [
  'About Us',
  'Careers',
  'Partner with Us',
  'Help Centre',
  'Privacy Policy',
  'Terms',
];

export default function HomeFooter() {
  return (
    <View style={S.footer}>
      <View style={[S.row, { gap: 12, marginBottom: 16 }]}>
        <View style={S.brand}>
          <Text style={{ fontSize: 20 }}>🍴</Text>
        </View>
        <View>
          <Text style={S.brandName}>ForkDash</Text>
          <Text style={S.tagline}>Delivered with love 💛</Text>
        </View>
      </View>
      <View style={S.links}>
        {LINKS.map(l => (
          <Text key={l} style={S.link}>
            {l}
          </Text>
        ))}
      </View>
      <View style={[S.row, { gap: 10, marginBottom: 16 }]}>
        {['🍎 App Store', '🤖 Google Play'].map(b => (
          <TouchableOpacity key={b} style={S.appBadge}>
            <Text style={S.appBadgeText}>{b}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={S.copyright}>© 2026 ForkDash Ltd. All rights reserved.</Text>
    </View>
  );
}

const S = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  footer: {
    backgroundColor: C.navy,
    paddingHorizontal: 16,
    paddingVertical: 26,
    borderTopWidth: 4,
    borderTopColor: C.primary,
  },
  brand: {
    width: 44,
    height: 44,
    backgroundColor: C.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    color: C.white,
    letterSpacing: -0.3,
  },
  tagline: { fontSize: 10, color: '#475569', fontWeight: '600' },
  links: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  link: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    width: '45%',
    marginBottom: 3,
  },
  appBadge: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  appBadgeText: { fontSize: 11, color: '#94A3B8', fontWeight: '700' },
  copyright: { fontSize: 9, color: '#334155', fontWeight: '600' },
});
