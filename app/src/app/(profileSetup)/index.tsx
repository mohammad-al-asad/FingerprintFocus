import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

interface PrivacyCardProps {
  title: string;
  description: string;
  iconName: React.ComponentProps<typeof Feather>["name"];
}

function PrivacyCard({ title, description, iconName }: PrivacyCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Feather name={iconName} size={22} color="#FFFFFF" />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );
}

export default function ProfileSetupIntroScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/(profileSetup)/identity" as any);
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.content}>
          {/* Headline and Description */}
          <Text style={styles.title}>Your privacy profile stays protected</Text>
          <Text style={styles.subtitle}>
            We use your details only to detect public exposure, generate your report, and support remove requests.
          </Text>

          {/* Cards List */}
          <View style={styles.cardsList}>
            <PrivacyCard
              title="Encrypted data storage"
              description="AES-256 military-grade encryption for all stored identifiers."
              iconName="shield"
            />
            <PrivacyCard
              title="You control your profile"
              description="Instant deletion of all personal data upon account closure."
              iconName="user"
            />
            <PrivacyCard
              title="No selling personal information"
              description="We are a privacy service, not a data broker. Your info is never for sale."
              iconName="slash"
            />
            <PrivacyCard
              title="Secure exposure scanning"
              description="Scanning algorithms run in isolated sandboxes to prevent leaks."
              iconName="cpu"
            />
          </View>

          {/* Bottom elements */}
          <View style={styles.footerContainer}>
            <Button
              title="Continue"
              onPress={handleContinue}
              style={styles.continueButton}
            />
            <View style={styles.badgeContainer}>
              <Feather name="shield" size={14} color="#8E8E93" style={{ marginRight: 6 }} />
              <Text style={styles.badgeText}>SECURE END-TO-END CONNECTION ACTIVE</Text>
            </View>
          </View>
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
    flexGrow: 1,
    paddingBottom: 32,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
    marginBottom: 12,
    fontFamily: "System",
  },
  subtitle: {
    color: "#A0A0A5",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: "System",
  },
  cardsList: {
    marginBottom: 32,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    alignItems: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    fontFamily: "System",
  },
  cardDescription: {
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  continueButton: {
    width: "100%",
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#48484A",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
});
