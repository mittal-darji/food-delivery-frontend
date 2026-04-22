import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  EmailIcon,
  LockIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  KeyIcon,
  MailCheckIcon,
  RefreshIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  CheckIcon,
} from '../../auth/components/Icons';

const COLORS = {
  primary: '#F5C518',
  primaryLight: '#FEFDDF',
  primaryMid: '#FDEEA0',
  primaryDark: '#C49A00',
  gold: '#FFC81E',
  green: '#10B981',
  red: '#EF4444',
  navy: '#1A1033',
  ink: '#1A1033',
  slate: '#4A5568',
  muted: '#8C96A3',
  border: '#EDF0F4',
  white: '#FFFFFF',
  bgLight: '#FEFDDF',
};

type Step = 'email' | 'otp' | 'newPassword' | 'success';

function StepDots({ step }: { step: Step }) {
  const steps: Step[] = ['email', 'otp', 'newPassword'];
  const stepIndex = steps.indexOf(step);

  const StepIcon = ({ s }: { s: Step }) => {
    switch (s) {
      case 'email':
        return <EmailIcon color={COLORS.navy} size={14} />;
      case 'otp':
        return <MailCheckIcon color={COLORS.navy} size={14} />;
      case 'newPassword':
        return <KeyIcon color={COLORS.navy} size={14} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.forgetpass_stepDots}>
      {steps.map((s, i) => (
        <View key={s} style={styles.forgetpass_stepDotRow}>
          <View
            style={[
              styles.forgetpass_stepDot,
              i <= stepIndex && styles.forgetpass_stepDotActive,
              i < stepIndex && styles.forgetpass_stepDotDone,
            ]}
          >
            {i < stepIndex ? (
              <CheckIcon color={COLORS.navy} size={12} />
            ) : (
              <View style={styles.forgetpass_stepDotIconWrapper}>
                {i === stepIndex ? (
                  <StepIcon s={s} />
                ) : (
                  <Text style={styles.forgetpass_stepDotNum}>{i + 1}</Text>
                )}
              </View>
            )}
          </View>
          {i < steps.length - 1 && (
            <View
              style={[
                styles.forgetpass_stepLine,
                i < stepIndex && styles.forgetpass_stepLineActive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

function OtpInput({
  otp,
  setOtp,
}: {
  otp: string[];
  setOtp: (v: string[]) => void;
}) {
  const ref0 = useRef<TextInput>(null);
  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const ref4 = useRef<TextInput>(null);
  const ref5 = useRef<TextInput>(null);

  const refs = [ref0, ref1, ref2, ref3, ref4, ref5];

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, '').slice(-1);
    setOtp(newOtp);
    if (text && index < 5) refs[index + 1].current?.focus();
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  return (
    <View style={styles.forgetpass_otpRow}>
      {otp.map((digit, i) => (
        <TextInput
          key={i}
          ref={refs[i]}
          value={digit}
          onChangeText={t => handleChange(t, i)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
          keyboardType="number-pad"
          maxLength={1}
          style={[
            styles.forgetpass_otpBox,
            digit.length > 0 && styles.forgetpass_otpBoxFilled,
          ]}
          selectionColor={COLORS.primary}
        />
      ))}
    </View>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.forgetpass_fieldWrapper}>
      <Text style={styles.forgetpass_fieldLabel}>{label}</Text>
      <View
        style={[
          styles.forgetpass_inputRow,
          focused && styles.forgetpass_inputRowFocused,
        ]}
      >
        <LockIcon color={COLORS.primaryDark} size={18} />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={COLORS.muted}
          secureTextEntry={!show}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.forgetpass_inputText}
          selectionColor={COLORS.primary}
        />
        <TouchableOpacity
          onPress={() => setShow(s => !s)}
          style={styles.forgetpass_eyeBtn}
        >
          {show ? (
            <EyeOpenIcon color={COLORS.muted} size={18} />
          ) : (
            <EyeClosedIcon color={COLORS.muted} size={18} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PasswordStrength({ password }: { password: string }) {
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
    <View style={styles.forgetpass_strengthWrapper}>
      <View style={styles.forgetpass_strengthBars}>
        {[1, 2, 3, 4].map(i => (
          <View
            key={i}
            style={[
              styles.forgetpass_strengthBar,
              { backgroundColor: i <= level ? color : COLORS.border },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.forgetpass_strengthLabel, { color }]}>{label}</Text>
    </View>
  );
}

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [loading, setLoading] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 6,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -6,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeTransition = (callback: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      callback();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();
    });
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleSendOtp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      shake();
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      shake();
      return;
    }
    setEmailError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      startResendTimer();
      fadeTransition(() => setStep('otp'));
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otp.some(d => d === '')) {
      setOtpError('Please enter all 6 digits.');
      shake();
      return;
    }
    setOtpError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fadeTransition(() => setStep('newPassword'));
    }, 1200);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    startResendTimer();
  };

  const handleSetPassword = () => {
    if (newPassword.length < 8) {
      setPwError('Password must be at least 8 characters.');
      shake();
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('Passwords do not match.');
      shake();
      return;
    }
    setPwError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fadeTransition(() => setStep('success'));
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <View>
            <Text style={styles.forgetpass_stepTitle}>Forgot Password?</Text>
            <Text style={styles.forgetpass_stepSubtitle}>
              Enter your registered email and we'll send you a 6-digit OTP to
              reset your password.
            </Text>
            <View style={styles.forgetpass_fieldWrapper}>
              <Text style={styles.forgetpass_fieldLabel}>Email Address</Text>
              <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                <View
                  style={[
                    styles.forgetpass_inputRow,
                    emailError ? styles.forgetpass_inputRowError : null,
                  ]}
                >
                  <EmailIcon color={COLORS.primaryDark} size={18} />
                  <TextInput
                    value={email}
                    onChangeText={t => {
                      setEmail(t);
                      setEmailError('');
                    }}
                    placeholder="yourname@email.com"
                    placeholderTextColor={COLORS.muted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.forgetpass_inputText}
                    selectionColor={COLORS.primary}
                  />
                </View>
              </Animated.View>
              {emailError ? (
                <Text style={styles.forgetpass_errorText}>⚠️ {emailError}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={[
                styles.forgetpass_primaryBtn,
                loading && styles.forgetpass_primaryBtnDisabled,
              ]}
              onPress={handleSendOtp}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.navy} />
              ) : (
                <View style={styles.forgetpass_btnInner}>
                  <MailCheckIcon color={COLORS.navy} size={18} />
                  <Text style={styles.forgetpass_primaryBtnText}>Send OTP</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        );

      case 'otp':
        return (
          <View>
            <Text style={styles.forgetpass_stepTitle}>Check Your Email</Text>
            <Text style={styles.forgetpass_stepSubtitle}>
              We sent a 6-digit code to{' '}
              <Text style={styles.forgetpass_emailHighlight}>{email}</Text>.
              {'\n'}
              Enter it below to continue.
            </Text>

            <View style={styles.forgetpass_otpLabelRow}>
              <MailCheckIcon color={COLORS.primaryDark} size={13} />
              <Text style={styles.forgetpass_otpLabel}>
                6-Digit Verification Code
              </Text>
            </View>

            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
              <OtpInput
                otp={otp}
                setOtp={v => {
                  setOtp(v);
                  setOtpError('');
                }}
              />
            </Animated.View>

            <View style={styles.forgetpass_otpProgressRow}>
              {otp.map((d, i) => (
                <View
                  key={i}
                  style={[
                    styles.forgetpass_otpProgressDot,
                    d !== '' && styles.forgetpass_otpProgressDotFilled,
                  ]}
                />
              ))}
              <Text style={styles.forgetpass_otpProgressText}>
                {otp.filter(d => d !== '').length}/6 entered
              </Text>
            </View>

            {otpError ? (
              <Text
                style={[
                  styles.forgetpass_errorText,
                  { textAlign: 'center', marginTop: 4 },
                ]}
              >
                ⚠️ {otpError}
              </Text>
            ) : null}

            <TouchableOpacity
              style={[
                styles.forgetpass_primaryBtn,
                { marginTop: 20 },
                loading && styles.forgetpass_primaryBtnDisabled,
              ]}
              onPress={handleVerifyOtp}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.navy} />
              ) : (
                <View style={styles.forgetpass_btnInner}>
                  <CheckIcon color={COLORS.navy} size={16} />
                  <Text style={styles.forgetpass_primaryBtnText}>
                    Verify OTP
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleResend}
              disabled={resendTimer > 0}
              style={styles.forgetpass_resendRow}
            >
              <RefreshIcon
                color={resendTimer > 0 ? COLORS.muted : COLORS.primaryDark}
                size={14}
              />
              <Text style={styles.forgetpass_resendText}>
                {' '}
                Didn't receive it?{' '}
              </Text>
              <Text
                style={[
                  styles.forgetpass_resendAction,
                  resendTimer > 0 && styles.forgetpass_resendDisabled,
                ]}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => fadeTransition(() => setStep('email'))}
              style={styles.forgetpass_changeEmailBtn}
            >
              <View style={styles.forgetpass_backRow}>
                <ArrowLeftIcon color={COLORS.muted} size={14} />
                <Text style={styles.forgetpass_changeEmailText}>
                  {' '}
                  Change email address
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );

      case 'newPassword':
        return (
          <View>
            <Text style={styles.forgetpass_stepTitle}>Create New Password</Text>
            <Text style={styles.forgetpass_stepSubtitle}>
              Make it strong! Your new password must be at least 8 characters.
            </Text>
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
              <PasswordField
                label="New Password"
                value={newPassword}
                onChange={t => {
                  setNewPassword(t);
                  setPwError('');
                }}
                placeholder="Enter new password"
              />
              <PasswordStrength password={newPassword} />
              <PasswordField
                label="Confirm Password"
                value={confirmPassword}
                onChange={t => {
                  setConfirmPassword(t);
                  setPwError('');
                }}
                placeholder="Re-enter new password"
              />
            </Animated.View>
            {pwError ? (
              <Text style={styles.forgetpass_errorText}>⚠️ {pwError}</Text>
            ) : null}
            <View style={styles.forgetpass_rulesBox}>
              {[
                {
                  rule: 'At least 8 characters',
                  pass: newPassword.length >= 8,
                },
                {
                  rule: 'One uppercase letter (A–Z)',
                  pass: /[A-Z]/.test(newPassword),
                },
                { rule: 'One number (0–9)', pass: /[0-9]/.test(newPassword) },
                {
                  rule: 'One special character (!@#$…)',
                  pass: /[^A-Za-z0-9]/.test(newPassword),
                },
              ].map(({ rule, pass }) => (
                <View key={rule} style={styles.forgetpass_ruleRow}>
                  <View
                    style={[
                      styles.forgetpass_ruleIconBox,
                      pass && styles.forgetpass_ruleIconBoxPass,
                    ]}
                  >
                    {pass ? (
                      <CheckIcon color={COLORS.white} size={8} />
                    ) : (
                      <View style={styles.forgetpass_ruleDot} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.forgetpass_ruleText,
                      pass && styles.forgetpass_ruleTextPass,
                    ]}
                  >
                    {rule}
                  </Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={[
                styles.forgetpass_primaryBtn,
                loading && styles.forgetpass_primaryBtnDisabled,
              ]}
              onPress={handleSetPassword}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.navy} />
              ) : (
                <View style={styles.forgetpass_btnInner}>
                  <LockIcon color={COLORS.navy} size={18} />
                  <Text style={styles.forgetpass_primaryBtnText}>
                    Reset Password
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        );

      case 'success':
        return (
          <View style={styles.forgetpass_successContainer}>
            <View style={styles.forgetpass_successCircle}>
              <CheckCircleIcon color={COLORS.green} size={64} />
            </View>
            <Text style={styles.forgetpass_successTitle}>
              Password Reset!{'\n'}You're all set.
            </Text>
            <Text style={styles.forgetpass_successSub}>
              Your password has been updated successfully.{'\n'}
              You can now log in with your new password.
            </Text>
            <TouchableOpacity
              style={styles.forgetpass_primaryBtn}
              onPress={() => navigation?.navigate('Login')}
              activeOpacity={0.85}
            >
              <View style={styles.forgetpass_btnInner}>
                <Text style={styles.forgetpass_primaryBtnText}>
                  Go to Login
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.forgetpass_safeArea}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      {step !== 'success' && (
        <TouchableOpacity
          style={styles.forgetpass_backBtn}
          onPress={() => {
            if (step === 'email') navigation?.goBack();
            else if (step === 'otp') fadeTransition(() => setStep('email'));
            else if (step === 'newPassword')
              fadeTransition(() => setStep('otp'));
          }}
          activeOpacity={0.75}
        >
          <ArrowLeftIcon color={COLORS.ink} size={20} />
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.forgetpass_scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {step !== 'success' && <StepDots step={step} />}

          <Animated.View
            style={[styles.forgetpass_card, { opacity: fadeAnim }]}
          >
            {renderStep()}
          </Animated.View>

          {step !== 'success' && (
            <TouchableOpacity
              style={styles.forgetpass_loginRow}
              onPress={() => navigation?.navigate('Login')}
            >
              <Text style={styles.forgetpass_loginText}>
                Remember your password?{' '}
              </Text>
              <Text style={styles.forgetpass_loginLink}>Log in</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  forgetpass_safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  forgetpass_backBtn: {
    margin: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.bgLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  forgetpass_scroll: {
    paddingBottom: 40,
  },
  forgetpass_stepDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  forgetpass_stepDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgetpass_stepDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  forgetpass_stepDotActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  forgetpass_stepDotDone: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  forgetpass_stepDotIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgetpass_stepDotNum: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.muted,
  },
  forgetpass_stepLine: {
    width: 44,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  forgetpass_stepLineActive: {
    backgroundColor: COLORS.primary,
  },
  forgetpass_card: {
    backgroundColor: COLORS.white,
    margin: 18,
    borderRadius: 24,
    padding: 22,
    elevation: 6,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  forgetpass_stepTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  forgetpass_stepSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 22,
    marginBottom: 24,
  },
  forgetpass_emailHighlight: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  forgetpass_otpLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  forgetpass_otpLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.slate,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  forgetpass_otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 7,
    marginTop: 4,
  },
  forgetpass_otpBox: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bgLight,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.ink,
  },
  forgetpass_otpBoxFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    color: COLORS.primaryDark,
  },
  forgetpass_otpProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 12,
    marginBottom: 4,
  },
  forgetpass_otpProgressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  forgetpass_otpProgressDotFilled: {
    backgroundColor: COLORS.primary,
  },
  forgetpass_otpProgressText: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '600',
    marginLeft: 6,
  },
  forgetpass_fieldWrapper: {
    marginBottom: 16,
  },
  forgetpass_fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.slate,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  forgetpass_inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgLight,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: 10,
  },
  forgetpass_inputRowFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  forgetpass_inputRowError: {
    borderColor: COLORS.red,
    backgroundColor: '#FEF2F2',
  },
  forgetpass_inputText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.ink,
    fontWeight: '500',
    padding: 0,
  },
  forgetpass_eyeBtn: {
    padding: 4,
  },
  forgetpass_errorText: {
    fontSize: 12,
    color: COLORS.red,
    fontWeight: '600',
    marginTop: 6,
  },
  forgetpass_primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    marginTop: 12,
  },
  forgetpass_primaryBtnDisabled: {
    opacity: 0.7,
  },
  forgetpass_btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  forgetpass_primaryBtnText: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  forgetpass_resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  forgetpass_resendText: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: '500',
  },
  forgetpass_resendAction: {
    fontSize: 13,
    color: COLORS.primaryDark,
    fontWeight: '800',
  },
  forgetpass_resendDisabled: {
    color: COLORS.muted,
  },
  forgetpass_changeEmailBtn: {
    alignItems: 'center',
    marginTop: 10,
  },
  forgetpass_backRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgetpass_changeEmailText: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: '500',
  },
  forgetpass_strengthWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    marginTop: -8,
  },
  forgetpass_strengthBars: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  forgetpass_strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  forgetpass_strengthLabel: {
    fontSize: 11,
    fontWeight: '900',
    minWidth: 56,
    textAlign: 'right',
  },
  forgetpass_rulesBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryMid,
  },
  forgetpass_ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  forgetpass_ruleIconBox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgetpass_ruleIconBoxPass: {
    backgroundColor: COLORS.green,
  },
  forgetpass_ruleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.muted,
  },
  forgetpass_ruleText: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '500',
  },
  forgetpass_ruleTextPass: {
    color: COLORS.green,
    fontWeight: '700',
  },
  forgetpass_successContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  forgetpass_successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    borderWidth: 3,
    borderColor: COLORS.primary,
    elevation: 8,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  forgetpass_successTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.ink,
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.4,
    marginBottom: 12,
  },
  forgetpass_successSub: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  forgetpass_loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 18,
  },
  forgetpass_loginText: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: '500',
  },
  forgetpass_loginLink: {
    fontSize: 13,
    color: COLORS.primaryDark,
    fontWeight: '900',
  },
});
