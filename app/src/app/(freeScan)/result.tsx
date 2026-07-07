import React, { useEffect } from "react";
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  FadeInDown,
} from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

const { width } = Dimensions.get("window");

export default function FreeScanResult() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Glow pulsing animation
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    glowScale.value = withRepeat(
      withTiming(1.1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    glowOpacity.value = withRepeat(
      withTiming(0.6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
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
      text: "Family and associate links may be exposed",
    },
    {
      id: "remove",
      icon: "shield",
      color: "#30D158",
      text: "Data remove steps are available for some records",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="fingerprint" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>PRIVACERA</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Feather name="x" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Visual Centerpiece */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.centerpieceContainer}>
          {/* Subtle Red Pulsing Glow Backdrop */}
          <Animated.View style={[styles.redGlow, animatedGlowStyle]} />

          {/* Outer concentric circles */}
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              {/* Center Fingerprint in Red */}
              <Image
                source={require("@/assets/images/app/fingerprint.png")}
                style={styles.fingerprintImage}
                contentFit="contain"
              />
            </View>

            {/* Alert Badge at bottom right of outer circle */}
            <View style={styles.alertBadge}>
              <Feather name="alert-triangle" size={14} color="#FFFFFF" />
            </View>
          </View>
        </Animated.View>

        {/* Text Headers */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.textContainer}>
          <Text style={styles.title}>Your fingerprint scan found exposed data</Text>
          <Text style={styles.subtitle}>
            Your personal information may be exposed on people-search and broker sites, making it easier for spammers, scammers, or stalkers to find you.
          </Text>
        </Animated.View>

        {/* Summary Cards Section */}
        <View style={styles.cardsContainer}>
          {/* Card 1: Full Width Broker Profiles */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(600)}
            style={[styles.fullWidthCard, styles.criticalCard]}
          >
            <View style={styles.fullWidthCardHeader}>
              <Feather name="users" size={20} color="#FF453A" style={styles.cardIcon} />
            </View>
            <Text style={styles.fullWidthCardText}>4 broker profiles found</Text>
          </Animated.View>

          {/* Card 2 & 3: Half Width Columns */}
          <View style={styles.row}>
            {/* High-Risk Card */}
            <Animated.View
              entering={FadeInDown.delay(400).duration(600)}
              style={[styles.halfCard, styles.criticalCard]}
            >
              <View>
                <Text style={styles.cardLabelRed}>HIGH-RISK</Text>
                <Text style={styles.cardValue}>8</Text>
                <Text style={styles.cardSubText}>Critical points</Text>
              </View>
            </Animated.View>

            {/* Removals Card */}
            <Animated.View
              entering={FadeInDown.delay(500).duration(600)}
              style={[styles.halfCard, styles.successCard]}
            >
              <View>
                <Text style={styles.cardLabelGreen}>REMOVALS</Text>
                <Text style={styles.cardValue}>12</Text>
                <Text style={styles.cardSubText}>12 removal opportunities</Text>
              </View>
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

              {/* Icon */}
              <Feather
                name={item.icon as any}
                size={18}
                color={item.color}
                style={styles.detailRowIcon}
              />

              {/* Label Text */}
              <Text style={styles.detailRowText}>{item.text}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Bottom Actions Section */}
        <Animated.View entering={FadeInDown.delay(1000).duration(600)} style={styles.footer}>
          {/* Save My Results */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace("/(freeScan)/create-accoutn" as any)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Save My Results</Text>
          </TouchableOpacity>

          {/* Maybe Later */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace("/(auth)/signin")}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Maybe Later</Text>
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
    justifyContent: "space-between",
    backgroundColor: "#000000",
    paddingBottom: 16,
    width: "100%",
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  centerpieceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 180,
    width: 180,
    position: "relative",
  },
  redGlow: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255, 69, 58, 0.06)",
    shadowColor: "#FF453A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 35,
    elevation: 8,
    zIndex: 1,
  },
  outerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "rgba(255, 69, 58, 0.2)",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  innerCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderColor: "rgba(255, 69, 58, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  fingerprintImage: {
    width: 62,
    height: 62,
    tintColor: "#FF453A",
  },
  alertBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF453A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 18,
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
    fontSize: 14.5,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 21,
    fontFamily: "System",
  },
  cardsContainer: {
    width: "100%",
    marginTop: 24,
  },
  fullWidthCard: {
    width: "100%",
    height: 96,
    borderRadius: 14,
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "rgba(28, 28, 30, 0.4)",
    borderWidth: 1,
    marginBottom: 12,
  },
  fullWidthCardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  fullWidthCardText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    fontFamily: "System",
  },
  cardIcon: {
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  halfCard: {
    flex: 1,
    height: 108,
    borderRadius: 14,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "rgba(28, 28, 30, 0.4)",
    borderWidth: 1,
  },
  criticalCard: {
    borderColor: "rgba(255, 69, 58, 0.18)",
  },
  successCard: {
    borderColor: "rgba(48, 209, 88, 0.18)",
    marginLeft: 12,
  },
  cardLabelRed: {
    color: "#FF453A",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  cardLabelGreen: {
    color: "#30D158",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  cardValue: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 2,
    fontFamily: "System",
  },
  cardSubText: {
    color: "#8E8E93",
    fontSize: 11,
    marginTop: 2,
    fontFamily: "System",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 28,
    marginBottom: 14,
  },
  sectionHeaderText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginRight: 10,
    fontFamily: "System",
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#1C1C1E",
  },
  detailsList: {
    width: "100%",
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(28, 28, 30, 0.45)",
    borderRadius: 12,
    marginBottom: 10,
    height: 64,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  accentBar: {
    width: 4,
    height: "100%",
  },
  detailRowIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  detailRowText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "500",
    lineHeight: 18,
    fontFamily: "System",
    paddingRight: 14,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
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
    backgroundColor: "#000000",
    borderColor: "#2C2C2E",
    borderWidth: 1,
    borderRadius: 28,
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
});
