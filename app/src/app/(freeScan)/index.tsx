import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  FadeInDown,
} from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Rect, Defs, RadialGradient, Stop } from "react-native-svg";
import Header from "@/components/ui/Header";

const checklistItems = [
  { id: 1, label: "Checking names and aliases", icon: "user-check" },
  { id: 2, label: "Reviewing emails and phone numbers", icon: "mail" },
  { id: 3, label: "Looking for exposed addresses", icon: "map-pin" },
  { id: 4, label: "Matching and grouping threat signals", icon: "shield" },
];

export default function ActiveScanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState(0);

  // Animations Setup
  const pulseScale = useSharedValue(1);
  const scanLineY = useSharedValue(-60);
  const ringRotation = useSharedValue(0);

  // Background glow animation
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    // Pulse animation
    pulseScale.value = withRepeat(
      withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // Rotation of outer orbit rings
    ringRotation.value = withRepeat(
      withTiming(360, { duration: 25000, easing: Easing.linear }),
      -1,
      false
    );

    // Scan line animation (moves up and down across the fingerprint)
    scanLineY.value = withRepeat(
      withSequence(
        withTiming(60, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(-60, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Background glow breathe
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 4000 }),
        withTiming(1, { duration: 4000 })
      ),
      -1,
      true
    );
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 4000 }),
        withTiming(0.3, { duration: 4000 })
      ),
      -1,
      true
    );
  }, []);

  // Update progress percentage
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          const next = prev + 1;
          return next;
        } else {
          clearInterval(interval);
          // Redirect to results screen
          setTimeout(() => {
            router.replace("/(freeScan)/result" as any);
          }, 1200);
          return prev;
        }
      });
    }, 45); // Approx 4.5 seconds scan

    return () => clearInterval(interval);
  }, []);

  // Reanimated style bindings
  const animatedRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const animatedOrbitStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ringRotation.value}deg` }],
  }));

  const animatedLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: glowOpacity.value,
  }));

  // Define checklist step status based on progress (0% - 100%)
  const getStatus = (id: number) => {
    // Staggered thresholds for 4 items:
    // Item 1: 0% to 25%
    // Item 2: 25% to 50%
    // Item 3: 50% to 75%
    // Item 4: 75% to 100%
    const thresholds = [25, 50, 75, 100];
    const prevThreshold = id === 1 ? 0 : thresholds[id - 2];
    const nextThreshold = thresholds[id - 1];

    if (progress >= nextThreshold) return "complete";
    if (progress >= prevThreshold) return "active";
    return "pending";
  };

  const renderStatusIndicator = (status: "pending" | "active" | "complete") => {
    if (status === "complete") {
      return (
        <View style={styles.statusCompleteCircle}>
          <Feather name="check" size={11} color="#000000" />
        </View>
      );
    }
    if (status === "active") {
      return <ActivityIndicator size="small" color="#30D158" />;
    }
    return <View style={styles.statusPendingCircle} />;
  };

  const rightHeaderClose = (
    <TouchableOpacity
      onPress={() => router.back()}
      style={styles.closeButton}
      activeOpacity={0.7}
    >
      <Feather name="x" size={20} color="#FFFFFF" style={styles.closeIcon} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#0C0C0E", "#030303"]} style={styles.container}>
      {/* Background Animated SVG Glow Orb (Neon Green) */}
      <Animated.View style={[styles.backgroundGlow, animatedGlowStyle]}>
        <Svg height="100%" width="100%" viewBox="0 0 400 400">
          <Defs>
            <RadialGradient
              id="scanGlow"
              cx="200"
              cy="200"
              rx="200"
              ry="200"
              fx="200"
              fy="200"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#30D158" stopOpacity="0.10" />
              <Stop offset="60%" stopColor="#30D158" stopOpacity="0.02" />
              <Stop offset="100%" stopColor="#30D158" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="400" height="400" fill="url(#scanGlow)" />
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
          {/* Title Header */}
          <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.textContainer}>
            <Text style={styles.title}>Identifying where your{"\n"}information may be exposed</Text>
          </Animated.View>

          {/* Visual Scanner Area */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.scannerWrapper}>
            {/* Metadata labels */}
            <View style={styles.metadataLeft}>
              <Text style={styles.metaLabelText}>|  SYSTEM: SECURE</Text>
            </View>
            <View style={styles.metadataRight}>
              <Text style={styles.metaLabelText}>AUTH: OBSIDIAN SENTINEL  |</Text>
            </View>

            {/* Pulsing Concentric Orbit Rings */}
            <Animated.View style={[styles.outerRadarRing, animatedOrbitStyle, animatedRingStyle]} />
            <View style={styles.innerRadarRing} />

            {/* Central Fingerprint Circle */}
            <View style={styles.fingerprintContainer}>
              {/* Security Label Text */}
              <Text style={styles.securityLevelText}>SECURITY LEVEL: PLATINUM</Text>

              {/* Center Fingerprint icon */}
              <MaterialCommunityIcons name="fingerprint" size={72} color="#FFFFFF" />

              {/* Glowing Scan Line */}
              <Animated.View style={[styles.scanLine, animatedLineStyle]} />
            </View>
          </Animated.View>

          {/* Scanning Checklist */}
          <View style={styles.checklist}>
            {checklistItems.map((item, index) => {
              const status = getStatus(item.id);
              const isActive = status === "active";
              const isComplete = status === "complete";
              return (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(300 + index * 50).duration(500)}
                  style={[
                    styles.checklistItem,
                    isActive && styles.checklistItemActive,
                    isComplete && styles.checklistItemComplete,
                  ]}
                >
                  <View style={styles.checklistLeft}>
                    <Feather
                      name={item.icon as any}
                      size={16}
                      color={isComplete ? "#30D158" : isActive ? "#FFFFFF" : "#48484A"}
                      style={{ marginRight: 12 }}
                    />
                    <Text
                      style={[
                        styles.checklistText,
                        isActive && styles.checklistTextActive,
                        isComplete && styles.checklistTextComplete,
                      ]}
                      numberOfLines={1}
                    >
                      {item.label}
                    </Text>
                  </View>
                  {renderStatusIndicator(status)}
                </Animated.View>
              );
            })}
          </View>

          {/* Progress Section */}
          <Animated.View entering={FadeInDown.delay(700).duration(600)} style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.scanningLabel}>SCANNING...</Text>
            </View>

            {/* Progress Bar with floating tooltip bubble */}
            <View style={styles.progressBarWrapper}>
              {/* Tooltip bubble containing current percentage */}
              <View
                style={[
                  styles.tooltipContainer,
                  { left: `${Math.max(0, Math.min(progress, 88))}%` }
                ]}
              >
                <View style={styles.tooltipBubble}>
                  <Text style={styles.tooltipText}>{progress}%</Text>
                </View>
                <View style={styles.tooltipArrow} />
              </View>

              {/* Progress bar background line */}
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
              </View>
            </View>

            {/* Clock icon disclaimer at the bottom */}
            <View style={styles.disclaimerRow}>
              <Feather name="clock" size={14} color="#8E8E93" style={{ marginRight: 8 }} />
              <Text style={styles.disclaimerText}>
                Your first scan is free. Results will be ready shortly.
              </Text>
            </View>
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
    top: "15%",
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
  closeIcon: {
    marginTop: 0,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 32,
    textAlign: "center",
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  scannerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    position: "relative",
    width: "100%",
    zIndex: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  metadataLeft: {
    position: "absolute",
    left: 24,
    top: 0,
  },
  metadataRight: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  metaLabelText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#4E4E52",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  outerRadarRing: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  innerRadarRing: {
    position: "absolute",
    width: 176,
    height: 176,
    borderRadius: 88,
    borderWidth: 1.2,
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  fingerprintContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(22, 22, 26, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  securityLevelText: {
    position: "absolute",
    top: 18,
    fontSize: 8,
    fontWeight: "700",
    color: "#5C5C60",
    letterSpacing: 1,
    fontFamily: "System",
  },
  scanLine: {
    position: "absolute",
    width: 120,
    height: 2,
    backgroundColor: "#30D158",
    opacity: 0.75,
    shadowColor: "#30D158",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  checklist: {
    width: "100%",
    paddingHorizontal: 24,
    zIndex: 2,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(22, 22, 26, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    height: 44,
  },
  checklistItemActive: {
    borderColor: "rgba(48, 209, 88, 0.2)",
    backgroundColor: "rgba(48, 209, 88, 0.03)",
  },
  checklistItemComplete: {
    borderColor: "rgba(48, 209, 88, 0.12)",
  },
  checklistLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  checklistText: {
    color: "#48484A",
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "System",
  },
  checklistTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  checklistTextComplete: {
    color: "#8E8E93",
    fontWeight: "500",
  },
  statusCompleteCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#30D158",
    justifyContent: "center",
    alignItems: "center",
  },
  statusPendingCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  progressSection: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 18,
    zIndex: 2,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  scanningLabel: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  progressBarWrapper: {
    width: "100%",
    position: "relative",
    height: 48,
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  tooltipContainer: {
    position: "absolute",
    bottom: 28,
    alignItems: "center",
    width: 48,
    marginLeft: -18,
  },
  tooltipBubble: {
    backgroundColor: "#30D158",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#30D158",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tooltipText: {
    color: "#000000",
    fontSize: 11,
    fontWeight: "800",
    fontFamily: "System",
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#30D158",
  },
  progressBarBg: {
    width: "100%",
    height: 14,
    backgroundColor: "rgba(22, 22, 26, 0.8)",
    borderRadius: 7,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#30D158",
    borderRadius: 7,
  },
  disclaimerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  disclaimerText: {
    color: "#8E8E93",
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "System",
  },
});
