import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Rect, Defs, RadialGradient, Stop } from "react-native-svg";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

const testimonials = [
  {
    initials: "J.R.",
    name: "Jasmine R.",
    stars: 5,
    quote: "I didn't realize how many sites had my info until I saw the scan results. No wonder I was getting so many spam calls. This app helped me start removing it fast.",
  },
  {
    initials: "M.T.",
    name: "Marcus T.",
    stars: 5,
    quote: "Finding my number and address online was unsettling. This made the cleanup process feel clear and manageable.",
  },
  {
    initials: "E.P.",
    name: "Elena P.",
    stars: 5,
    quote: "After seeing how exposed I was, I wanted a fix right away. Fingerprint Focus gave me a simple path to take control.",
  },
];

export default function TestimonialsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleClose = () => {
    router.back();
  };

  return (
    <LinearGradient colors={["#0C0C0E", "#030303"]} style={styles.container}>
      {/* Subtle Purple background orb */}
      <View style={styles.backgroundGlow}>
        <Svg height="100%" width="100%" viewBox="0 0 400 400">
          <Defs>
            <RadialGradient
              id="testiGlow"
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
          <Rect x="0" y="0" width="400" height="400" fill="url(#testiGlow)" />
        </Svg>
      </View>

      <Header
        showBorder={false}
        transparent={true}
        rightElement={
          <TouchableOpacity
            onPress={handleClose}
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
          {/* Overlapping Avatars Header */}
          <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.avatarHeader}>
            <Image
              source={require("@/assets/images/reviewDP.png")}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Heading Text & Badge */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.textContainer}>
            <Text style={styles.title}>See how people felt after finding and removing exposed data</Text>

            {/* Trusted Badge */}
            <View style={styles.trustBadge}>
              <MaterialCommunityIcons name="shield-check" size={14} color="#30D158" style={{ marginRight: 6 }} />
              <Text style={styles.trustBadgeText}>Trusted by Professionals</Text>
            </View>
          </Animated.View>

          {/* Testimonial Cards List */}
          <View style={styles.testimonialsList}>
            {testimonials.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(300 + index * 100).duration(600)}
                style={styles.testimonialCard}
              >
                {/* Left Initials Box */}
                <View style={styles.initialsBox}>
                  <Text style={styles.initialsText}>{item.initials}</Text>
                </View>

                {/* Right Content Column */}
                <View style={styles.cardContent}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  
                  {/* Rating Stars Row */}
                  <View style={styles.starsRow}>
                    {[...Array(item.stars)].map((_, i) => (
                      <MaterialCommunityIcons
                        key={i}
                        name="star"
                        size={16}
                        color="#FFD60A"
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>

                  <Text style={styles.cardQuote}>“{item.quote}”</Text>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* Action Footer */}
          <Animated.View entering={FadeInDown.delay(700).duration(600)} style={styles.footer}>
            <Button
              title="Continue"
              onPress={() => router.replace("/(auth)" as any)}
              style={styles.continueButton}
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
  avatarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    zIndex: 2,
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0C0C0E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  avatarImage: {
    height: 58,
    borderRadius: 29,
  },
  avatarInitial: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "System",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 18,
    paddingHorizontal: 24,
    width: "100%",
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 14,
    lineHeight: 32,
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  trustBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(48, 209, 88, 0.25)",
    backgroundColor: "rgba(48, 209, 88, 0.06)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  trustBadgeText: {
    color: "#30D158",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "System",
  },
  testimonialsList: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 20,
    zIndex: 2,
  },
  testimonialCard: {
    flexDirection: "row",
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  initialsBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#30D158",
    backgroundColor: "rgba(48, 209, 88, 0.06)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  initialsText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  cardContent: {
    flex: 1,
    marginLeft: 14,
  },
  cardName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "System",
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 6,
  },
  cardQuote: {
    color: "#A0A0A5",
    fontSize: 13.5,
    lineHeight: 18,
    fontFamily: "System",
    fontWeight: "500",
  },
  footer: {
    width: "100%",
    paddingHorizontal: 24,
    alignItems: "center",
    zIndex: 2,
  },
  continueButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 56,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
});
