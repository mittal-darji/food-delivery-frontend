import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Platform,
} from 'react-native';
import {
  EmailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  CheckIcon,
} from '../../auth/components/Icons';

export const COLORS = {
  primary: '#F5C518',
  primaryLight: '#FEFDDF',
  primaryMid: '#FDEEA0',
  primaryDark: '#C49A00',
  gold: '#FFC81E',
  green: '#10B981',
  greenLight: '#D1FAE5',
  red: '#EF4444',
  redLight: '#FEE2E2',
  navy: '#1A1033',
  ink: '#1A1033',
  slate: '#4A5568',
  muted: '#8C96A3',
  border: '#BCCCDC',
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  bgLight: '#FEFDDF',
};

type IconName = 'email' | 'lock' | 'user' | 'phone' | 'map' | 'shield';

export const FieldIcon: React.FC<{ name: IconName }> = ({ name }) => {
  switch (name) {
    case 'email':
      return <EmailIcon />;
    case 'lock':
      return <LockIcon />;
    case 'user':
      return <UserIcon />;
    case 'phone':
      return <PhoneIcon />;
    case 'map':
      return <MapPinIcon />;
    case 'shield':
      return <ShieldIcon />;
    default:
      return <EmailIcon />;
  }
};

export const DarkOverlay: React.FC<{ opacity?: string }> = ({
  opacity = '0.43',
}) => (
  <View
    style={[
      authStyles.darkOverlay,
      { backgroundColor: `rgba(10, 6, 26, ${opacity})` },
    ]}
  />
);

interface FoodBadgeProps {
  image: any;
  style: any;
}

export const FoodBadge: React.FC<FoodBadgeProps> = ({ image, style }) => (
  <View style={[authStyles.foodBadge, style]}>
    <Image source={image} style={authStyles.foodBadgeImage} />
  </View>
);

interface AuthHeaderProps {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  logoScale: Animated.Value;
  screenWidth: number;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  fadeAnim,
  slideAnim,
  logoScale,
  screenWidth,
}) => (
  <View style={authStyles.header}>
    <FoodBadge
      image={require('../../../../assets/pizza.png')}
      style={{ top: 24, right: screenWidth * 0.1 }}
    />
    <FoodBadge
      image={require('../../../../assets/burger.jpg')}
      style={{ top: 80, right: screenWidth * 0.03 }}
    />
    <FoodBadge
      image={require('../../../../assets/noodles.jpg')}
      style={{ top: 24, left: screenWidth * 0.08 }}
    />
    <Animated.View
      style={[authStyles.logoContainer, { transform: [{ scale: logoScale }] }]}
    >
      <View style={authStyles.logoCircle}>
        <Image
          source={require('../../../../assets/logo_food.jpg')}
          style={authStyles.logoImage}
        />
      </View>
    </Animated.View>
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <Text style={authStyles.appName}>QuickBite</Text>
      <Text style={authStyles.tagline}>Delicious food, delivered fast</Text>
    </Animated.View>
  </View>
);

interface InputFieldProps {
  label: string;
  placeholder: string;
  icon: IconName;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  icon,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () =>
    Animated.spring(borderAnim, { toValue: 1, useNativeDriver: false }).start();
  const handleBlur = () =>
    Animated.spring(borderAnim, { toValue: 0, useNativeDriver: false }).start();

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.15)',
      COLORS.primary,
    ],
  });

  const bgColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(245,197,24,0.07)', 'rgba(245,197,24,0.07)'],
  });

  return (
    <View style={authStyles.inputWrapper}>
      <Text style={authStyles.inputLabel}>{label}</Text>
      <Animated.View
        style={[
          authStyles.inputContainer,
          { borderColor, backgroundColor: bgColor },
        ]}
      >
        <View style={authStyles.inputIconWrapper}>
          <FieldIcon name={icon} />
        </View>
        <TextInput
          style={authStyles.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.3)"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType || 'default'}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={authStyles.eyeBtn}
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </TouchableOpacity>
        )}
      </Animated.View>
      {error ? <Text style={authStyles.errorText}>{error}</Text> : null}
    </View>
  );
};

export const SectionDivider: React.FC<{ label: string }> = ({ label }) => (
  <View style={authStyles.sectionHeader}>
    <View style={authStyles.sectionLine} />
    <Text style={authStyles.sectionLabel}>{label}</Text>
    <View style={authStyles.sectionLine} />
  </View>
);

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
}

export const CheckboxRow: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
}) => (
  <TouchableOpacity
    style={authStyles.rememberRow}
    onPress={onToggle}
    activeOpacity={0.8}
  >
    <View style={[authStyles.checkbox, checked && authStyles.checkboxActive]}>
      {checked && <CheckIcon />}
    </View>
    <Text style={authStyles.rememberText}>{label}</Text>
  </TouchableOpacity>
);

export const PasswordStrength: React.FC<{ password: string }> = ({
  password,
}) => {
  const getStrength = () => {
    if (!password) return { level: 0, label: '', color: COLORS.border };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { level: 1, label: 'Weak', color: COLORS.red };
    if (score === 2) return { level: 2, label: 'Fair', color: COLORS.gold };
    if (score === 3) return { level: 3, label: 'Good', color: COLORS.green };
    return { level: 4, label: 'Strong', color: COLORS.green };
  };

  const { level, label, color } = getStrength();
  if (!password) return null;

  return (
    <View style={authStyles.strengthWrapper}>
      <View style={authStyles.strengthBars}>
        {[1, 2, 3, 4].map(i => (
          <View
            key={i}
            style={[
              authStyles.strengthBar,
              { backgroundColor: i <= level ? color : 'rgba(255,255,255,0.1)' },
            ]}
          />
        ))}
      </View>
      <Text style={[authStyles.strengthLabel, { color }]}>{label}</Text>
    </View>
  );
};

export const authStyles = StyleSheet.create({
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 72,
    paddingBottom: 52,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: -24,
    overflow: 'visible',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(245, 197, 24, 0.57)',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 18,
    elevation: 12,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 1.5,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 13,
    color: COLORS.primaryMid,
    marginTop: 6,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  foodBadge: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  foodBadgeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  inputWrapper: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryMid,
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIconWrapper: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.white,
    fontWeight: '500',
  },
  eyeBtn: { padding: 6 },
  errorText: {
    fontSize: 12,
    color: COLORS.red,
    marginTop: 5,
    fontWeight: '500',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 6,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(245, 197, 24, 0.30)',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gold,
    marginHorizontal: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  rememberText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
  },

  strengthWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    marginTop: -8,
  },
  strengthBars: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 11,
    fontWeight: '800',
    minWidth: 48,
    textAlign: 'right',
  },
});
