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
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/components/ui/Header";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isHighRisk, setIsHighRisk] = useState(true);

  const toggleRiskState = () => {
    setIsHighRisk((prev) => !prev);
  };

  const getIconColor = (card: "public" | "email" | "phone" | "removals") => {
    if (!isHighRisk) return "#30D158"; // Low risk: all icons green
    switch (card) {
      case "email":
        return "#FF453A"; // High risk: email red
      case "removals":
        return "#FFD60A"; // High risk: removals yellow/gold
      default:
        return "#FFFFFF"; // Others: white
    }
  };

  return (
    <View style={styles.container}>
      {/* Standard Header with profile avatar on right */}
      <Header
        showBorder={true}
        rightElement={
          <TouchableOpacity
            onPress={toggleRiskState}
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
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>Good evening, Sarah</Text>
          <Text style={styles.greetingSubtitle}>Your identity protection is active.</Text>
        </Animated.View>

        {/* Privacy Risk Score Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleRiskState}
            style={styles.riskCard}
          >
            {/* Watermark Fingerprint absolute background */}
            <View style={styles.watermarkContainer}>
              <Image
                source={require("@/assets/images/app/fingerprint.png")}
                style={styles.watermarkImage}
                contentFit="contain"
              />
            </View>

            <Text style={styles.riskCardTitle}>EXPOSURE SCORE</Text>

            {/* Circular Ring Container */}
            <View style={[styles.circleRing, { borderColor: isHighRisk ? "#FF453A" : "#30D158" }]}>
              <Text style={styles.scoreText}>{isHighRisk ? "72" : "18"}</Text>
              <Text style={[styles.scoreLabel, { color: isHighRisk ? "#FF453A" : "#30D158" }]}>
                {isHighRisk ? "HIGH RISK" : "LOW RISK"}
              </Text>
            </View>

            <Text style={styles.riskCardDesc}>
              {isHighRisk
                ? "Multiple exposures were found in recent scans. Start removing your exposed data now."
                : "Your recent scans found limited exposure. Continue monitoring for new activity."}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Cards Grid (4 boxes) */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.gridContainer}>
          {/* Row 1 */}
          <View style={styles.gridRow}>
            {/* Card 1: Public Profiles */}
            <View style={styles.gridCard}>
              <View style={styles.cardHeader}>
                <Feather
                  name="globe"
                  size={18}
                  color={getIconColor("public")}
                />
              </View>
              <Text style={styles.cardValue}>4</Text>
              <Text style={styles.cardLabel}>Public Profiles</Text>
            </View>

            {/* Card 2: Email Exposed */}
            <View style={styles.gridCard}>
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons
                  name="at"
                  size={18}
                  color={getIconColor("email")}
                />
              </View>
              <Text style={styles.cardValue}>1</Text>
              <Text style={styles.cardLabel}>Email Exposed</Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.gridRow}>
            {/* Card 3: Phone Found */}
            <View style={styles.gridCard}>
              <View style={styles.cardHeader}>
                <Feather
                  name="smartphone"
                  size={18}
                  color={getIconColor("phone")}
                />
              </View>
              <Text style={styles.cardValue}>2</Text>
              <Text style={styles.cardLabel}>Phone # Found</Text>
            </View>

            {/* Card 4: Removal Options */}
            <View style={styles.gridCard}>
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons
                  name="gavel"
                  size={18}
                  color={getIconColor("removals")}
                />
              </View>
              <Text style={styles.cardValue}>3</Text>
              <Text style={styles.cardLabel}>Removal Options</Text>
            </View>
          </View>
        </Animated.View>

        {/* Recommended Action / Status Banner */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.actionCard}>
          <View style={styles.actionHeader}>
            <View style={[
              styles.actionIconContainer,
              { backgroundColor: isHighRisk ? "rgba(255, 255, 255, 0.05)" : "rgba(48, 209, 88, 0.1)" }
            ]}>
              <Feather
                name={isHighRisk ? "shield" : "shield"}
                size={20}
                color={isHighRisk ? "#FFFFFF" : "#30D158"}
              />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>
                {isHighRisk ? "Recommended Action" : "Status: Vigilant"}
              </Text>
              <Text style={styles.actionSubtitle}>
                {isHighRisk
                  ? "Start data removal requests for high-risk broker profiles and suspicious websites. Secure your identity now."
                  : "Monthly monitoring is active and protecting your digital identity."}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}
            onPress={() => router.push("/result" as any)}
          >
            <Text style={styles.actionButtonText}>
              {isHighRisk ? "REVIEW EXPOSURE REPORT" : "VIEW LATEST REPORT"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Recent Alerts List */}
        <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.alertsContainer}>
          <Text style={styles.alertsHeader}>RECENT ALERTS</Text>

          {isHighRisk ? (
            <>
              {/* Alert 1 */}
              <TouchableOpacity style={styles.alertRow} activeOpacity={0.7}>
                <View style={styles.alertLeft}>
                  <View style={[styles.alertIconCircle, { backgroundColor: "rgba(255, 69, 58, 0.12)" }]}>
                    <Feather name="alert-triangle" size={14} color="#FF453A" />
                  </View>
                  <View>
                    <Text style={styles.alertTitle}>DataBroker.io Exposure</Text>
                    <Text style={styles.alertSubtitle}>ID: DB-88291</Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={16} color="#8E8E93" />
              </TouchableOpacity>

              {/* Alert 2 */}
              <TouchableOpacity style={styles.alertRow} activeOpacity={0.7}>
                <View style={styles.alertLeft}>
                  <View style={[styles.alertIconCircle, { backgroundColor: "rgba(48, 209, 88, 0.12)" }]}>
                    <Feather name="check" size={14} color="#30D158" />
                  </View>
                  <View>
                    <Text style={styles.alertTitle}>Search Opt-out Successful</Text>
                    <Text style={styles.alertSubtitle}>Whitepages Inc.</Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={16} color="#8E8E93" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Alert 1 */}
              <TouchableOpacity style={styles.alertRow} activeOpacity={0.7}>
                <View style={styles.alertLeft}>
                  <View style={[styles.alertIconCircle, { backgroundColor: "rgba(48, 209, 88, 0.12)" }]}>
                    <Feather name="check" size={14} color="#30D158" />
                  </View>
                  <View>
                    <Text style={styles.alertTitle}>Identity Shield Active</Text>
                    <Text style={styles.alertSubtitle}>08:42 AM</Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={16} color="#8E8E93" />
              </TouchableOpacity>

              {/* Alert 2 */}
              <TouchableOpacity style={styles.alertRow} activeOpacity={0.7}>
                <View style={styles.alertLeft}>
                  <View style={[styles.alertIconCircle, { backgroundColor: "rgba(48, 209, 88, 0.12)" }]}>
                    <Feather name="check" size={14} color="#30D158" />
                  </View>
                  <View>
                    <Text style={styles.alertTitle}>Search Opt-out Successful</Text>
                    <Text style={styles.alertSubtitle}>Whitepages Inc.</Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={16} color="#8E8E93" />
              </TouchableOpacity>
            </>
          )}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
  greetingSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  greetingTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    fontFamily: "System",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  greetingSubtitle: {
    color: "#8E8E93",
    fontSize: 14.5,
    fontFamily: "System",
    fontWeight: "500",
  },
  riskCard: {
    width: "100%",
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  watermarkContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 64,
    height: 64,
    opacity: 0.05,
  },
  watermarkImage: {
    width: "100%",
    height: "100%",
  },
  riskCardTitle: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    fontFamily: "System",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  circleRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.01)",
  },
  scoreText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
    fontFamily: "System",
  },
  scoreLabel: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginTop: 4,
  },
  riskCardDesc: {
    color: "#A0A0A5",
    fontSize: 13.5,
    lineHeight: 18,
    textAlign: "center",
    fontFamily: "System",
    paddingHorizontal: 8,
    fontWeight: "500",
  },
  gridContainer: {
    width: "100%",
    marginTop: 16,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  gridCard: {
    width: (width - 52) / 2,
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardValue: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    fontFamily: "System",
  },
  cardLabel: {
    color: "#8E8E93",
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "System",
    marginTop: 4,
  },
  actionCard: {
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
  },
  actionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  actionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "800",
    fontFamily: "System",
  },
  actionSubtitle: {
    color: "#A0A0A5",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
    marginTop: 4,
    fontWeight: "500",
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 27,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  alertsContainer: {
    width: "100%",
    marginTop: 24,
  },
  alertsHeader: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    fontFamily: "System",
    marginBottom: 12,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(22, 22, 26, 0.55)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  alertLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  alertIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  alertTitle: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  alertSubtitle: {
    color: "#8E8E93",
    fontSize: 12.5,
    fontFamily: "System",
    marginTop: 2,
    fontWeight: "500",
  },
});
