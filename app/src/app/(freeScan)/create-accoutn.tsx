import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  BackHandler,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function CreateAccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  const features = [
    "Save your scan securely",
    "View your full exposure report",
    "Track remove actions",
    "Monitor new exposure after upgrade",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="fingerprint" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>PRIVACERA</Text>
        </View>
        <TouchableOpacity
          onPress={handleExitApp}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Feather name="x" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Centered Top Content */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.topContent}>
          {/* Action Required Badge */}
          <View style={styles.actionBadge}>
            <Feather name="alert-triangle" size={12} color="#FF453A" style={{ marginRight: 6 }} />
            <Text style={styles.actionBadgeText}>ACTION REQUIRED</Text>
          </View>

          <Text style={styles.title}>We found exposure signals</Text>
          <Text style={styles.subtitle}>
            Create your secure account to save your scan results, unlock your full report, and take action from your private dashboard.
          </Text>
        </Animated.View>

        {/* Metrics Summary Card */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.metricsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderTitle}>SCANNED EXPOSURE METRICS</Text>
            <View style={styles.cardHeaderLine} />
          </View>

          {/* Metric 1 */}
          <View style={styles.metricItem}>
            <View style={styles.metricItemLeft}>
              <Feather name="database" size={18} color="#8E8E93" style={{ marginRight: 12 }} />
              <Text style={styles.metricItemText}>Broker Listings</Text>
            </View>
            <View style={styles.badgeLikely}>
              <Text style={styles.badgeLikelyText}>23 LIKELY</Text>
            </View>
          </View>

          {/* Metric 2 */}
          <View style={styles.metricItem}>
            <View style={styles.metricItemLeft}>
              <Feather name="alert-circle" size={18} color="#FF453A" style={{ marginRight: 12 }} />
              <Text style={styles.metricItemText}>High-Risk Points</Text>
            </View>
            <View style={styles.badgeAlert}>
              <Text style={styles.badgeAlertText}>8 ALERT</Text>
            </View>
          </View>

          {/* Metric 3 */}
          <View style={[styles.metricItem, { borderBottomWidth: 0 }]}>
            <View style={styles.metricItemLeft}>
              <Feather name="shield" size={18} color="#30D158" style={{ marginRight: 12 }} />
              <Text style={styles.metricItemText}>Remove Opportunities</Text>
            </View>
            <View style={styles.badgeReady}>
              <Text style={styles.badgeReadyText}>12 READY</Text>
            </View>
          </View>

          {/* Circular Progress arc chart */}
          <View style={styles.riskRingContainer}>
            <View style={styles.riskRing}>
              <Text style={styles.riskPercentage}>60%</Text>
              <Text style={styles.riskLabel}>RISK</Text>
            </View>
          </View>
        </Animated.View>

        {/* Bullet Points List */}
        <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.bulletsList}>
          {features.map((feature, index) => (
            <View key={index} style={styles.bulletItem}>
              <Feather name="check-circle" size={18} color="#30D158" style={styles.bulletIcon} />
              <Text style={styles.bulletText}>{feature}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Actions Footer */}
        <Animated.View entering={FadeInDown.delay(700).duration(600)} style={styles.footer}>
          {/* Primary Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(auth)")}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Create Account to Save Results</Text>
          </TouchableOpacity>

          {/* Secondary Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleExitApp}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Not now</Text>
          </TouchableOpacity>

          {/* Encryption Footer text */}
          <Text style={styles.encryptionText}>ENCRYPTED WITH AES-256 STANDARD</Text>
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  topContent: {
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  actionBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 69, 58, 0.3)",
    backgroundColor: "rgba(255, 69, 58, 0.08)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 16,
  },
  actionBadgeText: {
    color: "#FF453A",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 32,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "System",
    paddingHorizontal: 8,
  },
  metricsCard: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    backgroundColor: "rgba(28, 28, 30, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginTop: 24,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardHeaderTitle: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginRight: 10,
    fontFamily: "System",
  },
  cardHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  metricItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricItemText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "System",
  },
  badgeLikely: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeLikelyText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "System",
  },
  badgeAlert: {
    backgroundColor: "rgba(255, 69, 58, 0.15)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeAlertText: {
    color: "#FF453A",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "System",
  },
  badgeReady: {
    backgroundColor: "rgba(48, 209, 88, 0.15)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeReadyText: {
    color: "#30D158",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "System",
  },
  riskRingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 6,
  },
  riskRing: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 5,
    borderColor: "#FF453A",
    borderBottomColor: "rgba(255, 69, 58, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  riskPercentage: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    fontFamily: "System",
  },
  riskLabel: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
    fontFamily: "System",
  },
  bulletsList: {
    width: "100%",
    marginTop: 24,
    paddingHorizontal: 8,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  bulletIcon: {
    marginRight: 12,
  },
  bulletText: {
    color: "#E5E5EA",
    fontSize: 14.5,
    fontWeight: "500",
    fontFamily: "System",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
  secondaryButton: {
    backgroundColor: "#000000",
    borderColor: "#2C2C2E",
    borderWidth: 1,
    borderRadius: 28,
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
  encryptionText: {
    color: "#48484A",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
    marginTop: 10,
  },
});
