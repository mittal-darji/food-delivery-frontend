// import React, { useRef, useEffect } from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Animated,
//   Dimensions,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useAppSelector } from '../profile/store';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const SIDEBAR_WIDTH = Math.min(SCREEN_WIDTH * 0.72, 280);

// const COLORS = {
//   primary: '#fac60b',
//   primaryDark: '#c49900',
//   navy: '#170b35',
//   navyLight: '#190b45',
//   ink: '#11072b',
//   red: '#EF4444',
//   redLight: '#FEE2E2',
//   border: '#EDF0F4',
//   white: '#FFFFFF',
//   muted: '#94A3B8',
// };

// const MENU_ITEMS = [
//   {
//     iconLib: 'ionicon',
//     icon: 'person',
//     label: 'Profile',
//     color: '#f9c60b',
//     route: 'Profile',
//   },
//   {
//     iconLib: 'ionicon',
//     icon: 'heart',
//     label: 'Collection',
//     color: '#EC4899',
//     route: 'Collection',
//   },
//   {
//     iconLib: 'ionicon',
//     icon: 'cart',
//     label: 'Cart',
//     color: '#8B5CF6',
//     route: 'Cart',
//   },
//   {
//     iconLib: 'ionicon',
//     icon: 'receipt',
//     label: 'Orders',
//     color: '#3B82F6',
//     route: 'Orders',
//   },
//   {
//     iconLib: 'material',
//     icon: 'message-reply-text',
//     label: 'Feedback',
//     color: '#10B981',
//     route: 'Feedback',
//   },
//   {
//     iconLib: 'ionicon',
//     icon: 'call',
//     label: 'Contact Us',
//     color: '#F5C518',
//     route: 'ContactUs',
//   },
// ];

// function getInitials(name: string): string {
//   const parts = name.trim().split(' ').filter(Boolean);
//   if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
//   return parts[0]?.[0]?.toUpperCase() ?? '?';
// }

// interface Props {
//   visible: boolean;
//   onClose: () => void;
//   onLogout?: () => void;
// }

// export default function LeftDrawer({ visible, onClose, onLogout }: Props) {
//   const navigation = useNavigation<NativeStackNavigationProp<any>>();
//   const profile = useAppSelector((state: any) => state.profile);

//   const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

//   useEffect(() => {
//     if (visible) {
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//         damping: 20,
//         stiffness: 200,
//       }).start();
//     } else {
//       Animated.timing(slideAnim, {
//         toValue: -SIDEBAR_WIDTH,
//         duration: 220,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [visible]);

//   const handleNavigate = (route: string) => {
//     onClose();
//     navigation.navigate(route);
//   };

//   const handleLogout = () => {
//     onClose();
//     if (onLogout) {
//       onLogout();
//     } else {
//       navigation.navigate('Login');
//     }
//   };

//   return (
//     <Modal
//       transparent
//       visible={visible}
//       animationType="none"
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <TouchableWithoutFeedback onPress={onClose}>
//           <View style={styles.backdrop} />
//         </TouchableWithoutFeedback>

//         <Animated.View
//           style={[styles.panel, { transform: [{ translateX: slideAnim }] }]}
//         >
//           {/* Header */}
//           <View style={styles.header}>
//             {/* Brand row */}
//             <TouchableOpacity
//               style={styles.brandRow}
//               activeOpacity={0.7}
//               onPress={() => handleNavigate('Home')}
//             >
//               <View style={styles.brandIconWrap}>
//                 <Icon name="fast-food" size={22} color={COLORS.navy} />
//               </View>
//               <View>
//                 <Text style={styles.brandName}>ForkDash</Text>
//                 <Text style={styles.brandSub}>Delivered with love 💛</Text>
//               </View>
//             </TouchableOpacity>

//             {/* User card — live from Redux */}
//             <TouchableOpacity
//               style={styles.userCard}
//               activeOpacity={0.7}
//               onPress={() => handleNavigate('Profile')}
//             >
//               {/* Avatar: real photo OR initials fallback */}
//               {profile.avatar ? (
//                 <Image
//                   source={{ uri: profile.avatar }}
//                   style={styles.avatarImage}
//                 />
//               ) : (
//                 <View style={styles.avatarCircle}>
//                   <Text style={styles.avatarInitials}>
//                     {getInitials(profile.name ?? 'U')}
//                   </Text>
//                 </View>
//               )}

//               <View style={styles.userInfo}>
//                 <Text style={styles.userName} numberOfLines={1}>
//                   {profile.name}
//                 </Text>
//                 <Text style={styles.userEmail} numberOfLines={1}>
//                   {profile.email}
//                 </Text>
//               </View>

