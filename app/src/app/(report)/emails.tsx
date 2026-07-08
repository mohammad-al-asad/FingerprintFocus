import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ExposedEmailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
        <Text style={styles.headerTitle}>EXPOSED EMAILS</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>Exposed Emails</Text>
          <Text style={styles.subtitle}>Your email address was found in a data breach.</Text>
        </Animated.View>

        {/* Risk Level Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.summaryCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.riskLevelBadge}>
              <Text style={styles.riskLevelText}>HIGH RISK LEVEL</Text>
            </View>
            <Feather name="alert-triangle" size={18} color="#FF453A" />
          </View>
          <Text style={styles.summaryTitle}>1 email address found in data breaches.</Text>
        </Animated.View>

        {/* Target Account details card */}
        <Animated.View entering={FadeInDown.delay(150).duration(600)} style={styles.detailsCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.targetLabel}>TARGET ACCOUNT</Text>
            <View style={styles.highBadge}>
              <Text style={styles.highBadgeText}>HIGH</Text>
            </View>
          </View>

          <Text style={styles.emailText}>john****@gmail.com</Text>

          <View style={styles.divider} />

          <View style={styles.gridRow}>
            <View style={styles.gridColumn}>
              <Text style={styles.gridLabel}>SOURCE</Text>
              <Text style={styles.gridValue}>Breach database</Text>
            </View>
            <View style={styles.gridColumn}>
              <Text style={styles.gridLabel}>DATA EXPOSED</Text>
              <Text style={styles.gridValue}>Email + password risk</Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.innerButton}>
            <Text style={styles.innerButtonText}>VIEW DETAILS</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Recommended Actions */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.actionsSection}>
          <Text style={styles.actionsSectionTitle}>Recommended Actions</Text>

          {/* Action 1: Change password */}
          <TouchableOpacity activeOpacity={0.8} style={styles.actionRow}>
            <View style={styles.actionRowLeft}>
              <View style={styles.iconCircle}>
                <Feather name="lock" size={16} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Change password</Text>
                <Text style={styles.actionSubtitle}>Use a unique, strong password</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>

          {/* Action 2: Enable 2FA */}
          <TouchableOpacity activeOpacity={0.8} style={styles.actionRow}>
            <View style={styles.actionRowLeft}>
              <View style={styles.iconCircle}>
                <Feather name="key" size={16} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Enable 2FA</Text>
                <Text style={styles.actionSubtitle}>Add a second layer of security</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(250).duration(600)} style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.primaryButton}
            onPress={() => router.push("/(report)/remove" as any)}
          >
            <Text style={styles.primaryButtonText}>Send Removal Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.secondaryButton}
            onPress={() => router.push("/(report)/government" as any)}
          >
            <Feather name="file-text" size={14} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.secondaryButtonText}>Prepare Identity Theft Report</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titleSection: {
    marginBottom: 20,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    fontFamily: "System",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 14.5,
    fontFamily: "System",
    fontWeight: "500",
  },
  summaryCard: {
    backgroundColor: "rgba(255, 69, 58, 0.08)",
    borderColor: "rgba(255, 69, 58, 0.15)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  riskLevelBadge: {
    backgroundColor: "rgba(255, 69, 58, 0.15)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  riskLevelText: {
    color: "#FF453A",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "System",
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "System",
    lineHeight: 24,
  },
  detailsCard: {
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  targetLabel: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    fontFamily: "System",
  },
  highBadge: {
    backgroundColor: "#FF3B30",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  highBadgeText: {
    color: "#FFFFFF",
    fontSize: 9.5,
    fontWeight: "800",
    fontFamily: "System",
  },
  emailText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "System",
    marginTop: 8,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    width: "100%",
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridColumn: {
    flex: 1,
  },
  gridLabel: {
    color: "#8E8E93",
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 1,
    fontFamily: "System",
    marginBottom: 4,
  },
  gridValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
  },
  innerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  innerButtonText: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  actionsSection: {
    width: "100%",
    marginBottom: 24,
  },
  actionsSectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "System",
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(22, 22, 26, 0.45)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    height: 68,
  },
  actionRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  actionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "System",
  },
  actionSubtitle: {
    color: "#8E8E93",
    fontSize: 12.5,
    fontFamily: "System",
    marginTop: 2,
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 27,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 14.5,
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1.5,
    borderRadius: 27,
    height: 54,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
