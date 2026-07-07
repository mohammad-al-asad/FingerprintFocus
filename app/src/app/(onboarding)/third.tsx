import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Rect, Defs, RadialGradient, Stop } from "react-native-svg";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

export default function OnboardingThird() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Form states
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  // Input Focus States
  const [focusedField, setFocusedField] = React.useState<string | null>(null);

  // Breathing animation values for the background glow
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.4);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 5000 }),
        withTiming(1, { duration: 5000 })
      ),
      -1,
      true
    );

    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 5000 }),
        withTiming(0.3, { duration: 5000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: glowOpacity.value,
    };
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient colors={["#0C0C0E", "#030303"]} style={styles.gradientContainer}>
        {/* Background Animated SVG Glow Orb (Amber/Orange) */}
        <Animated.View style={[styles.backgroundGlow, animatedGlowStyle]}>
          <Svg height="100%" width="100%" viewBox="0 0 400 400">
            <Defs>
              <RadialGradient
                id="glowGrad"
                cx="200"
                cy="200"
                rx="200"
                ry="200"
                fx="200"
                fy="200"
                gradientUnits="userSpaceOnUse"
              >
                <Stop offset="0%" stopColor="#FF9F0A" stopOpacity="0.10" />
                <Stop offset="60%" stopColor="#FF9F0A" stopOpacity="0.02" />
                <Stop offset="100%" stopColor="#FF9F0A" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="400" height="400" fill="url(#glowGrad)" />
          </Svg>
        </Animated.View>

        <Header showBorder={false} transparent={true} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.body}>
            {/* Title and Subtitle */}
            <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.textContainer}>
              <Text style={styles.title}>Start your free privacy scan</Text>
              <Text style={styles.subtitle}>
                See what's exposed. Enter your details to build your digital fingerprint report.
              </Text>
            </Animated.View>

            {/* Form Fields Section */}
            <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.formContainer}>
              {/* Full Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>FULL NAME</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "name" ? styles.inputFocused : styles.inputUnfocused,
                  ]}
                  placeholder="John Doe"
                  placeholderTextColor="#4E4E52"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="words"
                  keyboardAppearance="dark"
                />
              </View>

              {/* Email Address */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "email" ? styles.inputFocused : styles.inputUnfocused,
                  ]}
                  placeholder="john@example.com"
                  placeholderTextColor="#4E4E52"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                  keyboardAppearance="dark"
                />
              </View>

              {/* Phone Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>PHONE NUMBER</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "phone" ? styles.inputFocused : styles.inputUnfocused,
                  ]}
                  placeholder="+1 (000) 000-0000"
                  placeholderTextColor="#4E4E52"
                  value={phone}
                  onChangeText={setPhone}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="phone-pad"
                  keyboardAppearance="dark"
                />
              </View>
            </Animated.View>

            {/* Consent Text */}
            <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.consentContainer}>
              <Text style={styles.consentText}>
                Your information is used only for scan results. By continuing, you accept our{" "}
                <Text style={styles.linkUnderline}>Terms</Text> and{" "}
                <Text style={styles.linkUnderline}>Privacy Policy</Text>.
              </Text>
            </Animated.View>

            {/* Bottom Button Section */}
            <Animated.View entering={FadeInDown.delay(700).duration(600)} style={styles.footer}>
              {/* Primary Button */}
              <Button
                title="Start Free Scan"
                onPress={() => router.push("/(freeScan)" as any)}
                style={styles.scanButton}
              />
            </Animated.View>
          </View>
        </ScrollView>

        {/* Trust Badges Bar at the Bottom */}
        <Animated.View
          entering={FadeInDown.delay(900).duration(600)}
          style={[styles.trustBar, { paddingBottom: insets.bottom + 8 }]}
        >
          <View style={styles.trustItem}>
            <Feather name="check-circle" size={18} color="#30D158" />
            <Text style={styles.trustText}>Real Results</Text>
          </View>

          <View style={styles.trustDivider} />

          <View style={styles.trustItem}>
            <Feather name="alert-triangle" size={18} color="#FF9F0A" />
            <Text style={styles.trustText}>Clear Risks</Text>
          </View>

          <View style={styles.trustDivider} />

          <View style={styles.trustItem}>
            <Feather name="zap" size={18} color="#FFFFFF" />
            <Text style={styles.trustText}>Next Steps</Text>
          </View>
        </Animated.View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  gradientContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  body: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  backgroundGlow: {
    position: "absolute",
    top: "22%",
    alignSelf: "center",
    width: 400,
    height: 400,
    zIndex: 0,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#A0A0A5",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "System",
    paddingHorizontal: 16,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 20,
    zIndex: 2,
  },
  inputGroup: {
    marginBottom: 18,
    width: "100%",
  },
  label: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: "System",
    letterSpacing: 1,
  },
  input: {
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 18,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "System",
    borderWidth: 1,
    backgroundColor: "rgba(22, 22, 26, 0.55)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  inputUnfocused: {
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  inputFocused: {
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  consentContainer: {
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 16,
    zIndex: 2,
  },
  consentText: {
    color: "#8E8E93",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "System",
  },
  linkUnderline: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 2,
  },
  scanButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 56,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  // Trust Bar Styles
  trustBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#070708",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "100%",
  },
  trustItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  trustText: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 6,
    textAlign: "center",
    fontFamily: "System",
    letterSpacing: 0.2,
  },
  trustDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
});
