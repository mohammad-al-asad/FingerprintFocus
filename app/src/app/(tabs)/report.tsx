import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface FindingItem {
  id: string;
  iconName: string;
  iconType: "feather" | "material";
  iconColor: string;
  title: string;
  subtitle: string;
  badgeText: string;
  badgeType: "high" | "medium" | "low" | "action";
}

const FINDINGS_DATA: FindingItem[] = [
  {
    id: "exposed-emails",
    iconName: "at-sign",
    iconType: "feather",
    iconColor: "#FF453A",
    title: "Exposed Emails",
    subtitle: "Personal email found in 1 public database.",
    badgeText: "HIGH",
    badgeType: "high",
  },
  {
    id: "public-addresses",
    iconName: "map-pin",
    iconType: "feather",
    iconColor: "#FFD60A",
    title: "Public Addresses",
    subtitle: "Primary and previous addresses listed on 4 sites.",
    badgeText: "MEDIUM",
    badgeType: "medium",
  },
  {
    id: "phone-exposure",
    iconName: "smartphone",
    iconType: "feather",
    iconColor: "#FFD60A",
    title: "Phone Number Exposure",
    subtitle: "Mobile number associated with public records.",
    badgeText: "MEDIUM",
    badgeType: "medium",
  },
  {
    id: "relative-info",
    iconName: "users",
    iconType: "feather",
    iconColor: "#30D158",
    title: "Public Relative Information",
    subtitle: "Contact details for immediate family members found.",
    badgeText: "LOW",
    badgeType: "low",
  },
  {
    id: "breach-history",
    iconName: "rss",
    iconType: "feather",
    iconColor: "#FF453A",
    title: "Breach History",
    subtitle: "1 credential leak detected in recent database breach.",
    badgeText: "HIGH",
    badgeType: "high",
  },
  {
    id: "broker-profiles",
    iconName: "trending-up",
    iconType: "feather",
    iconColor: "#FF453A",
    title: "Broker Profiles",
    subtitle: "Aggregated profiles found on major data brokers.",
    badgeText: "HIGH",
    badgeType: "high",
  },
  {
    id: "risk-assessment",
    iconName: "alert-circle",
    iconType: "feather",
    iconColor: "#FF453A",
    title: "Risk Assessment: Critical",
    subtitle: "Immediate action recommended to secure identity.",
    badgeText: "ACTION REQUIRED",
    badgeType: "action",
  },
];

export default function ExposureReportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const renderBadge = (type: FindingItem["badgeType"], text: string) => {
    let badgeStyle = {};
    let textStyle = {};

    switch (type) {
      case "high":
        badgeStyle = styles.badgeHigh;
        textStyle = styles.badgeTextHigh;
        break;
      case "medium":
        badgeStyle = styles.badgeMedium;
        textStyle = styles.badgeTextMedium;
        break;
      case "low":
        badgeStyle = styles.badgeLow;
        textStyle = styles.badgeTextLow;
        break;
      case "action":
        badgeStyle = styles.badgeAction;
        textStyle = styles.badgeTextAction;
        break;
    }

    return (
      <View style={[styles.badge, badgeStyle]}>
        <Text style={[styles.badgeText, textStyle]}>{text}</Text>
      </View>
    );
  };

  const renderIcon = (item: FindingItem) => {
    const IconComponent = item.iconType === "feather" ? Feather : MaterialCommunityIcons;
    return (
      <View style={styles.iconBox}>
        <IconComponent name={item.iconName as any} size={18} color={item.iconColor} />
      </View>
    );
  };

  const renderFindingCard = (item: FindingItem, index: number) => {
    const isCritical = item.id === "risk-assessment";

    return (
      <Animated.View
        key={item.id}
        entering={FadeInDown.delay(100 + index * 50).duration(500)}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.findingCard,
            isCritical && styles.criticalCard,
          ]}
          onPress={() => {
            if (item.id === "exposed-emails") {
              router.push("/(report)/emails" as any);
            } else if (item.id === "phone-exposure") {
              router.push("/(report)/phone" as any);
            } else if (item.id === "public-addresses") {
              router.push("/(report)/addresses" as any);
            }
          }}
        >
          {renderIcon(item)}

          <View style={styles.cardContent}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.findingTitle} numberOfLines={1}>
                {item.title}
              </Text>
              {renderBadge(item.badgeType, item.badgeText)}
            </View>
            <Text style={styles.findingSubtitle} numberOfLines={2}>
              {item.subtitle}
            </Text>
          </View>

          <Feather name="chevron-right" size={16} color="#8E8E93" style={styles.chevron} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <View style={styles.headerLeft}>
          <Feather name="file-text" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>EXPOSURE REPORT</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>Privacy Exposure Report</Text>
          <Text style={styles.subtitle}>Generated today • Jan 24, 2024</Text>
        </Animated.View>

        {/* High Risk Live Analysis Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.liveAnalysisCard}>
          {/* Watermark Shield background */}
          <View style={styles.watermarkContainer}>
            <MaterialCommunityIcons name="shield-outline" size={76} color="rgba(255, 255, 255, 0.04)" />
          </View>

          <View style={styles.liveHeader}>
            <View style={styles.highRiskBadge}>
              <Feather name="alert-triangle" size={11} color="#FFFFFF" style={styles.warningIcon} />
              <Text style={styles.highRiskText}>HIGH RISK</Text>
            </View>
            <Text style={styles.liveAnalysisText}>LIVE ANALYSIS</Text>
          </View>

          <Text style={styles.liveTitle}>7 exposure findings detected</Text>
          <Text style={styles.liveDesc}>
            Your digital footprint is currently visible to malicious actors and data aggregators.
          </Text>
        </Animated.View>

        {/* Findings List */}
        <View style={styles.findingsList}>
          {FINDINGS_DATA.map((item, index) => renderFindingCard(item, index))}
        </View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.buttonContainer}>
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
  liveAnalysisCard: {
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
  liveHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  highRiskBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E63946",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  warningIcon: {
    marginRight: 4,
  },
  highRiskText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "System",
  },
  liveAnalysisText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  liveTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 8,
  },
  liveDesc: {
    color: "#8E8E93",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
  },
  findingsList: {
    marginBottom: 16,
  },
  findingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  criticalCard: {
    borderLeftWidth: 3.5,
    borderLeftColor: "#FF3B30",
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
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  findingTitle: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "600",
    fontFamily: "System",
    flex: 1,
    marginRight: 6,
  },
  findingSubtitle: {
    color: "#8E8E93",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "System",
  },
  chevron: {
    marginLeft: 4,
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
  badgeLow: {
    backgroundColor: "rgba(48, 209, 88, 0.15)",
  },
  badgeTextLow: {
    color: "#30D158",
  },
  badgeAction: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeTextAction: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 8,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 12,
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
