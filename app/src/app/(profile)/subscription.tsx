import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp, Layout } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function SubscriptionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSubscribed, setIsSubscribed] = useState(true);

  const handleManageBilling = () => {
    Alert.alert("Manage Billing", "Redirecting to subscription portal...");
  };

  const handleUpgrade = () => {
    Alert.alert("Upgrade", "Processing premium upgrade request...", [
      { text: "OK", onPress: () => setIsSubscribed(true) },
    ]);
  };

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
        
        {/* Toggle Subscription State (Demo cycle icon on the right) */}
        <TouchableOpacity
          onPress={() => setIsSubscribed((prev) => !prev)}
          style={styles.toggleButton}
          activeOpacity={0.7}
        >
          <Feather name="refresh-cw" size={16} color="#FFFFFF" style={{ opacity: 0.6 }} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {isSubscribed ? (
          /* ================= SUBSCRIBED LAYOUT ================= */
          <Animated.View entering={FadeInDown.duration(500)} style={{ width: "100%" }}>
            {/* Title Section */}
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>Subscription</Text>
              <Text style={styles.subtitle}>Manage your security tier and billing cycles.</Text>
            </View>

            {/* Active Plan Card */}
            <View style={styles.planCard}>
              <View style={styles.planCardHeader}>
                <View style={styles.activePlanBadge}>
                  <Text style={styles.activePlanBadgeText}>ACTIVE PLAN</Text>
                </View>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Active</Text>
                </View>
              </View>

              <Text style={styles.planTitle}>Premium Monitoring</Text>

              <View style={styles.billingGrid}>
                <View style={styles.gridColumn}>
                  <Text style={styles.gridLabel}>BILLING</Text>
                  <Text style={styles.gridValue}>Monthly</Text>
                </View>
                <View style={styles.gridColumn}>
                  <Text style={styles.gridLabel}>NEXT BILL</Text>
                  <Text style={styles.gridValue}>May 28</Text>
                </View>
              </View>

              <Text style={styles.includedFeaturesHeader}>INCLUDED FEATURES</Text>
              
              <View style={styles.featureList}>
                <View style={styles.featureItemRow}>
                  <Feather name="check" size={14} color="#8E8E93" style={styles.grayCheckIcon} />
                  <Text style={styles.featureItemText}>Full exposure report</Text>
                </View>
                <View style={styles.featureItemRow}>
                  <Feather name="check" size={14} color="#8E8E93" style={styles.grayCheckIcon} />
                  <Text style={styles.featureItemText}>Monthly monitoring</Text>
                </View>
                <View style={styles.featureItemRow}>
                  <Feather name="check" size={14} color="#8E8E93" style={styles.grayCheckIcon} />
                  <Text style={styles.featureItemText}>Reappearance alerts</Text>
                </View>
                <View style={styles.featureItemRow}>
                  <Feather name="check" size={14} color="#8E8E93" style={styles.grayCheckIcon} />
                  <Text style={styles.featureItemText}>Supported remove request assistance</Text>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.manageBillingButton}
                onPress={handleManageBilling}
              >
                <Text style={styles.manageBillingButtonText}>Manage Billing</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Invoices Section */}
            <View style={styles.invoicesSection}>
              <Text style={styles.sectionHeaderTitle}>RECENT INVOICES</Text>
              
              <View style={styles.invoicesCard}>
                {/* Invoice 1 */}
                <View style={styles.invoiceRow}>
                  <View style={styles.invoiceLeft}>
                    <View style={styles.invoiceIconBox}>
                      <Feather name="file-text" size={16} color="#FFFFFF" />
                    </View>
                    <View>
                      <Text style={styles.invoiceDate}>April 28, 2024</Text>
                      <Text style={styles.invoiceId}>INV-82910</Text>
                    </View>
                  </View>
                  <Text style={styles.invoicePrice}>$29.00</Text>
                </View>

                <View style={styles.divider} />

                {/* Invoice 2 */}
                <View style={styles.invoiceRow}>
                  <View style={styles.invoiceLeft}>
                    <View style={styles.invoiceIconBox}>
                      <Feather name="file-text" size={16} color="#FFFFFF" />
                    </View>
                    <View>
                      <Text style={styles.invoiceDate}>March 28, 2024</Text>
                      <Text style={styles.invoiceId}>INV-74122</Text>
                    </View>
                  </View>
                  <Text style={styles.invoicePrice}>$29.00</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        ) : (
          /* ================= NON-SUBSCRIBED LAYOUT ================= */
          <Animated.View entering={FadeInDown.duration(500)} style={{ width: "100%" }}>
            {/* Title Section */}
            <View style={styles.titleSectionCenter}>
              <View style={styles.upgradeBadge}>
                <Feather name="shield" size={11} color="#FF9F0A" style={{ marginRight: 5 }} />
                <Text style={styles.upgradeBadgeText}>UPGRADE PROTECTION</Text>
              </View>
              <Text style={styles.mainTitleCenter}>Unlock full privacy monitoring</Text>
              <Text style={styles.subtitleCenter}>
                Stop data brokers from selling your digital identity. Gain proactive defense tools today.
              </Text>
            </View>

            {/* Premium Plan Offer Card */}
            <View style={styles.offerCard}>
              <View style={styles.offerHeaderRow}>
                <View>
                  <Text style={styles.offerTitle}>Premium Monitoring</Text>
                  <Text style={styles.offerSubtitle}>Annual protection engine</Text>
                </View>
                <View style={styles.offerPriceContainer}>
                  <Text style={styles.offerPrice}>$9.99</Text>
                  <Text style={styles.offerPricePeriod}>/mo</Text>
                </View>
              </View>

              <View style={styles.offerFeatureList}>
                {/* Feature 1 */}
                <View style={styles.offerFeatureRow}>
                  <Feather name="check-circle" size={16} color="#30D158" style={styles.greenCheckIcon} />
                  <View style={styles.offerFeatureTextContainer}>
                    <Text style={styles.offerFeatureTitle}>Full report</Text>
                    <Text style={styles.offerFeatureDesc}>Comprehensive exposure mapping across 200+ sites</Text>
                  </View>
                </View>

                {/* Feature 2 */}
                <View style={styles.offerFeatureRow}>
                  <Feather name="check-circle" size={16} color="#30D158" style={styles.greenCheckIcon} />
                  <View style={styles.offerFeatureTextContainer}>
                    <Text style={styles.offerFeatureTitle}>Monthly rescans</Text>
                    <Text style={styles.offerFeatureDesc}>Continuous vigilance for new data leaks</Text>
                  </View>
                </View>

                {/* Feature 3 */}
                <View style={styles.offerFeatureRow}>
                  <Feather name="check-circle" size={16} color="#30D158" style={styles.greenCheckIcon} />
                  <View style={styles.offerFeatureTextContainer}>
                    <Text style={styles.offerFeatureTitle}>Reappearance alerts</Text>
                    <Text style={styles.offerFeatureDesc}>Immediate notification if your data resurfaces</Text>
                  </View>
                </View>

                {/* Feature 4 */}
                <View style={styles.offerFeatureRow}>
                  <Feather name="check-circle" size={16} color="#30D158" style={styles.greenCheckIcon} />
                  <View style={styles.offerFeatureTextContainer}>
                    <Text style={styles.offerFeatureTitle}>Remove request assistance</Text>
                    <Text style={styles.offerFeatureDesc}>Automated takedown requests for your info</Text>
                  </View>
                </View>

                {/* Feature 5 */}
                <View style={styles.offerFeatureRow}>
                  <Feather name="check-circle" size={16} color="#30D158" style={styles.greenCheckIcon} />
                  <View style={styles.offerFeatureTextContainer}>
                    <Text style={styles.offerFeatureTitle}>FTC/IC3 preparation</Text>
                    <Text style={styles.offerFeatureDesc}>Legal documentation for identity theft reports</Text>
                  </View>
                </View>
              </View>

              <View style={styles.offerDivider} />

              <View style={styles.securityLiftRow}>
                <View>
                  <Text style={styles.securityLiftLabel}>SECURITY LIFT</Text>
                  <Text style={styles.securityLiftValue}>+85%</Text>
                </View>
                <View style={styles.securityLiftProgressContainer}>
                  <View style={styles.securityLiftProgressBg}>
                    <View style={[styles.securityLiftProgressFill, { width: "85%" }]} />
                  </View>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.offerButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.primaryButton}
                onPress={handleUpgrade}
              >
                <Text style={styles.primaryButtonText}>UPGRADE NOW</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.outlineButton}
                onPress={() => router.back()}
              >
                <Text style={styles.outlineButtonText}>MAYBE LATER</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
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
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  titleSection: {
    marginBottom: 24,
  },
  titleSectionCenter: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  upgradeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 159, 10, 0.08)",
    borderColor: "rgba(255, 159, 10, 0.15)",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  upgradeBadgeText: {
    color: "#FF9F0A",
    fontSize: 9.5,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 4,
  },
  mainTitleCenter: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "System",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 13.5,
    fontFamily: "System",
  },
  subtitleCenter: {
    color: "#8E8E93",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  
  /* Subscribed View Styles */
  planCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  planCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  activePlanBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  activePlanBadgeText: {
    color: "#8E8E93",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "System",
  },
  statusRow: {
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
  statusText: {
    color: "#30D158",
    fontSize: 12.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  planTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 20,
  },
  billingGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    fontSize: 13.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  includedFeaturesHeader: {
    color: "#8E8E93",
    fontSize: 9.5,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
    marginBottom: 12,
  },
  featureList: {
    marginBottom: 24,
  },
  featureItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  grayCheckIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  featureItemText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
    flex: 1,
  },
  manageBillingButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  manageBillingButtonText: {
    color: "#000000",
    fontSize: 12.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  invoicesSection: {
    marginBottom: 12,
  },
  sectionHeaderTitle: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    fontFamily: "System",
    marginBottom: 12,
  },
  invoicesCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  invoiceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  invoiceLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  invoiceIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  invoiceDate: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 1,
  },
  invoiceId: {
    color: "#8E8E93",
    fontSize: 11,
    fontFamily: "System",
  },
  invoicePrice: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  divider: {
    height: 1,
    backgroundColor: "#1C1C1E",
  },

  /* Non-Subscribed View Styles */
  offerCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  offerHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  offerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 4,
  },
  offerSubtitle: {
    color: "#8E8E93",
    fontSize: 12.5,
    fontFamily: "System",
  },
  offerPriceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  offerPrice: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "System",
    lineHeight: 28,
  },
  offerPricePeriod: {
    color: "#8E8E93",
    fontSize: 11.5,
    fontFamily: "System",
    marginLeft: 2,
    marginBottom: 3,
  },
  offerFeatureList: {
    marginBottom: 16,
  },
  offerFeatureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  greenCheckIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  offerFeatureTextContainer: {
    flex: 1,
  },
  offerFeatureTitle: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 2,
  },
  offerFeatureDesc: {
    color: "#8E8E93",
    fontSize: 11,
    lineHeight: 15,
    fontFamily: "System",
  },
  offerDivider: {
    height: 1,
    backgroundColor: "#1C1C1E",
    marginVertical: 12,
  },
  securityLiftRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  securityLiftLabel: {
    color: "#8E8E93",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "System",
    marginBottom: 2,
  },
  securityLiftValue: {
    color: "#30D158",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "System",
  },
  securityLiftProgressContainer: {
    flex: 1,
    marginLeft: 24,
    alignItems: "flex-end",
  },
  securityLiftProgressBg: {
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 1.5,
    width: "80%",
  },
  securityLiftProgressFill: {
    height: "100%",
    backgroundColor: "#30D158",
    borderRadius: 1.5,
  },
  offerButtonContainer: {
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#3E3E42",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  outlineButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
});
