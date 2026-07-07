import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface NotificationOption {
  id: string;
  title: string;
  description: string;
  iconName: string;
  iconType: "feather" | "material";
  iconColor: string;
  defaultVal: boolean;
}

const NOTIFICATION_OPTIONS: NotificationOption[] = [
  {
    id: "monthly-scan",
    title: "Monthly scan completed",
    description: "Receive a digest when your automated footprint scan is finished.",
    iconName: "radar",
    iconType: "material",
    iconColor: "#FFFFFF",
    defaultVal: true,
  },
  {
    id: "new-exposure",
    title: "New exposure found",
    description: "Immediate alerts when your PII is detected on a new site.",
    iconName: "eye",
    iconType: "feather",
    iconColor: "#FF453A",
    defaultVal: true,
  },
  {
    id: "remove-request",
    title: "Remove request status update",
    description: "Get notified when a data broker confirms your removal.",
    iconName: "check-circle",
    iconType: "feather",
    iconColor: "#30D158",
    defaultVal: true,
  },
  {
    id: "billing-updates",
    title: "Billing updates",
    description: "Invoices, renewal reminders, and payment status.",
    iconName: "credit-card",
    iconType: "feather",
    iconColor: "#8E8E93",
    defaultVal: false,
  },
];

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // State to manage toggle states
  const [preferences, setPreferences] = useState<Record<string, boolean>>(
    NOTIFICATION_OPTIONS.reduce((acc, curr) => {
      acc[curr.id] = curr.defaultVal;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleToggle = (id: string) => {
    setPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = () => {
    Alert.alert("Success", "Notification preferences saved successfully.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  // Custom Switch Component matching mockup
  const CustomSwitch = ({
    value,
    onValueChange,
  }: {
    value: boolean;
    onValueChange: () => void;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onValueChange}
        style={[
          styles.switchTrack,
          value ? styles.switchTrackActive : styles.switchTrackInactive,
        ]}
      >
        <View
          style={[
            styles.switchThumb,
            value ? styles.switchThumbActive : styles.switchThumbInactive,
          ]}
        />
      </TouchableOpacity>
    );
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
        <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title / Description */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>Notification Settings</Text>
          <Text style={styles.subtitle}>
            Configure how the Command Center alerts you to privacy risks and updates.
          </Text>
        </Animated.View>

        {/* Preference Cards */}
        <View style={styles.optionsList}>
          {NOTIFICATION_OPTIONS.map((option, index) => {
            const isToggled = preferences[option.id];
            const IconComponent = option.iconType === "feather" ? Feather : MaterialCommunityIcons;

            return (
              <Animated.View
                key={option.id}
                entering={FadeInDown.delay(100 + index * 50).duration(500)}
                style={styles.optionCard}
              >
                <View style={styles.cardLeft}>
                  {/* Rounded square container for icon */}
                  <View style={styles.iconContainer}>
                    <IconComponent name={option.iconName as any} size={18} color={option.iconColor} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                </View>

                {/* Custom Switch Toggle */}
                <CustomSwitch
                  value={isToggled}
                  onValueChange={() => handleToggle(option.id)}
                />
              </Animated.View>
            );
          })}
        </View>

        {/* Save Preferences Button */}
        <Animated.View entering={FadeInDown.delay(350).duration(600)} style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>SAVE PREFERENCES</Text>
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
    marginBottom: 28,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 8,
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
  },
  optionsList: {
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 4,
  },
  optionDescription: {
    color: "#8E8E93",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "System",
  },
  
  /* Custom Switch Styles matching premium mockup */
  switchTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 2,
    justifyContent: "center",
  },
  switchTrackActive: {
    backgroundColor: "#000000",
    borderColor: "#FFFFFF",
  },
  switchTrackInactive: {
    backgroundColor: "#000000",
    borderColor: "#3A3A3C",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  switchThumbActive: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-end",
  },
  switchThumbInactive: {
    backgroundColor: "#48484A",
    alignSelf: "flex-start",
  },

  buttonContainer: {
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  saveButtonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
});
