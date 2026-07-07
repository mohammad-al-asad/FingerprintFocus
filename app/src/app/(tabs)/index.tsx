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
import Animated, { FadeIn, FadeInDown, Layout } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isHighRisk, setIsHighRisk] = useState(true);

  const toggleRiskState = () => {
    setIsHighRisk((prev) => !prev);
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
          onPress={toggleRiskState}
          style={styles.avatarButton}
          activeOpacity={0.7}
        >
          <Image
            source="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>Good evening, Sarah</Text>
          <Text style={styles.greetingSubtitle}>Your privacy shield is active.</Text>
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
              <MaterialCommunityIcons name="fingerprint" size={88} color="rgba(255, 255, 255, 0.03)" />
            </View>

            <Text style={styles.riskCardTitle}>PRIVACY RISK SCORE</Text>

            {/* Circular Ring Container */}
            <View style={[styles.circleRing, { borderColor: isHighRisk ? "#FF3B30" : "#30D158" }]}>
              <Text style={styles.scoreText}>{isHighRisk ? "72" : "18"}</Text>
              <Text style={[styles.scoreLabel, { color: isHighRisk ? "#FF3B30" : "#30D158" }]}>
                {isHighRisk ? "HIGH RISK" : "Low"}
              </Text>
            </View>

            <Text style={styles.riskCardDesc}>
              Multiple data exposures detected in recent scans. Immediate action required.
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Cards Grid */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.gridContainer}>
          {/* Row 1 */}
          <View style={styles.gridRow}>
            {/* Card 1: Public Profiles */}
            <View style={styles.gridCard}>
              <View style={styles.cardHeader}>
                <Feather
                  name="globe"
                  size={18}
                  color={isHighRisk ? "#8E8E93" : "#30D158"}
                />
              </View>
              <Text style={styles.cardValue}>4</Text>
              <Text style={styles.cardLabel}>Public Profiles</Text>
            </View>

            {/* Card 2: Email Exposed */}
            <View style={styles.gridCard}>
              <View style={styles.cardHeader}>
                <Feather
                  name="at-sign"
                  size={18}
                  color={isHighRisk ? "#FF3B30" : "#30D158"}
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
                  color={isHighRisk ? "#8E8E93" : "#30D158"}
                />
              </View>
              <Text style={styles.cardValue}>2</Text>
              <Text style={styles.cardLabel}>Phone Found</Text>
            </View>

            {/* Card 4: Removals */}
            <View style={styles.gridCard}>
              <View style={styles.cardHeader}>
                <Feather
                  name="eye-off"
                  size={18}
                  color={isHighRisk ? "#FFD60A" : "#30D158"}
                />
              </View>
              <Text style={styles.cardValue}>3</Text>
              <Text style={styles.cardLabel}>Removals</Text>
            </View>
          </View>
        </Animated.View>

        {/* Recommended Action / Status Banner */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.actionCard}>
          <View style={styles.actionHeader}>
            <View style={[styles.actionIconContainer, { backgroundColor: isHighRisk ? "rgba(255, 255, 255, 0.05)" : "rgba(48, 209, 88, 0.1)" }]}>
              <Feather name="shield" size={20} color={isHighRisk ? "#FFFFFF" : "#30D158"} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>
                {isHighRisk ? "Recommended Action" : "Status: Vigilant"}
              </Text>
              <Text style={styles.actionSubtitle}>
                {isHighRisk
                  ? "Start remove requests for high-risk broker profiles to secure your identity."
                  : "Monthly monitoring is active and protecting your identities."}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}
            onPress={() => router.push("/report" as any)}
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
  avatarButton: {
    paddingHorizontal: 20,
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
    paddingBottom: 40,
  },
  greetingSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  greetingTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 4,
  },
  greetingSubtitle: {
    color: "#8E8E93",
    fontSize: 14,
    fontFamily: "System",
  },
  riskCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    position: "relative",
  },
  watermarkContainer: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  riskCardTitle: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
    marginBottom: 4,
  },
  circleRing: {
    width: 144,
    height: 144,
    borderRadius: 72,
    borderWidth: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
    backgroundColor: "rgba(255, 255, 255, 0.01)",
  },
  scoreText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
    fontFamily: "System",
  },
  scoreLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    marginTop: 2,
    fontFamily: "System",
  },
  riskCardDesc: {
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    fontFamily: "System",
    paddingHorizontal: 12,
  },
  gridContainer: {
    width: "100%",
    marginBottom: 8,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  gridCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 12,
    width: "48.5%",
    padding: 16,
  },
  cardHeader: {
    marginBottom: 14,
    flexDirection: "row",
  },
  cardValue: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 4,
  },
  cardLabel: {
    color: "#8E8E93",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "System",
  },
  actionCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  actionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  actionIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 4,
  },
  actionSubtitle: {
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  actionButtonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  alertsContainer: {
    width: "100%",
  },
  alertsHeader: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
  },
  alertLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  alertIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  alertTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 2,
  },
  alertSubtitle: {
    color: "#8E8E93",
    fontSize: 12,
    fontFamily: "System",
  },
});
