import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  ImageBackground,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  DishIcon,
  StarIcon,
  ClockIcon,
  ArrowRightIcon,
} from '../../auth/components/Icons';

const { width, height } = Dimensions.get('window');

const PRIMARY = '#F5C518';
const GOLD = '#FFC81E';
const NAVY = '#1A1033';

const GetStartedScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const chefScale = useRef(new Animated.Value(0.8)).current;
  const chefSlide = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.spring(chefScale, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.spring(chefSlide, {
        toValue: 0,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => navigation.navigate('Login');

  return (
    <ImageBackground
      source={require('../../../../assets/getstartbg.jpg')}
      style={styles.getstart_bgImage}
      blurRadius={14}
      resizeMode="cover"
    >
      <View style={styles.getstart_overlay} />
      <View style={styles.getstart_tintTop} />

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View
        style={[
          styles.getstart_headlineContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.getstart_tagline}>WELCOME TO</Text>
        <Text style={styles.getstart_headline}>Food for{'\n'}Everyone</Text>
        <Text style={styles.getstart_subline}>
          Fresh ingredients. Real flavours.{'\n'}Delivered to your door.
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.getstart_heroImageWrapper,
          {
            opacity: fadeAnim,
            transform: [{ scale: chefScale }, { translateY: chefSlide }],
          },
        ]}
      >
        <Image
          source={require('../../../../assets/chef_plate.jpg')}
          style={styles.getstart_heroImage}
          resizeMode="cover"
        />
      </Animated.View>

      <Animated.View style={[styles.getstart_badgeRow, { opacity: fadeAnim }]}>
        <View style={styles.getstart_badge}>
          <DishIcon />
          <Text style={styles.getstart_badgeNumber}>500+</Text>
          <Text style={styles.getstart_badgeLabel}>Dishes</Text>
        </View>
        <View style={styles.getstart_badgeDivider} />
        <View style={styles.getstart_badge}>
          <StarIcon />
          <Text style={styles.getstart_badgeNumber}>4.9</Text>
          <Text style={styles.getstart_badgeLabel}>Rating</Text>
        </View>
        <View style={styles.getstart_badgeDivider} />
        <View style={styles.getstart_badge}>
          <ClockIcon />
          <Text style={styles.getstart_badgeNumber}>30 min</Text>
          <Text style={styles.getstart_badgeLabel}>Delivery</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.getstart_btnWrapper,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <TouchableOpacity
          style={styles.getstart_ctaButton}
          onPress={handleGetStarted}
          activeOpacity={0.85}
        >
          <Text style={styles.getstart_ctaLabel}>Get Started</Text>
          <ArrowRightIcon color={NAVY} size={20} />
        </TouchableOpacity>

        <Text style={styles.getstart_bottomNote}>
          Already have an account?{' '}
          <Text
            style={styles.getstart_bottomNoteLink}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </Text>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  getstart_bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  getstart_overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(12, 4, 4, 0.72)',
    zIndex: 0,
  },
  getstart_tintTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.35,
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    zIndex: 1,
  },
  getstart_headlineContainer: {
    position: 'absolute',
    top: height * 0.1,
    left: 28,
    right: 28,
    zIndex: 10,
  },
  getstart_tagline: {
    fontSize: 16,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 3,
    marginBottom: 8,
  },
  getstart_headline: {
    fontSize: 52,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 56,
    letterSpacing: -1,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  getstart_subline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.58)',
    marginTop: 12,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  getstart_heroImageWrapper: {
    position: 'absolute',
    bottom: height * 0.2,
    left: 0,
    right: 0,
    height: height * 0.44,
    zIndex: 5,
    overflow: 'hidden',
  },
  getstart_heroImage: {
    width: '100%',
    height: '100%',
  },
  getstart_badgeRow: {
    position: 'absolute',
    bottom: height * 0.185,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245,197,24,0.09)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.25)',
    paddingVertical: 12,
    zIndex: 10,
  },
  getstart_badge: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  getstart_badgeNumber: {
    fontSize: 15,
    fontWeight: '800',
    color: PRIMARY,
  },
  getstart_badgeLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.3,
  },
  getstart_badgeDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(245,197,24,0.2)',
  },
  getstart_btnWrapper: {
    position: 'absolute',
    bottom: 36,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  getstart_ctaButton: {
    backgroundColor: PRIMARY,
    borderRadius: 18,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  getstart_ctaLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: NAVY,
    letterSpacing: 0.2,
  },
  getstart_bottomNote: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
  },
  getstart_bottomNoteLink: {
    color: GOLD,
    fontWeight: '700',
  },
});

export default GetStartedScreen;