//               {profile.isPro && (
//                 <View style={styles.proBadge}>
//                   <Text style={styles.proBadgeText}>PRO</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           </View>

//           {/* Menu */}
//           <View style={styles.menuSection}>
//             <Text style={styles.sectionLabel}>MENU</Text>
//             {MENU_ITEMS.map(item => (
//               <TouchableOpacity
//                 key={item.label}
//                 style={styles.menuItem}
//                 activeOpacity={0.7}
//                 onPress={() => handleNavigate(item.route)}
//               >
//                 <View
//                   style={[
//                     styles.itemIconWrap,
//                     { backgroundColor: item.color + '18' },
//                   ]}
//                 >
//                   {item.iconLib === 'ionicon' ? (
//                     <Icon name={item.icon} size={18} color={item.color} />
//                   ) : (
//                     <MaterialIcon
//                       name={item.icon}
//                       size={18}
//                       color={item.color}
//                     />
//                   )}
//                 </View>
//                 <Text style={styles.itemLabel}>{item.label}</Text>
//                 <Icon name="chevron-forward" size={16} color="#CBD5E1" />
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Footer */}
//           <View style={styles.footer}>
//             <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//               <Icon name="log-out-outline" size={18} color={COLORS.red} />
//               <Text style={styles.logoutText}>Log Out</Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: { flex: 1, flexDirection: 'row' },
//   backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
//   panel: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     bottom: 0,
//     width: SIDEBAR_WIDTH,
//     backgroundColor: COLORS.white,
//     elevation: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 6, height: 0 },
//     shadowOpacity: 0.15,
//     shadowRadius: 20,
//   },

//   // Header
//   header: {
//     backgroundColor: '#ffffff7f',
//     padding: 20,
//     paddingTop: 52,
//   },
//   brandRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 18,
//   },
//   brandIconWrap: {
//     width: 42,
//     height: 42,
//     borderRadius: 12,
//     backgroundColor: COLORS.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   brandName: {
//     fontSize: 20,
//     fontWeight: '900',
//     color: COLORS.ink,
//     letterSpacing: -0.5,
//   },
//   brandSub: {
//     fontSize: 10,
//     color: '#64748B',
//     fontWeight: '600',
//   },

//   // User card
//   userCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 251, 124, 0.1)',
//     borderRadius: 14,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(185, 169, 110, 0.18)',
//   },
//   avatarImage: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//   },
//   avatarCircle: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: 'rgba(245,197,24,0.18)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: COLORS.primary + '55',
//   },
//   avatarInitials: {
//     fontSize: 16,
//     fontWeight: '800',
//     color: COLORS.primaryDark,
//   },
//   userInfo: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   userName: {
//     fontSize: 14,
//     fontWeight: '800',
//     color: COLORS.ink,
//   },
//   userEmail: {
//     fontSize: 10,
//     color: '#94A3B8',
//     fontWeight: '500',
//     marginTop: 1,
//   },
//   proBadge: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 6,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//   },
//   proBadgeText: {
//     fontSize: 9,
//     fontWeight: '900',
//     color: COLORS.ink,
//     letterSpacing: 1,
//   },

//   // Menu
//   menuSection: {
//     paddingHorizontal: 16,
//     paddingTop: 18,
//   },
//   sectionLabel: {
//     fontSize: 9,
//     color: COLORS.muted,
//     fontWeight: '800',
//     letterSpacing: 1.5,
//     marginBottom: 10,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 4,
//     borderRadius: 10,
//     marginBottom: 2,
//   },
//   itemIconWrap: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   itemLabel: {
//     flex: 1,
//     fontSize: 14,
//     fontWeight: '700',
//     color: COLORS.ink,
//   },

//   // Footer
//   footer: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.border,
//     marginTop: 'auto',
//   },
//   logoutBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     backgroundColor: COLORS.redLight,
//     borderRadius: 12,
//   },
//   logoutText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: COLORS.red,
//   },
// });

import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '../profile/store'; // adjust path if needed

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = Math.min(SCREEN_WIDTH * 0.72, 280);

const COLORS = {
  primary: '#fac60b',
  primaryDark: '#c49900',
  navy: '#170b35',
  navyLight: '#190b45',
  ink: '#11072b',
  red: '#EF4444',
  redLight: '#FEE2E2',
  border: '#EDF0F4',
  white: '#FFFFFF',
  muted: '#94A3B8',
};

