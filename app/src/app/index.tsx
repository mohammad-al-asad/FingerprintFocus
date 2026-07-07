import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const isAuthenticated = false;
  const isFirstTime = true;

  if (loading) {
    return (
      <LinearGradient colors={["#18181B", "#000000"]} style={styles.container}>
        {/* Center branding elements */}
        <View style={styles.centerContainer}>
          <Animated.Image
            entering={FadeIn.delay(300).duration(1000)}
            source={require("@/assets/images/app/splash.png")}
            style={styles.logo}
          />
        </View>

        {/* Bottom security badges */}
        <Animated.View entering={FadeIn.delay(800).duration(800)} style={styles.bottomContainer}>
          <Feather name="shield" size={16} color="#8E8E93" style={{ marginBottom: 10 }} />
          <Text style={styles.encryptedText}>SECURE • PRIVATE • ENCRYPTED</Text>
        </Animated.View>
      </LinearGradient>
    );
  }

  // Routing checks
  if (isFirstTime) {
    return <Redirect href={"/(onboarding)" as any} />;
  } else if (isAuthenticated) {
    return <Redirect href={"/(tabs)" as any} />;
  } else {
    return <Redirect href={"/(auth)/signin" as any} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 70,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 280,
    height: 310,
    resizeMode: "contain",
  },
  bottomContainer: {
    alignItems: "center",
  },
  encryptedText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 2.5,
    fontFamily: "System",
  },
});
