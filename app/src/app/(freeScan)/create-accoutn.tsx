import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Polygon, Circle, Defs, RadialGradient, Stop, Rect } from "react-native-svg";
import { Image } from "expo-image";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

const features = [
  "View your full exposure report",
  "Get guided removal requests",
  "Protect your family's information",
  "Get alerts for new exposure",
  "Monitor your digital fingerprint 24/7",
];

export default function CreateAccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleExitApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
    } else {
      router.replace("/(tabs)" as any);
    }
  };

  return (
    <LinearGradient colors={["#0C0C0E", "#030303"]} style={styles.container}>
      {/* Subtle Amber background orb */}
      <View style={styles.backgroundGlow}>
        <Svg height="100%" width="100%" viewBox="0 0 400 400">
          <Defs>
            <RadialGradient
              id="upsellGlow"
              cx="200"
              cy="200"
              rx="200"
              ry="200"
              fx="200"
              fy="200"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#FF453A" stopOpacity="0.08" />
              <Stop offset="60%" stopColor="#FF453A" stopOpacity="0.01" />
              <Stop offset="100%" stopColor="#FF453A" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="400" height="400" fill="url(#upsellGlow)" />
        </Svg>
      </View>

      <Header
        showBorder={false}
        transparent={true}
        rightElement={
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <Feather name="x" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          {/* Centered Top Content */}
          <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.topContent}>
            {/* Action Required Badge */}
            <View style={styles.actionBadge}>
              <Feather name="alert-triangle" size={12} color="#FF453A" style={{ marginRight: 6 }} />
              <Text style={styles.actionBadgeText}>ACTION REQUIRED</Text>
            </View>

            <Text style={styles.title}>We found exposure signals</Text>
            <Text style={styles.subtitle}>
              Create your personal account to save your scan results, unlock your full report, and take action from your private dashboard.
            </Text>
          </Animated.View>

          {/* Metrics & Speedometer Summary Card */}
          <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.metricsCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderTitle}>SCANNED EXPOSURE METRICS</Text>
              <View style={styles.cardHeaderLine} />
            </View>

            {/* Metric 1 */}
            <View style={styles.metricItem}>
              <View style={styles.metricItemLeft}>
                <Feather name="database" size={18} color="#8E8E93" style={{ marginRight: 12 }} />
                <Text style={styles.metricItemText}>Broker Listings</Text>
              </View>
              <View style={styles.badgeLikely}>
                <Text style={styles.badgeLikelyText}>23 LIKELY</Text>
              </View>
            </View>

            {/* Metric 2 */}
            <View style={styles.metricItem}>
              <View style={styles.metricItemLeft}>
                <Feather name="alert-circle" size={18} color="#FF453A" style={{ marginRight: 12 }} />
                <Text style={styles.metricItemText}>High-Risk Points</Text>
              </View>
              <View style={styles.badgeAlert}>
                <Text style={styles.badgeAlertText}>8 ALERT</Text>
              </View>
            </View>

            {/* Metric 3 */}
            <View style={[styles.metricItem, { borderBottomWidth: 0 }]}>
              <View style={styles.metricItemLeft}>
                <Feather name="shield" size={18} color="#30D158" style={{ marginRight: 12 }} />
                <Text style={styles.metricItemText}>Removal Opportunities</Text>
              </View>
              <View style={styles.badgeReady}>
                <Text style={styles.badgeReadyText}>12 READY</Text>
              </View>
            </View>

            {/* Custom Speedometer Ring using scale.png */}
            <View style={styles.gaugeContainer}>
              <Image
                source={require("@/assets/images/scale.png")}
                style={styles.gaugeImage}
                contentFit="contain"
              />

              {/* Overlay SVG for the Needle */}
              <View style={styles.needleOverlay}>
                <Svg width="300" height="150" viewBox="0 0 300 150">
                  {/* Speedometer Needle pointing to 60/100, i.e. rotate 18 degrees */}
                  <Polygon points="147,112 150,25 153,112" fill="#000000" transform="rotate(18, 150, 112)" />
                  <Circle cx="150" cy="112" r="10" fill="#000000" />
                  <Circle cx="150" cy="112" r="4" fill="#E5E5EA" />
                </Svg>
              </View>

              {/* Exposure Score Labels */}
              <View style={styles.gaugeTextContainer}>
                <Text style={styles.exposureScoreText}>HIGH</Text>
                <Text style={styles.exposureValueSubtext}>Exposure score: <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>60/100</Text></Text>
              </View>
            </View>

            {/* Actions Warning Badge */}
            <View style={styles.actionsWarningBadge}>
              <Feather name="alert-triangle" size={13} color="#FF9F0A" style={{ marginRight: 6 }} />
              <Text style={styles.actionsWarningText}>12 removal actions available</Text>
            </View>

            {/* Score Legend row at the bottom */}
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: "#0A84FF" }]} /><Text style={styles.legendText}>0-20</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: "#64D2FF" }]} /><Text style={styles.legendText}>21-40</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: "#FFD60A" }]} /><Text style={styles.legendText}>41-60</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: "#FF9F0A" }]} /><Text style={styles.legendText}>61-80</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: "#FF453A" }]} /><Text style={styles.legendText}>81-100</Text></View>
            </View>
          </Animated.View>

          {/* Bullet Points List */}
          <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.bulletsList}>
            {features.map((feature, index) => (
              <View key={index} style={styles.bulletItem}>
                <Feather name="check-circle" size={18} color="#30D158" style={styles.bulletIcon} />
                <Text style={styles.bulletText}>{feature}</Text>
              </View>
            ))}
          </Animated.View>

          {/* Actions Footer */}
          <Animated.View entering={FadeInDown.delay(700).duration(600)} style={styles.footer}>
            {/* Primary Button (routes to Testimonials) */}
            <Button
              title="Create Account to Save Results"
              onPress={() => router.replace("/(freeScan)/testimonials" as any)}
              style={styles.primaryButton}
            />

            {/* Secondary Button */}
            <Button
              title="Not Now"
              onPress={handleExitApp}
              variant="secondary"
              style={styles.secondaryButton}
            />

            {/* Encryption Footer text */}
            <Text style={styles.encryptionText}>ENCRYPTED WITH AES-256 STANDARD</Text>
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
    top: "20%",
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
  topContent: {
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 24,
    width: "100%",
    zIndex: 2,
  },
  actionBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 69, 58, 0.25)",
    backgroundColor: "rgba(255, 69, 58, 0.08)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 16,
  },
  actionBadgeText: {
    color: "#FF453A",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "System",
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
    paddingHorizontal: 8,
  },
  metricsCard: {
    width: "88%",
    borderRadius: 20,
    padding: 18,
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginTop: 24,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardHeaderTitle: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginRight: 10,
    fontFamily: "System",
  },
  cardHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  metricItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricItemText: {
    color: "#E5E5EA",
    fontSize: 14.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  badgeLikely: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  badgeLikelyText: {
    color: "#A0A0A5",
    fontSize: 10.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  badgeAlert: {
    backgroundColor: "rgba(255, 69, 58, 0.08)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 69, 58, 0.2)",
  },
  badgeAlertText: {
    color: "#FF453A",
    fontSize: 10.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  badgeReady: {
    backgroundColor: "rgba(48, 209, 88, 0.08)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(48, 209, 88, 0.2)",
  },
  badgeReadyText: {
    color: "#30D158",
    fontSize: 10.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  gaugeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    position: "relative",
    height: 220,
    width: 300,
    alignSelf: "center",
  },
  gaugeImage: {
    width: 300,
    height: 150,
    position: "absolute",
    top: 0,
  },
  needleOverlay: {
    width: 300,
    height: 150,
    position: "absolute",
    top: 0,
    left: 0,
  },
  gaugeTextContainer: {
    position: "absolute",
    bottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  exposureScoreText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -0.5,
    fontFamily: "System",
  },
  exposureValueSubtext: {
    color: "#8E8E93",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 2,
    fontFamily: "System",
  },
  actionsWarningBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 159, 10, 0.2)",
    backgroundColor: "rgba(255, 159, 10, 0.06)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 6,
  },
  actionsWarningText: {
    color: "#FF9F0A",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "System",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
    paddingTop: 12,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  legendText: {
    color: "#8E8E93",
    fontSize: 9.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  bulletsList: {
    width: "100%",
    marginTop: 24,
    paddingHorizontal: 32,
    zIndex: 2,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  bulletIcon: {
    marginRight: 14,
  },
  bulletText: {
    color: "#E5E5EA",
    fontSize: 14.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  footer: {
    width: "100%",
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 24,
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
    marginBottom: 12,
  },
  encryptionText: {
    color: "#48484A",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
    marginTop: 6,
  },
});
