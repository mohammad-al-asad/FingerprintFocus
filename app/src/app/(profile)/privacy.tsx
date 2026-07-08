import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function PrivacyControlsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const type = (params.type as string) || "privacy";
  const isPrivacy = type === "privacy";

  const handleExportData = () => {
    Alert.alert(
      "Export Data",
      "We will compile your encrypted profile data and scan history into a secure JSON packet. This will be sent to your registered email address.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Request Export", onPress: () => Alert.alert("Success", "Export request received. You will receive an email shortly.") }
      ]
    );
  };

  const handleDeleteData = () => {
    Alert.alert(
      "Delete All Data?",
      "This action is irreversible. All your scan history, data removal logs, and profile info will be permanently purged from our secure servers.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Data",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "All personal data has been completely erased.");
            router.replace("/(auth)" as any);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isPrivacy ? "PRIVACY POLICY" : "TERMS OF SERVICE"}</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title / Description */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>{isPrivacy ? "Privacy Policy" : "Terms of Service"}</Text>
          <Text style={styles.subtitle}>
            {isPrivacy
              ? "Review our data privacy standards and encryption practices."
              : "Review our legal agreements and automated service options."}
          </Text>
        </Animated.View>

        {isPrivacy ? (
          <>
            {/* Privacy Policy Block */}
            <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Feather name="file-text" size={16} color="#FFFFFF" style={{ marginRight: 10 }} />
                <Text style={styles.sectionCardTitle}>Privacy Policy</Text>
              </View>
              <Text style={styles.legalParagraph}>
                1. <Text style={styles.boldWhite}>Data Collection:</Text> We collect names, aliases, phone numbers, and addresses solely to scan public directories and data broker databases for public exposure.
              </Text>
              <Text style={styles.legalParagraph}>
                2. <Text style={styles.boldWhite}>No Third-Party Sharing:</Text> We do not monetize, rent, or trade your digital fingerprint data. Any connection to public brokers is handled via secure proxy requests.
              </Text>
              <Text style={styles.legalParagraph}>
                3. <Text style={styles.boldWhite}>On-Demand Removal:</Text> Initiating a removal request issues automated take-down tickets to broker directories. You retain full ownership of these tickets.
              </Text>
            </Animated.View>
          </>
        ) : (
          <>
            {/* Terms of Service Block */}
            <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Feather name="check-square" size={16} color="#FFFFFF" style={{ marginRight: 10 }} />
                <Text style={styles.sectionCardTitle}>Terms of Service</Text>
              </View>
              <Text style={styles.legalParagraph}>
                1. <Text style={styles.boldWhite}>Authorized Use:</Text> You certify that any email addresses, phone numbers, or physical addresses submitted for scanning belong exclusively to you or individuals who have explicitly authorized you.
              </Text>
              <Text style={styles.legalParagraph}>
                2. <Text style={styles.boldWhite}>Automated Agent Representation:</Text> Activating a Data Removal Request authorizes our system to sign and transmit directory opt-out requests on your behalf.
              </Text>
            </Animated.View>
          </>
        )}
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
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  headerRightPlaceholder: {
    width: 56,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  titleSection: {
    marginBottom: 24,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 8,
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
  },
  securityBanner: {
    flexDirection: "row",
    backgroundColor: "rgba(48, 209, 88, 0.05)",
    borderColor: "rgba(48, 209, 88, 0.15)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 4,
  },
  bannerText: {
    color: "#A0A0A5",
    fontSize: 12,
    lineHeight: 17,
    fontFamily: "System",
  },
  sectionCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    paddingBottom: 10,
  },
  sectionCardTitle: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  legalParagraph: {
    color: "#A0A0A5",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
    marginBottom: 12,
  },
  boldWhite: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  controlCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  controlHeader: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    fontFamily: "System",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    height: 52,
  },
  controlRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlRowText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    width: "100%",
  },
});
