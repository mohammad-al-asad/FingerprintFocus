import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

type CurrentPlanType = "monthly" | "yearly" | "unknown" | "none";

export default function SubscriptionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [currentPlanType, setCurrentPlanType] = useState<CurrentPlanType>("monthly");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const cyclePlanType = () => {
    setCurrentPlanType((prev) => {
      if (prev === "none") return "monthly";
      if (prev === "monthly") return "yearly";
      if (prev === "yearly") return "unknown";
      return "none";
    });
  };

  const handleUpgradeToYearly = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      setCurrentPlanType("yearly");
      Alert.alert("Subscription Updated", "Your yearly plan is now active.");
    }, 1000);
  };

  const handleUpgradeToMonthly = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      setCurrentPlanType("monthly");
      Alert.alert("Subscription Updated", "Your monthly plan is now active.");
    }, 1000);
  };

  const handleRestore = () => {
    setIsRestoring(true);
    setTimeout(() => {
      setIsRestoring(false);
      setCurrentPlanType("yearly");
      Alert.alert("Restore Success", "Your active membership has been successfully restored.");
    }, 1000);
  };

  const handleManageSubscription = () => {
    const url = Platform.OS === "ios"
      ? "https://apps.apple.com/account/subscriptions"
      : "https://play.google.com/store/account/subscriptions";
    
    Linking.openURL(url).catch(() => {
      Alert.alert(
        "Store Unavailable",
        "Could not open store settings automatically. Please manage your subscription within your device system settings."
      );
    });
  };

  // Dynamic Content Memoizers
  const activePlanTitle = useMemo(() => {
    if (currentPlanType === "none") return "No Active Plan";
    if (currentPlanType === "yearly") return "Premium Yearly Plan";
    if (currentPlanType === "monthly") return "Premium Monthly Plan";
    return "Premium Active Plan";
  }, [currentPlanType]);

  const activePlanCadence = useMemo(() => {
    if (currentPlanType === "none") return "Free Scan Mode";
    if (currentPlanType === "monthly") return "Monthly billing";
    if (currentPlanType === "yearly") return "Yearly billing";
    return "Store managed";
  }, [currentPlanType]);

  const activePlanPrice = useMemo(() => {
    if (currentPlanType === "none") return "Free";
    if (currentPlanType === "monthly") return "$9.99";
    if (currentPlanType === "yearly") return "$79.99";
    return "Managed";
  }, [currentPlanType]);

  const activePlanPeriod = useMemo(() => {
    if (currentPlanType === "monthly") return "/mo";
    if (currentPlanType === "yearly") return "/yr";
    return "";
  }, [currentPlanType]);

  const nextBilling = useMemo(() => {
    if (currentPlanType === "none") return "Not available";
    if (currentPlanType === "monthly") return "May 28, 2026";
    if (currentPlanType === "yearly") return "April 28, 2027";
    return "Store controlled";
  }, [currentPlanType]);

  const renewalStatus = useMemo(() => {
    if (currentPlanType === "none") return "Inactive";
    if (currentPlanType === "unknown") return "Store managed";
    return "Renews automatically";
  }, [currentPlanType]);

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
        <Text style={styles.headerTitle}>SUBSCRIPTION</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 },
        ]}
      >
        {/* Active Plan Card */}
        <Animated.View
          entering={FadeInUp.delay(50).duration(600)}
          style={styles.activeCard}
        >
          <View style={styles.activeCardContent}>
            <View style={styles.activeCardHeaderRow}>
              <View style={styles.activePlanBadge}>
                <Text style={styles.activePlanBadgeText}>
                  {currentPlanType === "none" ? "FREE ACCOUNT" : "ACTIVE PLAN"}
                </Text>
              </View>
              <View style={styles.starCircle}>
                <Feather name="award" size={18} color="#FFFFFF" />
              </View>
            </View>

            <Text style={styles.activePlanTitle}>{activePlanTitle}</Text>
            <Text style={styles.activePlanCadence}>{activePlanCadence}</Text>

            <View style={styles.activePriceBlock}>
              <Text style={styles.activePriceLabel}>CURRENT PRICE</Text>
              <View style={styles.activePriceRow}>
                <Text style={styles.activePriceText}>{activePlanPrice}</Text>
                {!!activePlanPeriod && (
                  <Text style={styles.activePricePeriod}>{activePlanPeriod}</Text>
                )}
              </View>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.activeDetailsGrid}>
              <View style={styles.activeDetailItem}>
                <Text style={styles.activeDetailLabel}>NEXT BILLING</Text>
                <Text style={styles.activeDetailValue}>{nextBilling}</Text>
              </View>

              <View style={styles.activeDetailItem}>
                <Text style={styles.activeDetailLabel}>RENEWAL</Text>
                <Text style={styles.activeDetailValue}>{renewalStatus}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Plan Options Section */}
        {currentPlanType === "none" && (
          <Animated.View entering={FadeInDown.delay(100).duration(600)}>
            <Text style={styles.sectionHeader}>Available Plans</Text>

            {/* Option 1: Monthly */}
            <TouchableOpacity
              style={styles.optionCard}
              activeOpacity={0.85}
              onPress={handleUpgradeToMonthly}
              disabled={isUpgrading}
            >
              <View style={styles.optionHeaderRow}>
                <Text style={styles.optionPlanName}>Monthly Protection Plan</Text>
                <Text style={styles.optionPlanPrice}>
                  $9.99<Text style={styles.pricePeriod}>/mo</Text>
                </Text>
              </View>
              <Text style={styles.optionPlanDescription}>
                Continuous monitoring for data leaks with reappearance alerts and removal request assistance.
              </Text>
              <View style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>
                  {isUpgrading ? "Processing..." : "Select Monthly Plan"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Option 2: Yearly */}
            <TouchableOpacity
              style={styles.optionCard}
              activeOpacity={0.85}
              onPress={handleUpgradeToYearly}
              disabled={isUpgrading}
            >
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>BEST VALUE</Text>
              </View>
              <View style={styles.optionHeaderRow}>
                <Text style={styles.optionPlanName}>Annual Protection Plan</Text>
                <Text style={styles.optionPlanPrice}>
                  $79.99<Text style={styles.pricePeriod}>/yr</Text>
                </Text>
              </View>
              <Text style={styles.optionPlanDescription}>
                Full yearly coverage. Save over 30% compared to the monthly plan. Cancels anytime.
              </Text>
              <View style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>
                  {isUpgrading ? "Processing..." : "Select Annual Plan"}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}

        {currentPlanType === "monthly" && (
          <Animated.View entering={FadeInDown.delay(100).duration(600)}>
            <Text style={styles.sectionHeader}>Upgrade Available</Text>

            <TouchableOpacity
              style={styles.optionCard}
              activeOpacity={0.85}
              onPress={handleUpgradeToYearly}
              disabled={isUpgrading}
            >
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>BEST VALUE</Text>
              </View>
              <View style={styles.optionHeaderRow}>
                <Text style={styles.optionPlanName}>Upgrade to Yearly</Text>
                <Text style={styles.optionPlanPrice}>
                  $79.99<Text style={styles.pricePeriod}>/yr</Text>
                </Text>
              </View>
              <Text style={styles.optionPlanDescription}>
                Switch from monthly to yearly billing. Save over 30% and receive uninterrupted protection.
              </Text>
              <View style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>
                  {isUpgrading ? "Upgrading..." : "Upgrade to Yearly"}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}

        {currentPlanType === "yearly" && (
          <Animated.View entering={FadeInDown.delay(100).duration(600)}>
            <Text style={styles.sectionHeader}>Plan Options</Text>
            <View style={styles.infoCard}>
              <Feather name="check-circle" size={18} color="#30D158" />
              <Text style={styles.infoCardText}>
                You are already on the best plan with the best value.
              </Text>
            </View>
          </Animated.View>
        )}

        {currentPlanType === "unknown" && (
          <Animated.View entering={FadeInDown.delay(100).duration(600)}>
            <Text style={styles.sectionHeader}>Plan Options</Text>
            <View style={styles.infoCard}>
              <Feather name="info" size={18} color="#0A84FF" />
              <Text style={styles.infoCardText}>
                Your active plan is managed by the app store. Use Manage Subscription to make changes.
              </Text>
            </View>
          </Animated.View>
        )}

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(150).duration(600)} style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.restoreBtn}
            activeOpacity={0.8}
            onPress={handleRestore}
            disabled={isRestoring}
          >
            <Text style={styles.restoreBtnText}>
              {isRestoring ? "Restoring..." : "Restore Purchase"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.manageBtn}
            activeOpacity={0.8}
            onPress={handleManageSubscription}
          >
            <Text style={styles.manageBtnText}>Manage Subscription</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Legal Info and Links */}
        <Text style={styles.legalText}>
          Payments will be charged to your store account at confirmation of purchase. Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period. You can manage or cancel your subscription at any time in your store account settings.
        </Text>

        <View style={styles.footerLinksRow}>
          <TouchableOpacity onPress={() => router.push("/(profile)/privacy?type=privacy" as any)}>
            <Text style={styles.footerLinkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>•</Text>
          <TouchableOpacity onPress={() => router.push("/(profile)/privacy?type=terms" as any)}>
            <Text style={styles.footerLinkText}>Terms of Use</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  activeCard: {
    borderRadius: 16,
    marginBottom: 24,
    overflow: "hidden",
    backgroundColor: "#121214",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  activeCardContent: {
    flex: 1,
    padding: 20,
  },
  activeCardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  activePlanBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activePlanBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  starCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  activePlanTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    fontFamily: "System",
    marginBottom: 4,
  },
  activePlanCadence: {
    color: "#8E8E93",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 16,
  },
  activePriceBlock: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  activePriceLabel: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  activePriceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  activePriceText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1,
  },
  activePricePeriod: {
    color: "#8E8E93",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 4,
    marginBottom: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    marginVertical: 14,
  },
  activeDetailsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  activeDetailItem: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  activeDetailLabel: {
    color: "#8E8E93",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  activeDetailValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 14,
    marginBottom: 12,
  },
  optionCard: {
    backgroundColor: "#121214",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 16,
    position: "relative",
  },
  currentBadge: {
    position: "absolute",
    top: -10,
    right: 15,
    backgroundColor: "#30D158",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  currentBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  optionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  optionPlanName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  optionPlanPrice: {
    fontSize: 19,
    fontWeight: "800",
    color: "#30D158",
  },
  pricePeriod: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8E8E93",
  },
  optionPlanDescription: {
    fontSize: 13.5,
    color: "#8E8E93",
    lineHeight: 19,
  },
  upgradeButton: {
    height: 46,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  upgradeButtonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "800",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121214",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 14,
  },
  infoCardText: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    marginLeft: 12,
  },
  actionContainer: {
    marginTop: 12,
    marginBottom: 24,
    gap: 12,
  },
  restoreBtn: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "#121214",
    justifyContent: "center",
    alignItems: "center",
  },
  restoreBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  manageBtn: {
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  manageBtnText: {
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  legalText: {
    fontSize: 12,
    color: "#8E8E93",
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  footerLinksRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  footerLinkText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  footerDot: {
    fontSize: 12,
    color: "#8E8E93",
  },
});
