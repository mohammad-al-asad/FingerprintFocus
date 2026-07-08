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
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "@/components/ui/Header";

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
    subtitle: "Your personal email was found in 1 public database.",
    badgeText: "HIGH",
    badgeType: "high",
  },
  {
    id: "ssn-exposure",
    iconName: "shield",
    iconType: "feather",
    iconColor: "#FF453A",
    title: "Social Security Number",
    subtitle: "Your SSN may have been exposed in a recent data breach.",
    badgeText: "HIGH",
    badgeType: "high",
  },
  {
    id: "public-addresses",
    iconName: "map-pin",
    iconType: "feather",
    iconColor: "#FFD60A",
    title: "Public Addresses",
    subtitle: "Your current and previous addresses were listed on 4 sites.",
    badgeText: "MEDIUM",
    badgeType: "medium",
  },
  {
    id: "phone-exposure",
    iconName: "smartphone",
    iconType: "feather",
    iconColor: "#FFD60A",
    title: "Phone Number Exposure",
    subtitle: "Your mobile number was linked to public records.",
    badgeText: "MEDIUM",
    badgeType: "medium",
  },
  {
    id: "relative-info",
    iconName: "users",
    iconType: "feather",
    iconColor: "#30D158",
    title: "Family Member Information",
    subtitle: "Contact details for immediate family members were found online.",
    badgeText: "LOW",
    badgeType: "low",
  },
  {
    id: "breach-history",
    iconName: "rss",
    iconType: "feather",
    iconColor: "#FF453A",
    title: "Data Breach History",
    subtitle: "1 set of login credential was found in a recent data breach.",
    badgeText: "HIGH",
    badgeType: "high",
  },
  {
    id: "broker-profiles",
    iconName: "trending-up",
    iconType: "feather",
    iconColor: "#FF453A",
    title: "Broker Profiles",
    subtitle: "Profiles linked to your information were found on major data broker sites.",
    badgeText: "HIGH",
    badgeType: "high",
  },
  {
    id: "risk-assessment",
    iconName: "alert-circle",
    iconType: "feather",
    iconColor: "#FF453A",
    title: "Risk Assessment: Critical",
    subtitle: "Recommended action to secure your identity.",
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
        entering={FadeInDown.delay(100 + index * 40).duration(500)}
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
      {/* Header same as Home */}
      <Header
        showBorder={true}
        rightElement={
          <TouchableOpacity
            style={styles.avatarButton}
            activeOpacity={0.7}
          >
            <Image
              source="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              style={styles.avatar}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>Privacy Exposure Report</Text>
          <Text style={styles.subtitle}>Generated today • Jan 24, 2024</Text>
        </Animated.View>

        {/* Live Analysis Card */}
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

          <Text style={styles.liveTitle}>7 exposures detected</Text>
          <Text style={styles.liveDesc}>
            Your digital fingerprint is currently visible to malicious actors and data aggregators.
          </Text>
        </Animated.View>

        {/* Findings List */}
        <View style={styles.findingsList}>
          {FINDINGS_DATA.map((item, index) => renderFindingCard(item, index))}
        </View> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  avatarButton: {
    paddingLeft: 16,
    paddingVertical: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
    fontSize: 14,
    fontFamily: "System",
    fontWeight: "500",
  },
  liveAnalysisCard: {
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  watermarkContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
    opacity: 0.05,
  },
  liveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  highRiskBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    borderRadius: 12,
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
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 1.2,
    fontFamily: "System",
  },
  liveTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "System",
    marginBottom: 8,
  },
  liveDesc: {
    color: "#A0A0A5",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
    fontWeight: "500",
  },
  findingsList: {
    width: "100%",
    marginBottom: 16,
  },
  findingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(22, 22, 26, 0.45)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    height: 76,
  },
  criticalCard: {
    borderLeftWidth: 3,
    borderLeftColor: "#FF3B30",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
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
    fontWeight: "800",
    fontFamily: "System",
    flex: 1,
    marginRight: 8,
  },
  findingSubtitle: {
    color: "#8E8E93",
    fontSize: 12.5,
    fontFamily: "System",
    fontWeight: "500",
  },
  chevron: {
    marginLeft: 8,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeHigh: {
    backgroundColor: "rgba(255, 69, 58, 0.12)",
  },
  badgeMedium: {
    backgroundColor: "rgba(255, 214, 10, 0.12)",
  },
  badgeLow: {
    backgroundColor: "rgba(48, 209, 88, 0.12)",
  },
  badgeAction: {
    backgroundColor: "#FF3B30",
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "800",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  badgeTextHigh: {
    color: "#FF453A",
  },
  badgeTextMedium: {
    color: "#FFD60A",
  },
  badgeTextLow: {
    color: "#30D158",
  },
  badgeTextAction: {
    color: "#FFFFFF",
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
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
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
