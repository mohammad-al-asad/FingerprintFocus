import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ActiveScanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState(0);

  // Animations Setup
  const pulseScale = useSharedValue(1);
  const scanLineY = useSharedValue(-90);

  useEffect(() => {
    // Pulse animation
    pulseScale.value = withRepeat(
      withTiming(1.08, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // Scan line animation
    scanLineY.value = withRepeat(
      withTiming(90, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  // Update progress percentage and checklist items
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          const next = prev + 1;
          return next;
        } else {
          clearInterval(interval);
          // Auto route to result screen when completed
          setTimeout(() => {
            router.replace("/(freeScan)/result" as any);
          }, 1200);
          return prev;
        }
      });
    }, 45); // Takes approx 4.5 seconds to reach 100%

    return () => clearInterval(interval);
  }, []);

  // Reanimated style bindings
  const animatedRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const animatedLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
  }));

  // Define checklist step status
  const getStatus = (step: number) => {
    // step 1: People-search (0% - 33%)
    // step 2: Data broker (33% - 66%)
    // step 3: Breach databases (66% - 100%)
    if (step === 1) {
      if (progress >= 33) return "complete";
      return "active";
    }
    if (step === 2) {
      if (progress >= 66) return "complete";
      if (progress >= 33) return "active";
      return "pending";
    }
    if (step === 3) {
      if (progress >= 100) return "complete";
      if (progress >= 66) return "active";
      return "pending";
    }
    return "pending";
  };

  const renderStatusIndicator = (status: "pending" | "active" | "complete") => {
    if (status === "complete") {
      return (
        <View style={styles.statusCompleteCircle}>
          <Feather name="check" size={12} color="#000000" />
        </View>
      );
    }
    if (status === "active") {
      return <ActivityIndicator size="small" color="#30D158" />;
    }
    return <View style={styles.statusPendingCircle} />;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="fingerprint" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>PRIVACERA</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)" as any)}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Feather name="x" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Title and Description */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.textContainer}>
          <Text style={styles.title}>Matching possible exposure</Text>
          <Text style={styles.subtitle}>
            We're comparing public records with your scan profile.
          </Text>
        </Animated.View>

        {/* Visual Scanner Area */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.scannerWrapper}>
          {/* Metadata labels */}
          <Text style={styles.systemSecureText}>| SYSTEM: SECURE</Text>
          <Text style={styles.authSentinelText}>AUTH: OBSIDIAN SENTINEL |</Text>

          {/* Pulse Outer Rings */}
          <Animated.View style={[styles.outerRadarRing, animatedRingStyle]} />
          <View style={styles.innerRadarRing} />

          {/* Central Fingerprint Container */}
          <View style={styles.fingerprintContainer}>
            {/* Top Text Indicator inside ring */}
            <Text style={styles.securityLevelText}>SECURITY LEVEL: PLATINUM</Text>

            {/* Sharp Fingerprint Icon */}
            <MaterialCommunityIcons name="fingerprint" size={76} color="#FFFFFF" />

            {/* Glowing Scan Line */}
            <Animated.View style={[styles.scanLine, animatedLineStyle]} />
          </View>
        </Animated.View>

        {/* Scanning status checklist */}
        <View style={styles.checklist}>
          {/* Item 1 */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(600)}
            style={[
              styles.checklistItem,
              getStatus(1) === "active" && styles.checklistItemActive,
            ]}
          >
            <View style={styles.checklistLeft}>
              <Feather name="search" size={18} color="#FFFFFF" style={{ marginRight: 14 }} />
              <Text style={styles.checklistText}>People-search sites</Text>
            </View>
            {renderStatusIndicator(getStatus(1))}
          </Animated.View>

          {/* Item 2 */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(600)}
            style={[
              styles.checklistItem,
              getStatus(2) === "active" && styles.checklistItemActive,
            ]}
          >
            <View style={styles.checklistLeft}>
              <Feather name="database" size={18} color="#FFFFFF" style={{ marginRight: 14 }} />
              <Text style={styles.checklistText}>Data broker sources</Text>
            </View>
            {renderStatusIndicator(getStatus(2))}
          </Animated.View>

          {/* Item 3 */}
          <Animated.View
            entering={FadeInDown.delay(500).duration(600)}
            style={[
              styles.checklistItem,
              getStatus(3) === "active" && styles.checklistItemActive,
            ]}
          >
            <View style={styles.checklistLeft}>
              <Feather name="lock" size={18} color="#FFFFFF" style={{ marginRight: 14 }} />
              <Text style={styles.checklistText}>Breach databases</Text>
            </View>
            {renderStatusIndicator(getStatus(3))}
          </Animated.View>
        </View>

        {/* Bottom progress metrics */}
        <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.progressSection}>
          <View style={styles.progressMetrics}>
            <Text style={styles.progressLabel}>SCANNING COMPLETE</Text>
            <Text style={styles.progressPercentage}>{progress}%</Text>
          </View>
          {/* Progress bar line */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </Animated.View>
      </View>
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
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 32,
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
    textAlign: "center",
    fontFamily: "System",
    paddingHorizontal: 12,
  },
  scannerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    position: "relative",
    width: "100%",
  },
  systemSecureText: {
    position: "absolute",
    left: 20,
    top: 0,
    fontSize: 10,
    fontWeight: "600",
    color: "#48484A",
    letterSpacing: 1,
    fontFamily: "monospace",
  },
  authSentinelText: {
    position: "absolute",
    right: 20,
    bottom: 0,
    fontSize: 10,
    fontWeight: "600",
    color: "#48484A",
    letterSpacing: 1,
    fontFamily: "monospace",
  },
  outerRadarRing: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  innerRadarRing: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1.2,
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.14)",
  },
  fingerprintContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#161618",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  securityLevelText: {
    position: "absolute",
    top: 24,
    fontSize: 8.5,
    fontWeight: "700",
    color: "#48484A",
    letterSpacing: 1.2,
    fontFamily: "System",
  },
  scanLine: {
    position: "absolute",
    width: 150,
    height: 2,
    backgroundColor: "#30D158",
    opacity: 0.65,
    shadowColor: "#30D158",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  checklist: {
    width: "100%",
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121214",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  checklistItemActive: {
    borderColor: "rgba(48, 209, 88, 0.15)",
    backgroundColor: "#161619",
  },
  checklistLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  checklistText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  statusCompleteCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#30D158",
    justifyContent: "center",
    alignItems: "center",
  },
  statusPendingCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#2C2C2E",
  },
  progressSection: {
    width: "100%",
    marginTop: 8,
  },
  progressMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
  },
  progressPercentage: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "System",
  },
  progressBarBg: {
    width: "100%",
    height: 2,
    backgroundColor: "#1C1C1E",
    borderRadius: 1,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
  },
});