const MENU_ITEMS = [
  {
    iconLib: 'ionicon',
    icon: 'person',
    label: 'Profile',
    color: '#f9c60b',
    route: 'Profile',
  },
  {
    iconLib: 'ionicon',
    icon: 'heart',
    label: 'Collection',
    color: '#EC4899',
    route: 'Collection',
  },
  {
    iconLib: 'ionicon',
    icon: 'cart',
    label: 'Cart',
    color: '#8B5CF6',
    route: 'Cart',
  },
  {
    iconLib: 'ionicon',
    icon: 'receipt',
    label: 'Orders',
    color: '#3B82F6',
    route: 'Orders',
  },
  {
    iconLib: 'material',
    icon: 'message-reply-text',
    label: 'Feedback',
    color: '#10B981',
    route: 'Feedback',
  },
  {
    iconLib: 'ionicon',
    icon: 'call',
    label: 'Contact Us',
    color: '#F5C518',
    route: 'ContactUs',
  },
];

function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0]?.[0]?.toUpperCase() ?? '?';
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export default function LeftDrawer({ visible, onClose, onLogout }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const profile = useAppSelector((state: any) => state.profile);

  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SIDEBAR_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleNavigate = (route: string) => {
    onClose();
    navigation.navigate(route);
  };

  const handleLogout = () => {
    onClose();
    if (onLogout) {
      onLogout();
    } else {
      navigation.navigate('Login');
    }
  };

  // ── Reusable avatar: used in both user card and Profile menu row ──────────
  const AvatarSmall = ({ size }: { size: number }) => {
    const radius = size / 2;
    return profile.avatar ? (
      <Image
        source={{ uri: profile.avatar }}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          borderWidth: 2,
          borderColor: COLORS.primary,
        }}
      />
    ) : (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: 'rgba(245,197,24,0.18)',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: COLORS.primary + '55',
        }}
      >
        <Text
          style={{
            fontSize: size * 0.35,
            fontWeight: '800',
            color: COLORS.primaryDark,
          }}
        >
          {getInitials(profile.name ?? 'U')}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.panel, { transform: [{ translateX: slideAnim }] }]}
        >
          {/* ── Header ── */}
          <View style={styles.header}>
            {/* Brand row */}
            <TouchableOpacity
              style={styles.brandRow}
              activeOpacity={0.7}
              onPress={() => handleNavigate('Home')}
            >
              <View style={styles.brandIconWrap}>
                <Icon name="fast-food" size={22} color={COLORS.navy} />
              </View>
              <View>
                <Text style={styles.brandName}>ForkDash</Text>
                <Text style={styles.brandSub}>Delivered with love 💛</Text>
              </View>
            </TouchableOpacity>

            {/* User card */}
            <TouchableOpacity
              style={styles.userCard}
              activeOpacity={0.7}
              onPress={() => handleNavigate('Profile')}
            >
              {/* Large avatar (44px) in the user card */}
              <AvatarSmall size={44} />

              <View style={styles.userInfo}>
                <Text style={styles.userName} numberOfLines={1}>
                  {profile.name}
                </Text>
                <Text style={styles.userEmail} numberOfLines={1}>
                  {profile.email}
                </Text>
              </View>

              {profile.isPro && (
                <View style={styles.proBadge}>
                  <Text style={styles.proBadgeText}>PRO</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* ── Menu ── */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionLabel}>MENU</Text>
            {MENU_ITEMS.map(item => {
              const isProfileItem = item.label === 'Profile';

              return (
                <TouchableOpacity
                  key={item.label}
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={() => handleNavigate(item.route)}
                >
                  {/* Profile row: show real avatar instead of generic icon */}
                  {isProfileItem ? (
                    <View style={styles.menuProfileAvatarWrap}>
                      <AvatarSmall size={36} />
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.itemIconWrap,
                        { backgroundColor: item.color + '18' },
                      ]}
                    >
                      {item.iconLib === 'ionicon' ? (
                        <Icon name={item.icon} size={18} color={item.color} />
                      ) : (
                        <MaterialIcon
                          name={item.icon}
                          size={18}
                          color={item.color}
                        />
                      )}
                    </View>
                  )}

                  <Text style={styles.itemLabel}>{item.label}</Text>
                  <Icon name="chevron-forward" size={16} color="#CBD5E1" />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Icon name="log-out-outline" size={18} color={COLORS.red} />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  panel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: COLORS.white,
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },

  // Header
  header: {
    backgroundColor: '#ffffff7f',
    padding: 20,
    paddingTop: 52,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  brandIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.5,
  },
  brandSub: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },

  // User card
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 251, 124, 0.1)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(185, 169, 110, 0.18)',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.ink,
  },
  userEmail: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 1,
  },
  proBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  proBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: 1,
  },

  // Menu
  menuSection: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  sectionLabel: {
    fontSize: 9,
    color: COLORS.muted,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    marginBottom: 2,
  },
  itemIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // wrapper keeps the 36px avatar perfectly aligned with other icon wraps
  menuProfileAvatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },

  // Footer
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 'auto',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.redLight,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.red,
  },
});
