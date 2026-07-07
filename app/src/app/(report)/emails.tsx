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
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>Exposed Emails</Text>
          <Text style={styles.subtitle}>Email addresses found in public or breach exposure.</Text>
        </Animated.View>

        {/* Risk Level Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.summaryCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.riskLevelBadge}>
              <Text style={styles.riskLevelText}>Risk Level: High</Text>
            </View>
            <Feather name="alert-triangle" size={20} color="#FF453A" />
          </View>
          <Text style={styles.summaryTitle}>1 email appeared in breach records.</Text>
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
            <Text style={styles.innerButtonText}>View Details</Text>
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
                <Text style={styles.actionSubtitle}>Update to a unique string</Text>
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
            <Text style={styles.primaryButtonText}>SEND REMOVAL REQUEST</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.secondaryButton}
            onPress={() => router.push("/government" as any)}
          >
            <Feather name="file-text" size={14} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.secondaryButtonText}>Prepare FTC / IC3 Report</Text>
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
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 4,
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 13,
    fontFamily: "System",
  },
  summaryCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 69, 58, 0.15)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  riskLevelBadge: {
    backgroundColor: "rgba(255, 69, 58, 0.12)",
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
    fontWeight: "700",
    fontFamily: "System",
  },
  detailsCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  targetLabel: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    fontFamily: "System",
  },
  highBadge: {
    backgroundColor: "#FF453A",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  highBadgeText: {
    color: "#FFFFFF",
    fontSize: 8.5,
    fontWeight: "900",
    fontFamily: "System",
  },
  emailText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "System",
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#1C1C1E",
    marginVertical: 16,
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
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "System",
    marginBottom: 4,
  },
  gridValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "System",
  },
  innerButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  innerButtonText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "System",
  },
  actionsSection: {
    marginBottom: 24,
  },
  actionsSectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  actionRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  actionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 2,
  },
  actionSubtitle: {
    color: "#8E8E93",
    fontSize: 12,
    fontFamily: "System",
  },
  buttonContainer: {
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  secondaryButton: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#3E3E42",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
  },
});
