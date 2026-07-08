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

export default function PublicAddressExposureScreen() {
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
        <Text style={styles.headerTitle}>ADDRESS EXPOSURE</Text>
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
          <Text style={styles.mainTitle}>Exposed Home Address</Text>
          <Text style={styles.subtitle}>Your home address was found on public websites.</Text>
        </Animated.View>

        {/* Summary Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.summaryCard}>
          {/* Watermark Target background */}
          <View style={styles.watermarkContainer}>
            <MaterialCommunityIcons name="target" size={76} color="rgba(255, 255, 255, 0.04)" />
          </View>

          <View style={styles.cardHeaderRow}>
            <View style={styles.riskLevelBadge}>
              <Text style={styles.riskLevelText}>HIGH RISK LEVEL</Text>
            </View>
            <Text style={styles.idText}>ID: PRV-8820</Text>
          </View>

          <Text style={styles.summaryTitle}>2 address matches detected</Text>
          <Text style={styles.summaryDesc}>
            Your home address is visible on major data broker sites, putting your physical privacy and safety at risk.
          </Text>

          {/* Red Progress Indicator Bar */}
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </Animated.View>

        {/* Exposed Sources Section */}
        <Animated.View entering={FadeInDown.delay(150).duration(600)} style={styles.sourcesSection}>
          <Text style={styles.sectionHeaderTitle}>EXPOSED SOURCES</Text>

          {/* Source Card 1: Spokeo */}
          <View style={styles.sourceCard}>
            <View style={styles.sourceTopRow}>
              <View style={styles.sourceLeftInfo}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(255, 255, 255, 0.05)" }]}>
                  <Feather name="share-2" size={18} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.sourceName}>Spokeo</Text>
                  <Text style={styles.sourceType}>DATA BROKER</Text>
                </View>
              </View>
              <View style={[styles.badge, styles.badgeHigh]}>
                <Text style={[styles.badgeText, styles.badgeTextHigh]}>HIGH RISK</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.dataFoundLabel}>DATA FOUND</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Current Address</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Relatives</Text>
              </View>
            </View>

            {/* Masked Address Display Box */}
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>123 P*** Ave, New York, NY</Text>
            </View>

            <View style={styles.cardActionRow}>
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={styles.statusSuccessText}>Removal Supported</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>VIEW DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Source Card 2: FamilyTreeNow */}
          <View style={styles.sourceCard}>
            <View style={styles.sourceTopRow}>
              <View style={styles.sourceLeftInfo}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(255, 255, 255, 0.05)" }]}>
                  <MaterialCommunityIcons name="sitemap" size={18} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.sourceName}>FamilyTreeNow</Text>
                  <Text style={styles.sourceType}>GENEALOGY SITE</Text>
                </View>
              </View>
              <View style={[styles.badge, styles.badgeMedium]}>
                <Text style={[styles.badgeText, styles.badgeTextMedium]}>MEDIUM RISK</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.dataFoundLabel}>DATA FOUND</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Previous Address</Text>
              </View>
            </View>

            {/* Masked Address Display Box */}
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>456 O*** St, Chicago, IL</Text>
            </View>

            <View style={styles.cardActionRow}>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: "#8E8E93" }]} />
                <Text style={[styles.statusSuccessText, { color: "#8E8E93" }]}>Manual Guidance</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={[styles.viewDetailsButton, styles.viewDetailsOutline]}>
                <Text style={[styles.viewDetailsText, styles.viewDetailsOutlineText]}>VIEW DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Privacy Command Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.commandCard}>
          <Feather name="shield" size={20} color="#FFFFFF" style={styles.commandIcon} />
          <View style={styles.commandTextContainer}>
            <Text style={styles.commandTitle}>Privacy Command</Text>
            <Text style={styles.commandDesc}>
              Enable automatic removal requests in Settings to let Fingerprint Focus handle these brokers daily.
            </Text>
          </View>
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
  idText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
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
    marginBottom: 16,
  },
  progressBarBg: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FF453A",
    width: "65%",
  },
  sourcesSection: {
    width: "100%",
    marginBottom: 16,
  },
  sectionHeaderTitle: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    fontFamily: "System",
    marginBottom: 12,
  },
  sourceCard: {
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  sourceTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sourceLeftInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sourceName: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "800",
    fontFamily: "System",
  },
  sourceType: {
    color: "#8E8E93",
    fontSize: 9.5,
    fontWeight: "800",
    fontFamily: "System",
    marginTop: 2,
    letterSpacing: 0.5,
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
  dataFoundLabel: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "System",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 11.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  addressBox: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: "100%",
    marginBottom: 16,
  },
  addressText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontFamily: "System",
    fontWeight: "500",
  },
  cardActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusContainer: {
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
  statusSuccessText: {
    color: "#30D158",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "System",
  },
  viewDetailsButton: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewDetailsOutline: {
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  viewDetailsText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  viewDetailsOutlineText: {
    color: "#8E8E93",
  },
  commandCard: {
    flexDirection: "row",
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  commandIcon: {
    marginRight: 14,
  },
  commandTextContainer: {
    flex: 1,
  },
  commandTitle: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "800",
    fontFamily: "System",
  },
  commandDesc: {
    color: "#8E8E93",
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: "System",
    marginTop: 4,
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
