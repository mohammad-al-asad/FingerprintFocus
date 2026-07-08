import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  FadeInDown,
} from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Rect, Defs, RadialGradient, Stop } from "react-native-svg";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

export default function FreeScanResult() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Glow pulsing animation
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    glowScale.value = withRepeat(
      withTiming(1.1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    glowOpacity.value = withRepeat(
      withTiming(0.6, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedGlowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: glowOpacity.value,
  }));

  const detailedPreviews = [
    {
      id: "name",
      icon: "user",
      color: "#FF453A",
      text: "Your full name and age range appear on multiple sites",
    },
    {
      id: "address",
      icon: "map-pin",
      color: "#FF453A",
      text: "Past addresses may be publicly visible",
    },
    {
      id: "phone",
      icon: "smartphone",
      color: "#FF9F0A",
      text: "Your phone number may be linked to broker profiles",
    },
    {
      id: "family",
      icon: "users",
      color: "#FF9F0A",
      text: "Your family, friends, and associate links may be exposed",
    },
    {
      id: "remove",
      icon: "shield",
      color: "#30D158",
      text: "Personalized data removal steps for you",
    },
  ];

  const rightHeaderClose = (
    <TouchableOpacity
      onPress={() => router.back()}
      style={styles.closeButton}
      activeOpacity={0.7}
    >
      <Feather name="x" size={20} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#0C0C0E", "#030303"]} style={styles.container}>
      {/* Background Animated SVG Glow Orb (Neon Red) */}
      <Animated.View style={[styles.backgroundGlow, animatedGlowStyle]}>
        <Svg height="100%" width="100%" viewBox="0 0 400 400">
          <Defs>
            <RadialGradient
              id="resultGlow"
              cx="200"
              cy="200"
              rx="200"
              ry="200"
              fx="200"
              fy="200"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#FF453A" stopOpacity="0.12" />
              <Stop offset="60%" stopColor="#FF453A" stopOpacity="0.02" />
              <Stop offset="100%" stopColor="#FF453A" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="400" height="400" fill="url(#resultGlow)" />
        </Svg>
      </Animated.View>

      <Header showBorder={false} transparent={true} rightElement={rightHeaderClose} />

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
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Image
                  source={require("@/assets/images/app/fingerprint.png")}
                  style={styles.fingerprintImage}
                  contentFit="contain"
                />
              </View>

              {/* Alert Badge at bottom right of outer circle */}
              <View style={styles.alertBadge}>
                <Feather name="alert-triangle" size={12} color="#FFFFFF" />
              </View>
            </View>
          </Animated.View>

          {/* Title Header */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.textContainer}>
            <Text style={styles.title}>Your fingerprint scan found exposed data</Text>
            <Text style={styles.subtitle}>
              Your personal information is exposed on people-search and broker sites, making it easier for spammers, scammers, or stalkers to find you. Now let's start protecting your digital identity.
            </Text>
          </Animated.View>

          {/* Summary Cards Section */}
          <View style={styles.cardsContainer}>
            {/* Card 1: Full Width Exposed Profiles */}
            <Animated.View
              entering={FadeInDown.delay(300).duration(600)}
              style={[styles.fullWidthCard, styles.criticalCard]}
            >
              <Feather name="users" size={20} color="#FF453A" style={styles.cardIcon} />
              <View style={styles.fullWidthCardContent}>
                <Text style={styles.cardLabelRed}>EXPOSED PROFILES</Text>
                <Text style={styles.cardValueLarge}>4</Text>
                <Text style={styles.cardSubText}>Broker listings found with your information</Text>
              </View>
            </Animated.View>

            {/* Row with two half cards */}
            <View style={styles.row}>
              {/* Card 2: High-Risk (Left) */}
              <Animated.View
                entering={FadeInDown.delay(400).duration(600)}
                style={[styles.halfCard, styles.criticalCard]}
              >
                <Text style={styles.cardLabelRed}>HIGH-RISK</Text>
                <Text style={styles.cardValue}>8</Text>
                <Text style={styles.cardSubText}>High-risk findings</Text>
              </Animated.View>

              {/* Card 3: Removals (Right) */}
              <Animated.View
                entering={FadeInDown.delay(500).duration(600)}
                style={[styles.halfCard, styles.successCard]}
              >
                <Text style={styles.cardLabelGreen}>REMOVALS</Text>
                <Text style={styles.cardValue}>12</Text>
                <Text style={styles.cardSubText}>Data removal opportunities</Text>
              </Animated.View>
            </View>
          </View>

          {/* Detailed Preview Section Header */}
          <Animated.View entering={FadeInDown.delay(550).duration(600)} style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>DETAILED PREVIEW</Text>
            <View style={styles.sectionHeaderLine} />
          </Animated.View>

          {/* Detailed Rows List */}
          <View style={styles.detailsList}>
            {detailedPreviews.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(600 + index * 80).duration(500)}
                style={styles.detailRow}
              >
                {/* Left Color Accent Bar */}
                <View style={[styles.accentBar, { backgroundColor: item.color }]} />

                {/* Row Content */}
                <View style={styles.detailRowContent}>
                  <Feather
                    name={item.icon as any}
                    size={16}
                    color={item.color}
                    style={styles.detailRowIcon}
                  />
                  <Text style={styles.detailRowText}>{item.text}</Text>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* Bottom Actions Section */}
          <Animated.View entering={FadeInDown.delay(1000).duration(600)} style={styles.footer}>
            {/* Save My Results */}
            <Button
              title="Save My Results"
              onPress={() => router.replace("/(freeScan)/create-accoutn" as any)}
              style={styles.primaryButton}
            />

            {/* Maybe Later */}
            <Button
              title="Maybe Later"
              onPress={() => router.replace("/(auth)/signin" as any)}
              variant="secondary"
              style={styles.secondaryButton}
            />
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  backgroundGlow: {
    position: "absolute",
    top: "10%",
    alignSelf: "center",
    width: 400,
    height: 400,
    zIndex: 0,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(28, 28, 30, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  centerpieceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 170,
    width: 170,
    position: "relative",
    zIndex: 2,
  },
  outerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: "rgba(255, 69, 58, 0.25)",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  innerCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 1,
    borderColor: "rgba(255, 69, 58, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(22, 22, 26, 0.8)",
  },
  fingerprintImage: {
    width: 58,
    height: 58,
    tintColor: "#FF453A",
  },
  alertBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FF453A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0C0C0E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 24,
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
    color: "#A0A0A5",
    textAlign: "center",
    lineHeight: 21,
    fontFamily: "System",
  },
  cardsContainer: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 24,
    zIndex: 2,
  },
  fullWidthCard: {
    width: "100%",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  fullWidthCardContent: {
    marginLeft: 14,
    flex: 1,
  },
  cardIcon: {
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  halfCard: {
    width: "48.5%",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  criticalCard: {
    borderColor: "rgba(255, 69, 58, 0.15)",
  },
  successCard: {
    borderColor: "rgba(48, 209, 88, 0.15)",
  },
  cardLabelRed: {
    color: "#FF453A",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "System",
  },
  cardLabelGreen: {
    color: "#30D158",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "System",
  },
  cardValueLarge: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 2,
    fontFamily: "System",
    lineHeight: 38,
  },
  cardValue: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
    fontFamily: "System",
    lineHeight: 34,
  },
  cardSubText: {
    color: "#8E8E93",
    fontSize: 11.5,
    marginTop: 4,
    fontFamily: "System",
    lineHeight: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 28,
    marginBottom: 14,
    zIndex: 2,
  },
  sectionHeaderText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginRight: 12,
    fontFamily: "System",
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  detailsList: {
    width: "100%",
    paddingHorizontal: 24,
    marginBottom: 20,
    zIndex: 2,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(22, 22, 26, 0.5)",
    borderRadius: 16,
    marginBottom: 10,
    height: 60,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  accentBar: {
    width: 4,
    height: "100%",
  },
  detailRowContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 16,
  },
  detailRowIcon: {
    marginRight: 14,
  },
  detailRowText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "600",
    lineHeight: 18,
    fontFamily: "System",
  },
  footer: {
    width: "100%",
    paddingHorizontal: 24,
    alignItems: "center",
    zIndex: 2,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 56,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 12,
  },
  secondaryButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
  },
});
