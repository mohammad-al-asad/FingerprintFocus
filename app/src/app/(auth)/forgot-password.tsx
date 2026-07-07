import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSendReset = () => {
    console.log("Send reset link to:", email);
    // On success, go to the otp-verification screen
    router.push("/otp-verification" as any);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.content}>
          
          {/* Visual: Fingerprint and Refresh Circle Overlay */}
          <View style={styles.visualContainer}>
            <Image
              source={require("@/assets/images/app/fingerprint.png")}
              style={styles.fingerprintBg}
            />
            <View style={styles.refreshCircle}>
              <MaterialCommunityIcons name="lock-reset" size={50} color="#FFFFFF" />
            </View>
          </View>

          {/* Heading and Description */}
          <Text style={styles.title}>Reset your password</Text>
          <Text style={styles.subtitle}>
            Enter your email and we'll send you a secure reset link.
          </Text>

          {/* Input Form */}
          <Input
            label="EMAIL ADDRESS"
            labelStyle={styles.label}
            icon={
              <Feather name="mail" size={20} color="#8E8E93" style={{ marginRight: 12 }} />
            }
            placeholder="name@security.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            containerStyle={{ marginBottom: 24 }}
          />

          {/* Action Button */}
          <Button
            title="Send Reset Link"
            onPress={handleSendReset}
            style={{ marginBottom: 28 }}
          />

          {/* Back to Sign In Link */}
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.6}
            onPress={() => router.push("/signin")}
          >
            <View style={styles.backButtonContent}>
              <Feather name="arrow-left" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.backButtonText}>Back to Sign In</Text>
            </View>
          </TouchableOpacity>

        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  fingerprintBg: {
    position: "absolute",
    width: 250,
    height: 250,
    opacity: 0.05,
    resizeMode: "contain",
    top:50
  },
  // Center refresh circle container
  refreshCircle: {
    width: 125,
    height: 125,
    borderRadius: 200,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
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
  label: {
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: "700",
    color: "#8E8E93",
    marginBottom: 8,
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B0B0C",
    borderColor: "#2C2C2E",
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 32,
    width: "100%",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    height: "100%",
    paddingVertical: 0,
    fontFamily: "System",
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "System",
  },
});
