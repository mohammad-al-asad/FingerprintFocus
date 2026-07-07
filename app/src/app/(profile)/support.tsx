import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ISSUE_CATEGORIES = [
  "Privacy Exposure Report",
  "Identity Theft / Data Leak Alert",
  "Billing & Subscription Support",
  "Account Security / 2FA Reset",
  "Data Removal Request Status",
  "Other Technical Issue",
];

export default function ContactSupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const handleSendMessage = () => {
    if (!selectedCategory) {
      Alert.alert("Required", "Please select an issue category.");
      return;
    }
    if (!message.trim()) {
      Alert.alert("Required", "Please explain your situation.");
      return;
    }

    Alert.alert("Success", "Your message has been sent securely to our experts.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CONTACT SUPPORT</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <View style={styles.secureBadge}>
            <Text style={styles.secureBadgeText}>SECURE CHANNEL</Text>
            <View style={styles.statusDot} />
          </View>
          <Text style={styles.subtitle}>
            Our security experts are ready to assist. Please describe your issue with as much detail as possible.
          </Text>
        </Animated.View>

        {/* Topic Input/Dropdown */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>TOPIC</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dropdownButton}
            onPress={() => setShowDropdown((prev) => !prev)}
          >
            <Text style={[styles.dropdownButtonText, !selectedCategory && styles.placeholderText]}>
              {selectedCategory || "Select an issue category"}
            </Text>
            <Feather
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={18}
              color="#8E8E93"
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownList}>
              {ISSUE_CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.dropdownItem}
                  onPress={() => handleSelectCategory(category)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dropdownItemText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Animated.View>

        {/* Message Input */}
        <Animated.View entering={FadeInDown.delay(150).duration(500)} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>MESSAGE</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Explain the situation..."
              placeholderTextColor="#48484A"
              multiline={true}
              numberOfLines={6}
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
            />
          </View>
        </Animated.View>

        {/* Attach Screenshot Dotted Box */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>ATTACH SCREENSHOT</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.uploadCard}
            onPress={() => Alert.alert("Upload", "Image upload integration placeholder...")}
          >
            <MaterialCommunityIcons name="image-plus" size={26} color="#8E8E93" style={styles.uploadIcon} />
            <Text style={styles.uploadTitle}>Tap to upload or drag imagery</Text>
            <Text style={styles.uploadSub}>MAX 10MB (JPG, PNG)</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Send Button */}
        <Animated.View entering={FadeInDown.delay(250).duration(500)} style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>SEND MESSAGE</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000000",
    paddingBottom: 16,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1E",
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  headerRightPlaceholder: {
    width: 56,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  titleSection: {
    marginBottom: 24,
  },
  secureBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  secureBadgeText: {
    color: "#30D158",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: "System",
    marginRight: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#30D158",
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 13.5,
    lineHeight: 20,
    fontFamily: "System",
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
  },
  dropdownButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "System",
  },
  placeholderText: {
    color: "#8E8E93",
  },
  dropdownList: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 8,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1E",
  },
  dropdownItemText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontFamily: "System",
  },
  textAreaContainer: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    minHeight: 140,
  },
  textArea: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "System",
    padding: 0, // resets default paddings
  },
  uploadCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121214",
    borderColor: "#1C1C1E",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 24,
  },
  uploadIcon: {
    marginBottom: 8,
  },
  uploadTitle: {
    color: "#8E8E93",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 4,
  },
  uploadSub: {
    color: "#48484A",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "System",
  },
  buttonContainer: {
    marginTop: 8,
  },
  sendButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  sendButtonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
});
