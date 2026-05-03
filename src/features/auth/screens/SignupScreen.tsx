import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  StatusBar,
  ImageBackground,
  Alert,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import Button from '../../../components/button/Button';
import {
  DarkOverlay,
  AuthHeader,
  InputField,
  SectionDivider,
  PasswordStrength,
  COLORS,
} from '../components/AuthForm';
import {
  MapPinIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from '../../auth/components/Icons';

const { width } = Dimensions.get('window');

const GREEN = '#10B981';
const RED = '#EF4444';

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStatePw, setShowStatePw] = useState(false);
  const [showCityPw, setShowCityPw] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignup = async () => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !state ||
      !city ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Missing Fields', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(() => resolve(undefined), 1500));
      navigation.navigate('Home');
    } catch {
      Alert.alert('Error', 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/log.png')}
      style={styles.signup_bgImage}
      resizeMode="cover"
    >
      <DarkOverlay />

      <KeyboardAvoidingView
        style={styles.signup_flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <ScrollView
          style={styles.signup_flex}
          contentContainerStyle={styles.signup_scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthHeader
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            logoScale={logoScale}
            screenWidth={width}
          />

          <Animated.View
            style={[
              styles.signup_card,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.signup_cardTitle}>Create Account</Text>
            <Text style={styles.signup_cardSubtitle}>
              Sign up to start ordering 🍕
            </Text>

            <SectionDivider label="Personal Info" />

            <InputField
              label="Full Name"
              placeholder="Your full name"
              icon="user"
              value={fullName}
              onChangeText={setFullName}
            />
            <InputField
              label="Email Address"
              placeholder="you@example.com"
              icon="email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <InputField
              label="Phone Number"
              placeholder="Phone number"
              icon="phone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <SectionDivider label="Location" />

            <View style={styles.signup_rowFields}>
              <View style={styles.signup_halfField}>
                <Text style={styles.signup_inputLabel}>State</Text>
                <View style={styles.signup_inputContainerHalf}>
                  <MapPinIcon size={16} />
                  <TextInput
                    style={styles.signup_input}
                    placeholder="State"
                    placeholderTextColor="rgba(255,255,255,0.35)"
                    value={state}
                    onChangeText={setState}
                    autoCapitalize="words"
                  />
                </View>
              </View>
              <View style={styles.signup_halfField}>
                <Text style={styles.signup_inputLabel}>City</Text>
                <View style={styles.signup_inputContainerHalf}>
                  <MapPinIcon size={16} />
                  <TextInput
                    style={styles.signup_input}
                    placeholder="City"
                    placeholderTextColor="rgba(255,255,255,0.35)"
                    value={city}
                    onChangeText={setCity}
                    autoCapitalize="words"
                  />
                </View>
              </View>
            </View>

            <SectionDivider label="Security" />

            <InputField
              label="Password"
              placeholder="Min. 6 characters"
              icon="shield"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <PasswordStrength password={password} />

            <InputField
              label="Confirm Password"
              placeholder="Re-enter your password"
              icon="lock"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {confirmPassword.length > 0 && (
              <View style={styles.signup_matchRow}>
                <View
                  style={[
                    styles.signup_matchDot,
                    {
                      backgroundColor:
                        password === confirmPassword ? GREEN : RED,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.signup_matchText,
                    { color: password === confirmPassword ? GREEN : RED },
                  ]}
                >
                  {password === confirmPassword
                    ? 'Passwords match ✓'
                    : 'Passwords do not match'}
                </Text>
              </View>
            )}

            <Text style={styles.signup_termsText}>
              By signing up, you agree to our{' '}
              <Text style={styles.signup_termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.signup_termsLink}>Privacy Policy</Text>
            </Text>

            <Button
              label="Create Account"
              loadingLabel="Creating Account..."
              isLoading={isLoading}
              onPress={handleSignup}
            />

            <View style={styles.signup_loginRow}>
              <Text style={styles.signup_loginText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signup_loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  signup_bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  signup_flex: { flex: 1 },
  signup_scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  signup_card: {
    width: width - 32,
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'rgba(245, 197, 24, 0.57)',
    overflow: 'hidden',
  },
  signup_cardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  signup_cardSubtitle: {
    fontSize: 14,
    color: COLORS.primaryMid,
    marginBottom: 24,
  },
  signup_rowFields: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  signup_halfField: { flex: 1 },
  signup_inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryMid,
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  signup_inputContainerHalf: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: 10,
    height: 52,
    borderColor: 'rgba(255,255,255,0.2)',
    gap: 8,
  },
  signup_input: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  signup_matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -8,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  signup_matchDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 7,
  },
  signup_matchText: {
    fontSize: 12,
    fontWeight: '600',
  },
  signup_termsText: {
    fontSize: 12,
    color: 'rgba(253, 238, 160, 0.55)',
    textAlign: 'center',
    marginBottom: 22,
    marginTop: 6,
    lineHeight: 18,
  },
  signup_termsLink: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  signup_loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  signup_loginText: {
    fontSize: 14,
    color: 'rgba(253, 238, 160, 0.55)',
  },
  signup_loginLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '800',
  },
});

export default SignupScreen;
