import React from "react";
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
import { Image } from "expo-image";

const { width } = Dimensions.get("window");

export default function PremiumScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)" as any);
    }
  };

  const perks = [
    "Start data removal requests",
    "Monitor new exposure every month",
    "Get alerts when new risks appear",
    "Add protection for family members",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.backButton, { top: insets.top > 0 ? insets.top + 4 : 12 }]}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PREMIUM</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Visual Centerpiece */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.centerpieceContainer}>
          {/* Faint Dotted Orbit Rings from Mockup */}
          <View style={styles.orbitRing1} />
          <View style={styles.orbitRing2} />

          <View style={styles.badgeCircle}>
            {/* Background Fingerprint */}
            <Image
              source={require("@/assets/images/app/fingerprint.png")}
              style={styles.fingerprintIcon}
              contentFit="contain"
            />
            {/* Center Shield Check Icon (directly aligned overlay) */}
            <View style={styles.shieldCenter}>
              <MaterialCommunityIcons name="shield-check" size={38} color="#FFFFFF" />
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
            Unlock guided removal requests and ongoing monthly monitoring.
          </Text>
        </Animated.View>

        {/* Warning Info Banner */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.infoBanner}>
          <Feather name="info" size={18} color="#FF9F0A" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Your free scan showed what's exposed. Upgrade to start cleanup and stay protected over time.
          </Text>
        </Animated.View>

        {/* Protection Plan Card */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.planCard}>
          {/* Card Title & Badge */}
          <View style={styles.planCardHeader}>
            <Text style={styles.planCardTitle}>Protection Plan</Text>
            <View style={styles.planCardBadge}>
              <Text style={styles.planCardBadgeText}>PREMIUM</Text>
            </View>
          </View>

          {/* Perks Bullets List */}
          <View style={styles.perksList}>
            {perks.map((perk, index) => (
              <View key={index} style={styles.perkItem}>
                <MaterialCommunityIcons name="check-circle" size={18} color="#30D158" style={styles.perkIcon} />
                <Text style={styles.perkText}>{perk}</Text>
              </View>
            ))}
          </View>

          {/* Card Divider */}
          <View style={styles.cardDivider} />

          {/* Billing Info Row */}
          <View style={styles.billingRow}>
            <View style={styles.billingRowLeft}>
              <Text style={styles.billingLabel}>ANNUAL BILLING</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceValue}>$8.99</Text>
                <Text style={styles.priceDuration}>/mo</Text>
              </View>
            </View>
            <Text style={styles.billingYearlyText}>Billed at $107.88/yr</Text>
          </View>
        </Animated.View>

        {/* Bottom Actions Section */}
        <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.footer}>
          {/* Primary Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace("/(tabs)" as any)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Start protection plan</Text>
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
    justifyContent: "center",
    backgroundColor: "#000000",
    paddingBottom: 16,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1E",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 8,
    padding: 12,
    zIndex: 10,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  centerpieceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    height: 180,
    width: "100%",
    overflow: "visible",
    position: "relative",
  },
  orbitRing1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderStyle: "dashed",
    zIndex: 1,
  },
  orbitRing2: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.02)",
    borderStyle: "dashed",
    zIndex: 1,
  },
  badgeCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(28, 28, 30, 0.45)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  fingerprintIcon: {
    width: 90,
    height: 90,
    tintColor: "rgba(255, 255, 255, 0.16)",
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
    borderColor: "#000000",
    zIndex: 4,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 8,
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
    paddingHorizontal: 16,
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(28, 28, 30, 0.45)",
    borderRadius: 14,
    padding: 16,
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  infoIcon: {
    marginRight: 14,
  },
  infoText: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
  },
  planCard: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    backgroundColor: "rgba(28, 28, 30, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginTop: 16,
  },
  planCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  planCardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "System",
  },
  planCardBadge: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  planCardBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  perksList: {
    width: "100%",
    marginBottom: 16,
  },
  perkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  perkIcon: {
    marginRight: 12,
  },
  perkText: {
    color: "#E5E5EA",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "System",
  },
  cardDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    marginBottom: 16,
  },
  billingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  billingRowLeft: {
    justifyContent: "center",
  },
  billingLabel: {
    color: "#8E8E93",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 4,
  },
  priceValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    fontFamily: "System",
  },
  priceDuration: {
    color: "#8E8E93",
    fontSize: 13,
    marginLeft: 2,
    marginBottom: 3,
    fontFamily: "System",
  },
  billingYearlyText: {
    color: "#8E8E93",
    fontSize: 12,
    marginBottom: 3,
    fontFamily: "System",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
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
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: "#8E8E93",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "System",
  },
});
