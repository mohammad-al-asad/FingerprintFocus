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
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>Public Address Exposure</Text>
          <Text style={styles.subtitle}>Addresses linked to your profile were found online.</Text>
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
            Your home address is visible on major data broker sites, increasing the risk of physical privacy breaches.
          </Text>

          {/* Progress bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "70%" }]} />
          </View>
        </Animated.View>

        {/* Exposed Sources Section */}
        <Animated.View entering={FadeInDown.delay(150).duration(600)} style={styles.sourcesSection}>
          <Text style={styles.sectionHeaderTitle}>EXPOSED SOURCES</Text>

          {/* Source Card 1: Spokeo */}
          <View style={styles.sourceCard}>
            <View style={styles.sourceTopRow}>
              <View style={styles.sourceLeftInfo}>
                <View style={styles.iconBox}>
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

            {/* Address Value Input-like Box */}
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>123 P*** Ave, New York, NY</Text>
            </View>

            <View style={styles.cardActionRow}>
              <View style={styles.statusContainer}>
                <Feather name="check-circle" size={13} color="#30D158" style={{ marginRight: 6 }} />
                <Text style={styles.statusSuccessText}>Remove Supported</Text>
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
                <View style={styles.iconBox}>
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

            {/* Address Value Input-like Box */}
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>456 O*** St, Chicago, IL</Text>
            </View>

            <View style={styles.cardActionRow}>
              <View style={styles.statusContainer}>
                <Feather name="help-circle" size={13} color="#8E8E93" style={{ marginRight: 6 }} />
                <Text style={styles.statusInfoText}>Manual Guidance</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.viewDetailsOutlineButton}>
                <Text style={styles.viewDetailsOutlineText}>VIEW DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Privacy Command Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.commandCard}>
          <View style={styles.commandCardContent}>
            <Feather name="shield" size={20} color="#FFFFFF" style={styles.commandIcon} />
            <View style={styles.commandTextContainer}>
              <Text style={styles.commandTitle}>Privacy Command</Text>
              <Text style={styles.commandDesc}>
                Enable automatic removal requests in Settings to let Privacera handle these brokers daily.
              </Text>
            </View>
          </View>
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
    borderColor: "rgba(255, 69, 58, 0.25)",
    borderWidth: 1.2,
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
    marginBottom: 16,
  },
  riskLevelBadge: {
    backgroundColor: "rgba(255, 69, 58, 0.12)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: "rgba(255, 69, 58, 0.25)",
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
    fontWeight: "600",
    fontFamily: "System",
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 8,
  },
  summaryDesc: {
    color: "#8E8E93",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
    marginBottom: 18,
  },
  progressBarBg: {
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 1.5,
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FF3B30",
    borderRadius: 1.5,
  },
  sourcesSection: {
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
  sourceCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sourceTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sourceLeftInfo: {
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
  sourceName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 2,
  },
  sourceType: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 8.5,
    fontWeight: "800",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  badgeHigh: {
    backgroundColor: "rgba(255, 69, 58, 0.12)",
  },
  badgeTextHigh: {
    color: "#FF453A",
  },
  badgeMedium: {
    backgroundColor: "rgba(255, 214, 10, 0.12)",
  },
  badgeTextMedium: {
    color: "#FFD60A",
  },
  divider: {
    height: 1,
    backgroundColor: "#1C1C1E",
    marginVertical: 12,
  },
  dataFoundLabel: {
    color: "#8E8E93",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "System",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  tagText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "System",
  },
  addressBox: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  addressText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "System",
  },
  cardActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusSuccessText: {
    color: "#30D158",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "System",
  },
  statusInfoText: {
    color: "#8E8E93",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "System",
  },
  viewDetailsButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  viewDetailsText: {
    color: "#000000",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "System",
  },
  viewDetailsOutlineButton: {
    backgroundColor: "transparent",
    borderColor: "#3E3E42",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  viewDetailsOutlineText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "System",
  },
  commandCard: {
    backgroundColor: "#121214",
    borderLeftWidth: 3.5,
    borderLeftColor: "#FFFFFF",
    borderRadius: 12,
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  commandCardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  commandIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  commandTextContainer: {
    flex: 1,
  },
  commandTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 4,
  },
  commandDesc: {
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
