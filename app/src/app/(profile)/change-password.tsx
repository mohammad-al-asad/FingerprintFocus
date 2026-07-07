import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Requirements checks
  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  const matchesConfirm = newPassword.length > 0 && newPassword === confirmPassword;

  const isFormValid =
    currentPassword.length > 0 &&
    hasMinLength &&
    hasNumber &&
    hasSymbol &&
    matchesConfirm;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/login-security" as any);
    }
  };

  const handleUpdatePassword = () => {
    if (!isFormValid) return;
    
    // Simulate successful password update
    Alert.alert(
      "Success",
      "Your password has been successfully updated.",
      [
        {
          text: "OK",
          onPress: () => router.replace("/login-security" as any),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.backButton, { top: insets.top > 0 ? insets.top + 4 : 12 }]}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CHANGE PASSWORD</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Header Labels */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.textContainer}>
          <View style={styles.securityBadge}>
            <Feather name="key" size={13} color="#8E8E93" style={{ marginRight: 6 }} />
            <Text style={styles.securityText}>CREDENTIAL UPDATE</Text>
          </View>
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>
            Choose a strong, secure password containing numbers and symbols to protect your exposure logs.
          </Text>
        </Animated.View>

        {/* Input Fields */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.formContainer}>
          {/* Current Password */}
          <Input
            label="Current Password"
            placeholder="••••••••"
            secureTextEntry={!showCurrent}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            inputWrapperStyle={{ backgroundColor: "#050505", height: 54 }}
            containerStyle={{ marginBottom: 16 }}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowCurrent(!showCurrent)}
                activeOpacity={0.7}
                style={styles.eyeButton}
              >
                <Feather name={showCurrent ? "eye" : "eye-off"} size={18} color="#8E8E93" />
              </TouchableOpacity>
            }
          />

          {/* New Password */}
          <Input
            label="New Password"
            placeholder="••••••••"
            secureTextEntry={!showNew}
            value={newPassword}
            onChangeText={setNewPassword}
            inputWrapperStyle={{ backgroundColor: "#050505", height: 54 }}
            containerStyle={{ marginBottom: 16 }}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowNew(!showNew)}
                activeOpacity={0.7}
                style={styles.eyeButton}
              >
                <Feather name={showNew ? "eye" : "eye-off"} size={18} color="#8E8E93" />
              </TouchableOpacity>
            }
          />

          {/* Confirm Password */}
          <Input
            label="Confirm New Password"
            placeholder="••••••••"
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            inputWrapperStyle={{ backgroundColor: "#050505", height: 54 }}
            containerStyle={{ marginBottom: 24 }}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowConfirm(!showConfirm)}
                activeOpacity={0.7}
                style={styles.eyeButton}
              >
                <Feather name={showConfirm ? "eye" : "eye-off"} size={18} color="#8E8E93" />
              </TouchableOpacity>
            }
          />
        </Animated.View>

        {/* Requirements Checklist */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.checklistCard}>
          <Text style={styles.checklistHeader}>PASSWORD REQUIREMENTS</Text>

          {/* Bullet 1: Length */}
          <View style={styles.checkRow}>
            <Feather
              name={hasMinLength ? "check-circle" : "circle"}
              size={14}
              color={hasMinLength ? "#30D158" : "#48484A"}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.checkText, hasMinLength && styles.checkTextActive]}>
              At least 8 characters long
            </Text>
          </View>

          {/* Bullet 2: Number */}
          <View style={styles.checkRow}>
            <Feather
              name={hasNumber ? "check-circle" : "circle"}
              size={14}
              color={hasNumber ? "#30D158" : "#48484A"}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.checkText, hasNumber && styles.checkTextActive]}>
              Contains at least one number (0-9)
            </Text>
          </View>

          {/* Bullet 3: Symbol */}
          <View style={styles.checkRow}>
            <Feather
              name={hasSymbol ? "check-circle" : "circle"}
              size={14}
              color={hasSymbol ? "#30D158" : "#48484A"}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.checkText, hasSymbol && styles.checkTextActive]}>
              Contains a special character (e.g. !, @, #, $)
            </Text>
          </View>

          {/* Bullet 4: Matching */}
          <View style={styles.checkRow}>
            <Feather
              name={matchesConfirm ? "check-circle" : "circle"}
              size={14}
              color={matchesConfirm ? "#30D158" : "#48484A"}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.checkText, matchesConfirm && styles.checkTextActive]}>
              Passwords match exactly
            </Text>
          </View>
        </Animated.View>

        {/* Action Button */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
            activeOpacity={isFormValid ? 0.8 : 1}
            onPress={handleUpdatePassword}
            disabled={!isFormValid}
          >
            <Text style={[styles.submitButtonText, !isFormValid && styles.submitButtonTextDisabled]}>
              Update Password
            </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    paddingBottom: 16,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1E",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 8,
    padding: 12,
    zIndex: 10,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  textContainer: {
    marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  securityBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  securityText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
    fontFamily: "System",
  },
  formContainer: {
    width: "100%",
  },
  eyeButton: {
    padding: 8,
    marginRight: -4,
  },
  checklistCard: {
    width: "100%",
    backgroundColor: "rgba(28, 28, 30, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
  },
  checklistHeader: {
    color: "#8E8E93",
    fontSize: 10.5,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 14,
    fontFamily: "System",
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkText: {
    color: "#8E8E93",
    fontSize: 13.5,
    fontWeight: "500",
    fontFamily: "System",
  },
  checkTextActive: {
    color: "#E5E5EA",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: "#1C1C1E",
    elevation: 0,
  },
  submitButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
  submitButtonTextDisabled: {
    color: "#48484A",
  },
});
