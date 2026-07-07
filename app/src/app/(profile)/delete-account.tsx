import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function DeleteAccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [confirmText, setConfirmText] = useState("");

  const isConfirmed = confirmText.trim() === "DELETE";

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/login-security" as any);
    }
  };

  const handleDelete = () => {
    if (!isConfirmed) return;
    console.log("Account deletion confirmed");
    // Clear credentials and route back to landing auth index page
    router.replace("/(auth)/index" as any);
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
        <Text style={styles.headerTitle}>DELETE ACCOUNT</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Visual Centerpiece */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.centerpieceContainer}>
          <Image
            source={require("@/assets/images/app/fingerprint.png")}
            style={styles.fingerprintBg}
            contentFit="contain"
          />
          <View style={styles.warningCircle}>
            <Feather name="alert-triangle" size={38} color="#FF453A" />
          </View>
        </Animated.View>

        {/* Text Section */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.textContainer}>
          <Text style={styles.title}>Are you sure you want to delete your account?</Text>
          <Text style={styles.subtitle}>
            This will permanently delete your profile, scan history, exposure report, and all encrypted data. This action is <Text style={styles.redHighlight}>irreversible</Text>.
          </Text>
        </Animated.View>

        {/* Input Card Container */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.inputCard}>
          <Text style={styles.inputCardLabel}>To confirm, type DELETE in the field below</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type DELETE"
            placeholderTextColor="#48484A"
            value={confirmText}
            onChangeText={setConfirmText}
            autoCapitalize="characters"
            autoCorrect={false}
          />
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.deleteButton, !isConfirmed && styles.deleteButtonDisabled]}
            activeOpacity={isConfirmed ? 0.8 : 1}
            onPress={handleDelete}
            disabled={!isConfirmed}
          >
            <Feather name="trash-2" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.deleteButtonText}>Delete My Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.8}
            onPress={handleBack}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom Erasure Sublabel */}
        <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.erasureLabelContainer}>
          <Feather name="shield" size={13} color="#8E8E93" style={{ marginRight: 6 }} />
          <Text style={styles.erasureText}>Secure Permanent Erasure Protocol Active</Text>
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
    alignItems: "center",
  },
  centerpieceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 180,
    width: "100%",
    position: "relative",
  },
  fingerprintBg: {
    position: "absolute",
    width: 220,
    height: 220,
    opacity: 0.05,
    tintColor: "#FFFFFF",
  },
  warningCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255, 69, 58, 0.12)",
    borderWidth: 1.5,
    borderColor: "#FF453A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF453A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 4,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 12,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "System",
    paddingHorizontal: 12,
  },
  redHighlight: {
    color: "#FF453A",
    fontWeight: "600",
  },
  inputCard: {
    width: "100%",
    backgroundColor: "rgba(28, 28, 30, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },
  inputCardLabel: {
    color: "#E5E5EA",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 14,
    fontFamily: "System",
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    height: 52,
    backgroundColor: "#000000",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 16,
    textAlign: "center",
    fontFamily: "System",
  },
  buttonsContainer: {
    width: "100%",
    marginBottom: 32,
  },
  deleteButton: {
    backgroundColor: "#8E2C2C",
    borderRadius: 28,
    width: "100%",
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#8E2C2C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  deleteButtonDisabled: {
    backgroundColor: "#2C2C2E",
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
  erasureLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  erasureText: {
    color: "#8E8E93",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "System",
  },
});
