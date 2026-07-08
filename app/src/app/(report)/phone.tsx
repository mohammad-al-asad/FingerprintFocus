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
          <Text style={styles.mainTitle}>Exposed Phone Numbers</Text>
          <Text style={styles.subtitle}>Your phone number was found on people-search and data broker sites.</Text>
        </Animated.View>

        {/* Summary Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.summaryCard}>
          {/* Watermark Shield background */}
          <View style={styles.watermarkContainer}>
            <MaterialCommunityIcons name="shield-outline" size={76} color="rgba(255, 255, 255, 0.04)" />
          </View>

          <View style={styles.cardHeaderRow}>
            <View style={styles.riskLevelBadge}>
              <Text style={styles.riskLevelText}>MEDIUM RISK LEVEL</Text>
            </View>
          </View>

          <Text style={styles.summaryTitle}>2 phone matches found</Text>
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
                <View style={[styles.iconBox, { backgroundColor: "rgba(255, 69, 58, 0.08)" }]}>
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
                <View style={[styles.iconBox, { backgroundColor: "rgba(255, 214, 10, 0.08)" }]}>
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
                <Text style={styles.manualStatusText}>Manual Steps</Text>
              </View>
              <Text style={styles.viewLinkText}>VIEW FINDING ›</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Informational Disclosure Box */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.disclosureBox}>
          <Feather name="info" size={16} color="#8E8E93" style={styles.infoIcon} />
          <Text style={styles.disclosureText}>
            Data brokers collect public records, social media, and marketing data to build searchable profiles. Your exposure score reflects how much of your information is exposed and how easy it is to find.
          </Text>
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
    backgroundColor: "rgba(255, 214, 10, 0.05)",
    borderColor: "rgba(255, 214, 10, 0.12)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    position: "relative",
    overflow: "hidden",
  },
  watermarkContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
    opacity: 0.04,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  riskLevelBadge: {
    backgroundColor: "rgba(255, 214, 10, 0.15)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  riskLevelText: {
    color: "#FFD60A",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "System",
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "System",
    marginBottom: 6,
  },
  summaryDesc: {
    color: "#A0A0A5",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
    fontWeight: "500",
  },
  brokersSection: {
    width: "100%",
    marginBottom: 20,
  },
  sectionHeaderTitle: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    fontFamily: "System",
    marginBottom: 12,
  },
  brokerCard: {
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  brokerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  brokerLeftInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  brokerName: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "800",
    fontFamily: "System",
  },
  brokerDataScope: {
    color: "#8E8E93",
    fontSize: 12.5,
    fontFamily: "System",
    marginTop: 2,
    fontWeight: "500",
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeHigh: {
    backgroundColor: "rgba(255, 69, 58, 0.12)",
  },
  badgeMedium: {
    backgroundColor: "rgba(255, 214, 10, 0.12)",
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "800",
    fontFamily: "System",
  },
  badgeTextHigh: {
    color: "#FF453A",
  },
  badgeTextMedium: {
    color: "#FFD60A",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    width: "100%",
    marginBottom: 12,
  },
  brokerBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 12.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  manualStatus: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  manualStatusText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "System",
  },
  viewLinkText: {
    color: "#FFFFFF",
    fontSize: 11.5,
    fontWeight: "800",
  },
  disclosureBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(22, 22, 26, 0.45)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  disclosureText: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
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
