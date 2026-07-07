import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // Perform authentication logic here
    console.log("Sign in with:", email, password);
    router.dismissAll();
    router.replace('/premium' as any);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.formContainer}>
          {/* Welcome Header */}
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to view your privacy exposure status.</Text>

          {/* Email Address Input */}
          <Input
            label="EMAIL ADDRESS"
            labelStyle={styles.label}
            icon={<Text style={styles.emailIconText}>@</Text>}
            placeholder="name@domain.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            containerStyle={{ marginBottom: 16 }}
          />

          {/* Password Input Label & Forgot Password Link */}
          <Input
            label="PASSWORD"
            labelStyle={styles.label}
            rightLabel={
              <TouchableOpacity activeOpacity={0.6} onPress={() => router.push("/forgot-password" as any)}>
                <Text style={styles.forgotText}>Forgot password</Text>
              </TouchableOpacity>
            }
            icon={
              <Feather name="lock" size={18} color="#8E8E93" style={{ marginRight: 12 }} />
            }
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
                style={styles.eyeButton}
              >
                <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#8E8E93" />
              </TouchableOpacity>
            }
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
            containerStyle={{ marginBottom: 24 }}
          />

          {/* Sign In Button */}
          <Button
            title="Sign In"
            onPress={handleSignIn}
            style={{ marginTop: 8 }}
          />

          {/* Secure Access Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>SECURE ACCESS</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Fast Login Button */}
          <Button
            title="Fast Login"
            variant="secondary"
            onPress={() => console.log("Fast Login clicked")}
            icon={
              <Image
                source={require("@/assets/images/app/fingerprint.png")}
                style={styles.fingerprintLogo}
                contentFit="contain"

              />
            }
            style={{ marginBottom: 32 }}
          />

          {/* Create Account Redirection Link */}
          <View style={styles.footerLinkContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => router.push("/signup")}>
              <Text style={styles.footerLink}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* App Version Label */}
          <Text style={styles.versionText}>PRIVACERA SENTINEL v4.2.0</Text>
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
    paddingBottom: 32,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 15,
    color: "#A0A0A5",
    textAlign: "center",
    marginBottom: 36,
    fontFamily: "System",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8E8E93",
    marginBottom: 8,
    letterSpacing: 1,
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
    marginBottom: 24,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    height: "100%",
    paddingVertical: 0,
    fontFamily: "System",
  },
  emailIconText: {
    color: "#8E8E93",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 12,
    marginTop: -2,
    fontFamily: "System",
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#A0A0A5",
    fontFamily: "System",
    marginBottom: 5,
  },
  eyeButton: {
    padding: 8,
    marginRight: -8,
  },
  signInButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  signInButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
  // Divider Styles
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#1C1C1E",
  },
  dividerText: {
    paddingHorizontal: 16,
    color: "#48484A",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  // Fast Login Button Styles
  fastLoginButton: {
    flexDirection: "row",
    backgroundColor: "#000000",
    borderColor: "#2C2C2E",
    borderWidth: 1,
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  fastLoginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
    fontFamily: "System",
  },
  fingerprintLogo: {
    width: 22,
    height: 22,
    tintColor: "#FFFFFF",
  },
  // Custom fingerprint icon
  fingerprintIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  fpArc1: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    transform: [{ rotate: "-45deg" }],
  },
  fpArc2: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "45deg" }],
  },
  fpArc3: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    borderBottomColor: "transparent",
  },
  // Footer Links
  footerLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 48,
  },
  footerText: {
    color: "#8E8E93",
    fontSize: 15,
    fontFamily: "System",
  },
  footerLink: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    textDecorationLine: "underline",
    fontFamily: "System",
  },
  versionText: {
    color: "#3A3A3C",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
});
