import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";

interface PrivacyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function PrivacyCard({ title, description, icon }: PrivacyCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {icon}
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
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    router.push("/(profileSetup)/identity" as any);
  };

  return (
    <View style={styles.container}>
      {/* Standard header containing logo */}
      <Header />

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 }
        ]} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.content}>
          {/* Headline and Description */}
          <Text style={styles.title}>Your privacy profile</Text>
          <Text style={styles.subtitle}>
            We use your details only to detect public exposure, generate your report, and support data removal requests.
          </Text>

          {/* Cards List */}
          <View style={styles.cardsList}>
            <PrivacyCard
              title="Encrypted data storage"
              description="Safety first. We use AES-256 military-grade encryption for all stored identifiers."
              icon={<MaterialCommunityIcons name="shield-check" size={20} color="#FFFFFF" />}
            />
            <PrivacyCard
              title="You control your profile"
              description="Delete your profile and personal data at any time."
              icon={<Feather name="user" size={18} color="#FFFFFF" />}
            />
            <PrivacyCard
              title="Data is never sold"
              description="Your info is never for sale. Ever."
              icon={<MaterialCommunityIcons name="cancel" size={18} color="#FFFFFF" />}
            />
            <PrivacyCard
              title="Protected process"
              description="Scans for your digital fingerprint run in protected environments to help prevent leaks."
              icon={<Feather name="shield" size={18} color="#FFFFFF" />}
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
              <Feather name="lock" size={12} color="#48484A" style={{ marginRight: 6 }} />
              <Text style={styles.badgeText}>SECURE END-TO-END CONNECTION</Text>
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
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 34,
    marginBottom: 12,
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#A0A0A5",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: "System",
  },
  cardsList: {
    marginBottom: 24,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(22, 22, 26, 0.45)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
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
    fontSize: 15,
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
    marginTop: 12,
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
