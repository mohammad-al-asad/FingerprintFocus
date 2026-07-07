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
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const getPasswordStrength = () => {
    if (!password) return "";
    if (password.length < 6) return "WEAK";
    if (password.length < 10) return "MEDIUM";
    return "STRONG";
  };

  const strength = getPasswordStrength();

  const handleSignUp = () => {
    console.log("Register:", fullName, email, password);
    // On success, route to Profile Setup flow
    router.push("/(profileSetup)" as any);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.content}>
          
          {/* Titles */}
          <Text style={styles.title}>Create your secure account</Text>
          <Text style={styles.subtitle}>Start scanning your digital footprint privately.</Text>

          {/* Full Name */}
          <Input
            label="Full Name"
            placeholder="John Doe"
            autoCorrect={false}
            value={fullName}
            onChangeText={setFullName}
            inputWrapperStyle={{ backgroundColor: "#050505", height: 54 }}
            containerStyle={{ marginBottom: 16 }}
          />

          {/* Email Address */}
          <Input
            label="Email Address"
            placeholder="name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            inputWrapperStyle={{ backgroundColor: "#050505", height: 54 }}
            containerStyle={{ marginBottom: 16 }}
          />

          {/* Password */}
          <Input
            label="Password"
            rightLabel={
              strength ? (
                <Text
                  style={[
                    styles.strengthText,
                    strength === "WEAK" && styles.weakText,
                    strength === "MEDIUM" && styles.mediumText,
                    strength === "STRONG" && styles.strongText,
                    { marginBottom: 0 },
                  ]}
                >
                  {strength}
                </Text>
              ) : undefined
            }
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
            inputWrapperStyle={{ backgroundColor: "#050505", height: 54 }}
            containerStyle={{ marginBottom: 16 }}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
                style={styles.eyeButton}
              >
                <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#8E8E93" />
              </TouchableOpacity>
            }
          />

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            placeholder="••••••••"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            inputWrapperStyle={{ backgroundColor: "#050505", height: 54 }}
            containerStyle={{ marginBottom: 16 }}
          />

          {/* Terms compliance toggle */}
          <TouchableOpacity
            style={styles.termsWrapper}
            activeOpacity={0.7}
            onPress={() => setAgreed(!agreed)}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
              {agreed && <View style={styles.checkboxCheck} />}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.underlineText}>Terms</Text> and{" "}
              <Text style={styles.underlineText}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Action Button */}
          <Button
            title="Create Account"
            onPress={handleSignUp}
            style={{ marginBottom: 16 }}
          />

          {/* Redirection Link */}
          <View style={styles.footerLinkContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => router.push("/signin")}>
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

          {/* Encryption statement card */}
          <View style={styles.infoCard}>
            <View style={styles.shieldIcon}>
              <View style={styles.shieldShape}>
                <View style={styles.shieldCheck} />
              </View>
            </View>
            <Text style={styles.infoCardText}>
              Your information is encrypted and used only for exposure detection and remove request support.
            </Text>
          </View>

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
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
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
    marginBottom: 24,
    fontFamily: "System",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#A0A0A5",
    marginBottom: 8,
    fontFamily: "System",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#050505",
    borderColor: "#2C2C2E",
    borderWidth: 1,
    borderRadius: 12,
    height: 54,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    height: "100%",
    paddingVertical: 0,
    fontFamily: "System",
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  strengthText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 8,
    fontFamily: "System",
  },
  weakText: {
    color: "#FF453A", // Red
  },
  mediumText: {
    color: "#FF9F0A", // Orange
  },
  strongText: {
    color: "#30D158", // Green
  },
  eyeButton: {
    padding: 8,
    marginRight: -8,
  },
  termsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#48484A",
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxActive: {
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  },
  checkboxCheck: {
    width: 10,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#000000",
    transform: [{ rotate: "-45deg" }],
    marginTop: -2,
  },
  termsText: {
    color: "#A0A0A5",
    fontSize: 14,
    fontFamily: "System",
  },
  underlineText: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
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
    paddingVertical: 4,
    marginBottom: 12
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
    fontFamily: "System",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderColor: "#1E1E20",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  shieldIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(48, 209, 88, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  shieldShape: {
    width: 14,
    height: 16,
    borderWidth: 1.5,
    borderColor: "#30D158",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  shieldCheck: {
    width: 6,
    height: 4,
    borderLeftWidth: 1.2,
    borderBottomWidth: 1.2,
    borderColor: "#30D158",
    transform: [{ rotate: "-45deg" }],
    marginTop: -2,
  },
  infoCardText: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: "System",
  },
});
