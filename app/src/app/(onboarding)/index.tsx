import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Rect, Defs, RadialGradient, Stop } from "react-native-svg";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

const gridItems = [
  { id: 1, label: "Phone number exposed", icon: "smartphone", color: "#FF9F0A" },
  { id: 2, label: "Home address visible", icon: "map-pin", color: "#FFD60A" },
  { id: 3, label: "Email address leaks", icon: "at-sign", color: "#0A84FF" },
  { id: 4, label: "Family members linked", icon: "users", color: "#FF375F" },
  { id: 5, label: "Your data sold online", icon: "shield", color: "#30D158" },
  { id: 6, label: "Password breach matches", icon: "key", color: "#FF453A" },
  { id: 7, label: "Social Security number at risk", icon: "file-text", color: "#64D2FF" },
  { id: 8, label: "Identity theft warning signs", icon: "alert-triangle", color: "#BF5AF2" },
];

export default function OnboardingFirst() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Breathing animation values for the background glow
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.4);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 5000 }),
        withTiming(1, { duration: 5000 })
      ),
      -1,
      true
    );

    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 5000 }),
        withTiming(0.3, { duration: 5000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: glowOpacity.value,
    };
  });

  return (
    <LinearGradient colors={["#0C0C0E", "#030303"]} style={styles.container}>
      {/* Background Animated SVG Glow Orb */}
      <Animated.View style={[styles.backgroundGlow, animatedGlowStyle]}>
        <Svg height="100%" width="100%" viewBox="0 0 400 400">
          <Defs>
            <RadialGradient
              id="glowGrad"
              cx="200"
              cy="200"
              rx="200"
              ry="200"
              fx="200"
              fy="200"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#0A84FF" stopOpacity="0.14" />
              <Stop offset="60%" stopColor="#0A84FF" stopOpacity="0.03" />
              <Stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="400" height="400" fill="url(#glowGrad)" />
        </Svg>
      </Animated.View>

      <Header showBorder={false} transparent={true} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          {/* Title and Subtitle */}
          <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.textContainer}>
            <Text style={styles.title}>Control your digital fingerprint</Text>
            <Text style={styles.subtitle}>
              Let's check the internet for exposed personal data and see what may be putting you and your family at risk.
            </Text>
          </Animated.View>

          {/* Grid of Security Risks */}
          <View style={styles.gridContainer}>
            {gridItems.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(300 + index * 60).duration(500)}
                style={styles.gridItemWrapper}
              >
                <View style={styles.gridItem}>
                  <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                    <Feather name={item.icon as any} size={18} color={item.color} />
                  </View>
                  <Text style={styles.gridItemText}>{item.label}</Text>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* Bottom Section */}
          <Animated.View entering={FadeInDown.delay(900).duration(600)} style={styles.footer}>
            {/* Primary Button */}
            <Button
              title="Get Started"
              onPress={() => router.push("/second")}
              style={styles.getStartedButton}
            />

            {/* Alternative Link */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/(auth)/signin" as any)}
              style={styles.signInButton}
            >
              <Text style={styles.linkText}>I already have an account</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  backgroundGlow: {
    position: "absolute",
    top: "22%",
    alignSelf: "center",
    width: 400,
    height: 400,
    zIndex: 0,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#A0A0A5",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "System",
    paddingHorizontal: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
    zIndex: 2,
  },
  gridItemWrapper: {
    width: "48.5%",
    marginBottom: 10,
  },
  gridItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 14,
    height: 72,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  gridItemText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 10,
    flex: 1,
    lineHeight: 16,
    fontFamily: "System",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 2,
  },
  getStartedButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 56,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  signInButton: {
    paddingVertical: 8,
    marginTop: 4,
  },
  linkText: {
    color: "#8E8E93",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "System",
  },
});
