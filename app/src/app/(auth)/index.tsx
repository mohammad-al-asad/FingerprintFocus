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

const { width } = Dimensions.get("window");

export default function AuthIndexScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Fingerprint Circular Badge centerpiece */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.badgeContainer}>
          <View style={styles.badgeCircle}>
            <Image
              source={require("@/assets/images/app/fingerprint.png")}
              style={styles.fingerprintIcon}
              contentFit="contain"
            />
          </View>
        </Animated.View>

        {/* Title and Subtitle */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.textContainer}>
          <Text style={styles.title}>See the full picture.{"\n"}Start cleaning it up.</Text>
          <Text style={styles.subtitle}>
            Create your account to unlock your full report, track remove requests, and monitor new exposure from your private dashboard.
          </Text>
        </Animated.View>

        {/* Buttons Card Container */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.card}>
          {/* Apple Button */}
          <TouchableOpacity
            activeOpacity={0.8}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  badgeCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "rgba(28, 28, 30, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  fingerprintIcon: {
    width: 44,
    height: 44,
    tintColor: "#FFFFFF",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 12,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "System",
    paddingHorizontal: 8,
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(28, 28, 30, 0.35)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginTop: 30,
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 27,
    height: 54,
    width: "100%",
    marginBottom: 12,
  },
  appleButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 27,
    height: 54,
    width: "100%",
    marginBottom: 12,
  },
  socialButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
  buttonIcon: {
    marginRight: 10,
  },
  disclaimerContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
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
