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

export default function PhoneNumberExposureScreen() {
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
        <Text style={styles.headerTitle}>NUMBER EXPOSURE</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>Phone Number Exposure</Text>
          <Text style={styles.subtitle}>Phone numbers found on public people-search or broker sites.</Text>
        </Animated.View>

        {/* Summary Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.summaryCard}>
          {/* Watermark Shield background */}
          <View style={styles.watermarkContainer}>
            <MaterialCommunityIcons name="shield-outline" size={76} color="rgba(255, 255, 255, 0.04)" />
          </View>

          <View style={styles.cardHeaderRow}>
            <Text style={styles.summaryTitle}>2 phone matches found</Text>
          </View>
          <View style={styles.riskLevelBadge}>
            <Text style={styles.riskLevelText}>MEDIUM RISK</Text>
          </View>
          <Text style={styles.summaryDesc}>
            Matches found on high-traffic data brokers. We recommend initiating removal requests.
          </Text>
        </Animated.View>

        {/* Identified Brokers Section */}
        <Animated.View entering={FadeInDown.delay(150).duration(600)} style={styles.brokersSection}>
          <Text style={styles.sectionHeaderTitle}>IDENTIFIED BROKERS</Text>

          {/* Broker Card 1: FastPeopleSearch */}
          <TouchableOpacity activeOpacity={0.8} style={styles.brokerCard}>
            <View style={styles.brokerTopRow}>
              <View style={styles.brokerLeftInfo}>
                <View style={styles.iconBox}>
                  <Feather name="globe" size={18} color="#FF453A" />
                </View>
                <View>
                  <Text style={styles.brokerName}>FastPeopleSearch</Text>
                  <Text style={styles.brokerDataScope}>Data: Phone + address</Text>
                </View>
              </View>
              <View style={[styles.badge, styles.badgeHigh]}>
                <Text style={[styles.badgeText, styles.badgeTextHigh]}>HIGH</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.brokerBottomRow}>
              <View style={styles.removalStatus}>
                <View style={styles.statusDot} />
                <Text style={styles.removalStatusText}>Removal Supported</Text>
              </View>
              <Text style={styles.viewLinkText}>VIEW FINDING ›</Text>
            </View>
          </TouchableOpacity>

          {/* Broker Card 2: Whitepages */}
          <TouchableOpacity activeOpacity={0.8} style={styles.brokerCard}>
            <View style={styles.brokerTopRow}>
              <View style={styles.brokerLeftInfo}>
                <View style={styles.iconBox}>
                  <Feather name="globe" size={18} color="#FFD60A" />
                </View>
                <View>
                  <Text style={styles.brokerName}>Whitepages</Text>
                  <Text style={styles.brokerDataScope}>Data: Phone number</Text>
                </View>
              </View>
              <View style={[styles.badge, styles.badgeMedium]}>
                <Text style={[styles.badgeText, styles.badgeTextMedium]}>MEDIUM</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.brokerBottomRow}>
              <View style={styles.manualStatus}>
                <Text style={styles.manualStatusText}>Manual steps</Text>
              </View>
              <Text style={styles.viewLinkText}>VIEW FINDING ›</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Informational Disclosure Box */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.disclosureBox}>
          <Feather name="info" size={16} color="#8E8E93" style={styles.infoIcon} />
          <Text style={styles.disclosureText}>
            Data brokers aggregate public records, social media, and marketing lists to create searchable profiles. Your exposure score is calculated based on site traffic and data granularity.
          </Text>
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
    borderColor: "rgba(255, 214, 10, 0.15)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    position: "relative",
    overflow: "hidden",
  },
  watermarkContainer: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "System",
  },
  riskLevelBadge: {
    backgroundColor: "rgba(255, 214, 10, 0.12)",
    borderRadius: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "rgba(255, 214, 10, 0.25)",
  },
  riskLevelText: {
    color: "#FFD60A",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "System",
  },
  summaryDesc: {
    color: "#8E8E93",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
  },
  brokersSection: {
    marginBottom: 20,
  },
  sectionHeaderTitle: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    fontFamily: "System",
    marginBottom: 12,
  },
  brokerCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  brokerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brokerLeftInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  brokerName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 2,
  },
  brokerDataScope: {
    color: "#8E8E93",
    fontSize: 11.5,
    fontFamily: "System",
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 8.5,
    fontWeight: "800",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  badgeHigh: {
    backgroundColor: "rgba(255, 69, 58, 0.15)",
  },
  badgeTextHigh: {
    color: "#FF453A",
  },
  badgeMedium: {
    backgroundColor: "rgba(255, 214, 10, 0.15)",
  },
  badgeTextMedium: {
    color: "#FFD60A",
  },
  divider: {
    height: 1,
    backgroundColor: "#1C1C1E",
    marginVertical: 12,
  },
  brokerBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  removalStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#30D158",
    marginRight: 6,
  },
  removalStatusText: {
    color: "#30D158",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "System",
  },
  manualStatus: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  manualStatusText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "System",
  },
  viewLinkText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  disclosureBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    borderColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 1,
  },
  disclosureText: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 12,
    lineHeight: 17,
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
