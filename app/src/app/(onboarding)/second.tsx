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

const options = [
  { id: "exposed", label: "I want to see what's exposed" },
  { id: "theft", label: "I'm worried about identity theft" },
  { id: "online", label: "I found my information online" },
  { id: "privacy", label: "I want more privacy" },
  { id: "family", label: "I want to protect my family" },
];

export default function OnboardingSecond() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Interactive selection state matching the mockup defaults:
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([
    "exposed",
    "theft",
    "family",
  ]);

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

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <LinearGradient colors={["#0C0C0E", "#030303"]} style={styles.container}>
      {/* Background Animated SVG Glow Orb (Deep Purple) */}
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
              <Stop offset="0%" stopColor="#BF5AF2" stopOpacity="0.12" />
              <Stop offset="60%" stopColor="#BF5AF2" stopOpacity="0.02" />
              <Stop offset="100%" stopColor="#BF5AF2" stopOpacity="0" />
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
            <Text style={styles.title}>Your reason for coming</Text>
            <Text style={styles.subheading}>What brings you here today?</Text>
            <Text style={styles.subtitle}>
              We'll tailor your first privacy scan around what matters most to you. Select all that apply.
            </Text>
          </Animated.View>

          {/* Options List Section */}
          <View style={styles.optionsList}>
            {options.map((option, index) => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <Animated.View
                  key={option.id}
                  entering={FadeInDown.delay(200 + index * 60).duration(500)}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => toggleOption(option.id)}
                    style={[
                      styles.optionCard,
                      isSelected ? styles.selectedCard : styles.unselectedCard,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected ? styles.selectedText : styles.unselectedText,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {isSelected ? (
                      <Feather name="check-circle" size={20} color="#30D158" />
                    ) : (
                      <Feather name="circle" size={20} color="#48484A" />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          {/* Bottom Section */}
          <Animated.View entering={FadeInDown.delay(700).duration(600)} style={styles.footer}>
            {/* Primary Button */}
            <Button
              title="Next"
              onPress={() => router.push("/third")}
              style={styles.nextButton}
            />

            {/* Alternative Link */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/third")}
              style={styles.skipButton}
            >
              <Text style={styles.linkText}>Skip</Text>
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
    marginBottom: 6,
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 15,
    color: "#A0A0A5",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "System",
    paddingHorizontal: 16,
  },
  optionsList: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 24,
    zIndex: 2,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  unselectedCard: {
    backgroundColor: "rgba(22, 22, 26, 0.55)",
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  selectedCard: {
    backgroundColor: "rgba(48, 209, 88, 0.06)",
    borderColor: "rgba(48, 209, 88, 0.4)",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
    flex: 1,
    marginRight: 10,
  },
  unselectedText: {
    color: "#A0A0A5",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  footer: {
    width: "100%",
    paddingHorizontal: 24,
    alignItems: "center",
    zIndex: 2,
  },
  nextButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 56,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  skipButton: {
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
