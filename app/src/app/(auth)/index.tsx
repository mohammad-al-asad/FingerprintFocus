import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Rect, Defs, RadialGradient, Stop } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function AuthIndexScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();


  return (
    <LinearGradient colors={["#0C0C0E", "#030303"]} style={styles.container}>
      {/* Subtle white/grey radial glow orb */}
      <View style={styles.backgroundGlow}>
        <Svg height="100%" width="100%" viewBox="0 0 400 400">
          <Defs>
            <RadialGradient
              id="authGlow"
              cx="200"
              cy="200"
              rx="200"
              ry="200"
              fx="200"
              fy="200"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.04" />
              <Stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.01" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="400" height="400" fill="url(#authGlow)" />
        </Svg>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 30, paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          {/* Logo Centerpiece */}
          <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/app/splashHorizontal.png")}
              style={styles.logoImage}
              contentFit="contain"
            />
          </Animated.View>

          {/* Title and Subtitle */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.textContainer}>
            <Text style={styles.title}>Clean up your exposed data</Text>
            <Text style={styles.subtitle}>
              Sign up to unlock your full report, track removals, and monitor your digital identity from your private dashboard.
            </Text>
          </Animated.View>

          {/* Buttons Card Container */}
          <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.card}>
            {/* Apple Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/signup" as any)}
              style={styles.appleButton}
            >
              <FontAwesome name="apple" size={20} color="#000000" style={styles.buttonIcon} />
              <Text style={styles.appleButtonText}>Continue with Apple</Text>
            </TouchableOpacity>

            {/* Google Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/signup" as any)}
              style={styles.socialButton}
            >
              <FontAwesome name="google" size={18} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Email Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/signup" as any)}
              style={styles.socialButton}
            >
              <Feather name="mail" size={18} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.socialButtonText}>Continue with Email</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Secure saving disclaimer */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>
              Your scan results will be saved securely{"\n"}to your private account.
            </Text>
          </Animated.View>

          {/* Already have an account link */}
          <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.signinContainer}>
            <Text style={styles.signinText}>
              Already have an account?{" "}
              <Text
                style={styles.signinLink}
                onPress={() => router.push("/signin" as any)}
              >
                Sign in
              </Text>
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    flexGrow: 1,
  },
  body: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  backgroundGlow: {
    position: "absolute",
    top: "10%",
    alignSelf: "center",
    width: 400,
    height: 400,
    zIndex: 0,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(28, 28, 30, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
    height: 80,
    zIndex: 2,
  },
  logoImage: {
    width: 280,
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 24,
    width: "100%",
    zIndex: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 12,
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "System",
    paddingHorizontal: 12,
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(22, 22, 26, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    marginTop: 28,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 54,
    width: "100%",
    marginBottom: 12,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appleButtonText: {
    color: "#000000",
    fontSize: 15.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 28,
    height: 54,
    width: "100%",
    marginBottom: 12,
  },
  socialButtonText: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  buttonIcon: {
    marginRight: 12,
  },
  disclaimerContainer: {
    marginTop: 24,
    marginBottom: 20,
    width: "100%",
    zIndex: 2,
  },
  disclaimerText: {
    color: "#48484A",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 16,
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  signinContainer: {
    width: "100%",
    alignItems: "center",
    zIndex: 2,
  },
  signinText: {
    color: "#8E8E93",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "System",
  },
  signinLink: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
