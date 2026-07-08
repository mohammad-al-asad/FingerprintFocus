import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Rect, Defs, RadialGradient, Stop } from "react-native-svg";
import { Image } from "expo-image";
import Header from "@/components/ui/Header";

const { width } = Dimensions.get("window");

const features = [
  {
    title: "Continuous fingerprint scans",
    description: "We continuously scan the web to uncover new exposure across hundreds of sites.",
  },
  {
    title: "24/7 identity monitoring",
    description: "Stay updated as your data appears, gets removed, or changes online.",
  },
  {
    title: "Data removal, handled for you",
    description: "We send and manage take-down requests to remove your information from broker sites.",
  },
  {
    title: "Identity theft recovery support",
    description: "Get step-by-step reports and guidance if your identity is compromised.",
  },
  {
    title: "Marketing and spam cleanup",
    description: "Reduce unwanted emails and outreach tied to your exposed data.",
  },
];



export default function PremiumScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleStartPlan = () => {
    router.replace("/(scan)" as any);
  };

  return (
    <LinearGradient colors={["#0C0C0E", "#030303"]} style={styles.container}>
      {/* Subtle Purple radial background glow */}
      <View style={styles.backgroundGlow}>
        <Svg height="100%" width="100%" viewBox="0 0 400 400">
          <Defs>
            <RadialGradient
              id="premiumGlow"
              cx="200"
              cy="200"
              rx="200"
              ry="200"
              fx="200"
              fy="200"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#BF5AF2" stopOpacity="0.08" />
              <Stop offset="60%" stopColor="#BF5AF2" stopOpacity="0.01" />
              <Stop offset="100%" stopColor="#BF5AF2" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="400" height="400" fill="url(#premiumGlow)" />
        </Svg>
      </View>

      <Header showBorder={true} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          {/* Visual Centerpiece */}
          <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.centerpieceContainer}>
            <View style={styles.orbitRing1} />
            <View style={styles.orbitRing2} />

            <View style={styles.badgeCircle}>
              {/* Background Fingerprint */}
              <MaterialCommunityIcons
                name="fingerprint"
                size={88}
                color="rgba(255, 255, 255, 0.08)"
                style={styles.fingerprintIcon}
              />
              {/* Center Shield Check Icon */}
              <View style={styles.shieldCenter}>
                <MaterialCommunityIcons name="shield-check" size={44} color="#FFFFFF" />
              </View>
              {/* Top-Right Green Check Badge */}
              <View style={styles.checkBadge}>
                <Feather name="check" size={12} color="#FFFFFF" />
              </View>
            </View>
          </Animated.View>

          {/* Text Headers */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.textContainer}>
            <Text style={styles.title}>Go beyond your free scan</Text>
            <Text style={styles.subtitle}>
              Stop data brokers from selling your digital identity. Gain proactive defense tools today.
            </Text>
          </Animated.View>

          {/* Warning Info Banner */}
          <Animated.View entering={FadeInDown.delay(250).duration(600)} style={styles.infoBanner}>
            <Feather name="info" size={18} color="#FF9F0A" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Your free scan showed what's exposed. Upgrade to start cleanup and stay protected over time.
            </Text>
          </Animated.View>

          {/* Identity Monitoring Card */}
          <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.planCard}>
            {/* Card Header Title & Badge */}
            <View style={styles.planCardHeader}>
              <View>
                <Text style={styles.planCardTitle}>Identity Monitoring</Text>
                <Text style={styles.planCardSubtitle}>Real-time exposure tracking</Text>
              </View>
              <View style={styles.planCardBadge}>
                <Text style={styles.planCardBadgeText}>PREMIUM</Text>
              </View>
            </View>

            {/* Perks list */}
            <View style={styles.perksList}>
              {features.map((feature, index) => (
                <View key={index} style={styles.perkItem}>
                  <Feather
                    name="check-circle"
                    size={18}
                    color="#30D158"
                    style={styles.perkIcon}
                  />
                  <View style={styles.perkContent}>
                    <Text style={styles.perkTitle}>{feature.title}</Text>
                    <Text style={styles.perkDesc}>{feature.description}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Plan 1: Monthly */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedPlan("monthly")}
              style={[
                styles.planSelectRow,
                selectedPlan === "monthly" && styles.planSelectRowActive,
              ]}
            >
              <View>
                <Text style={styles.planSelectTitle}>MONTHLY PLAN – FLEXIBLE</Text>
                <Text style={styles.planSelectPrice}>$9.99<Text style={styles.planPriceSub}>/month</Text></Text>
                <Text style={styles.planSelectSubtext}>Cancel anytime</Text>
              </View>
              <View style={styles.radioOuter}>
                {selectedPlan === "monthly" && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>

            {/* Plan 2: Annual */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedPlan("annual")}
              style={[
                styles.planSelectRow,
                selectedPlan === "annual" && styles.planSelectRowActive,
              ]}
            >
              <View>
                <Text style={styles.planSelectTitle}>ANNUAL PLAN – MOST POPULAR</Text>
                <Text style={styles.planSelectPrice}>$79.99<Text style={styles.planPriceSub}>/year</Text></Text>
                <Text style={styles.planSelectSubtext}>2 months free (save $40 vs monthly)</Text>
              </View>
              <View style={styles.radioOuter}>
                {selectedPlan === "annual" && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Rating laurels section */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.ratingSection}>
            <Image
              source={require("@/assets/images/flowerLeft.png")}
              style={styles.flowerImage}
              contentFit="contain"
            />
            <View style={styles.ratingContent}>
              <Text style={styles.ratingText}>Rated 4.9</Text>
              <Text style={styles.ratingSubtext}>by early users</Text>
              <View style={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <MaterialCommunityIcons key={i} name="star" size={16} color="#FFD60A" style={{ marginRight: 2 }} />
                ))}
              </View>
            </View>
            <Image
              source={require("@/assets/images/flowerRight.png")}
              style={styles.flowerImage}
              contentFit="contain"
            />
          </Animated.View>

          {/* Actions Footer */}
          <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleStartPlan}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Start Protection Plan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Not now, maybe later</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    flexGrow: 1,
  },
  body: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backgroundGlow: {
    position: "absolute",
    top: "5%",
    alignSelf: "center",
    width: 400,
    height: 400,
    zIndex: 0,
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
    zIndex: 10,
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
  centerpieceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 170,
    width: "100%",
    position: "relative",
    zIndex: 2,
  },
  orbitRing1: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderStyle: "dashed",
    zIndex: 1,
  },
  orbitRing2: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.02)",
    borderStyle: "dashed",
    zIndex: 1,
  },
  badgeCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(22, 22, 26, 0.6)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  fingerprintIcon: {
    position: "absolute",
    opacity: 0.9,
  },
  shieldCenter: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  checkBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#30D158",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0C0C0E",
    zIndex: 4,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 8,
    width: "100%",
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 32,
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14.5,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 21,
    fontFamily: "System",
    paddingHorizontal: 12,
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(22, 22, 26, 0.55)",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    zIndex: 2,
  },
  infoIcon: {
    marginRight: 14,
    marginTop: 2,
    alignSelf: "flex-start",
  },
  infoText: {
    flex: 1,
    color: "#A0A0A5",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
    fontWeight: "500",
  },
  planCard: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginTop: 16,
    zIndex: 2,
  },
  planCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    paddingBottom: 16,
  },
  planCardTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    fontFamily: "System",
  },
  planCardSubtitle: {
    color: "#8E8E93",
    fontSize: 12.5,
    fontWeight: "500",
    fontFamily: "System",
    marginTop: 2,
  },
  planCardBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  planCardBadgeText: {
    color: "#FFFFFF",
    fontSize: 9.5,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  perksList: {
    width: "100%",
    marginBottom: 20,
  },
  perkItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  perkIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  perkContent: {
    flex: 1,
  },
  perkTitle: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  perkDesc: {
    color: "#A0A0A5",
    fontSize: 13,
    lineHeight: 17,
    fontFamily: "System",
    marginTop: 2,
    fontWeight: "500",
  },
  planSelectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  planSelectRowActive: {
    borderColor: "#BF5AF2",
    backgroundColor: "rgba(191, 90, 242, 0.04)",
  },
  planSelectTitle: {
    color: "#A0A0A5",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  planSelectPrice: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "System",
    marginTop: 4,
  },
  planPriceSub: {
    fontSize: 13.5,
    fontWeight: "500",
    color: "#8E8E93",
  },
  planSelectSubtext: {
    color: "#8E8E93",
    fontSize: 12.5,
    fontFamily: "System",
    marginTop: 4,
    fontWeight: "500",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#BF5AF2",
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 28,
    zIndex: 2,
  },
  flowerImage: {
    width: 28,
    height: 60,
  },
  ratingContent: {
    alignItems: "center",
    marginHorizontal: 16,
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "System",
  },
  ratingSubtext: {
    color: "#8E8E93",
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "System",
    marginTop: 2,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
    zIndex: 2,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
  secondaryButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
  },
});

