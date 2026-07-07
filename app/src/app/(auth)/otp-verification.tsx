import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

export default function CheckEmailScreen() {
  const router = useRouter();

  const handleResend = () => {
    console.log("Resend link triggered");
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.content}>
          
          {/* Visual: Fingerprint and Green Checkmark Circle Overlay */}
          <View style={styles.visualContainer}>
            <Image
              source={require("@/assets/images/app/fingerprint.png")}
              style={styles.fingerprintBg}
            />
            <View style={styles.checkCircle}>
              <Feather name="check" size={50} color="#30D158" />
            </View>
          </View>

          {/* Heading and Description */}
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            We sent a secure password reset link to your email address.
          </Text>

          {/* Transmission status capsule badge */}
          <View style={styles.statusBadge}>
            <Feather name="shield" size={16} color="#30D158" style={{ marginRight: 8 }} />
            <Text style={styles.statusText}>ENCRYPTED TRANSMISSION ACTIVE</Text>
          </View>

          {/* Primary Action Button */}
          <Button
            title="Back to Sign In"
            onPress={() => router.push("/signin")}
          />

          {/* Resend Link footer */}
          <View style={styles.footerLinkContainer}>
            <Text style={styles.footerText}>Didn't receive an email? </Text>
            <TouchableOpacity activeOpacity={0.6} onPress={handleResend}>
              <Text style={styles.footerLink}>Resend link</Text>
            </TouchableOpacity>
          </View>

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
    justifyContent: "center",
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  visualContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },
  // Background fingerprint shapes
  fingerprintBg: {
    position: "absolute",
    width: 250,
    height: 250,
    opacity: 0.05,
    resizeMode: "contain",
    top:50
  },
  // Center green check circle
  checkCircle: {
    width: 125,
    height: 125,
    borderRadius: 200,
    backgroundColor: "rgba(48, 209, 88, 0.15)",
    borderWidth: 1.5,
    borderColor: "#30D158",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 15,
    color: "#A0A0A5",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
    marginBottom: 36,
    fontFamily: "System",
  },
  // Encrypted transmission status capsule
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 44,
  },
  statusText: {
    color: "#30D158",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 56,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  actionButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
  footerLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#8E8E93",
    fontSize: 14,
    fontFamily: "System",
  },
  footerLink: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
    fontFamily: "System",
  },
});
