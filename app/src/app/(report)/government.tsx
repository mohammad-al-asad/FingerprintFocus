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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function GovernmentReportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handlePrepareFTC = () => {
    Alert.alert(
      "FTC Payload Prepared",
      "We have organized your exposed PII findings (name, addresses, email breaches) into a structured text document. You can now use this to file a report on IdentityTheft.gov.",
      [{ text: "OK" }]
    );
  };

  const handlePrepareIC3 = () => {
    Alert.alert(
      "FBI IC3 Payload Prepared",
      "Privacera has prepared a compiled packet containing details of your public broker findings and digital leaks for filing a cybercrime complaint with the FBI IC3 portal.",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Feather name="chevron-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PRIVACERA</Text>
        </View>
        <TouchableOpacity
          style={styles.shieldButton}
          activeOpacity={0.7}
          onPress={() => Alert.alert("Security Info", "All prepared report packets are encrypted with AES-256 local keys.")}
        >
          <Feather name="shield" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>Report Serious Exposure</Text>
          <Text style={styles.subtitle}>
            Vigilant response is your primary defense against identity compromise.
          </Text>
        </Animated.View>

        {/* Info Box Callout */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.infoCallout}>
          <View style={styles.infoIconWrapper}>
            <Feather name="info" size={15} color="#FFFFFF" />
          </View>
          <Text style={styles.infoCalloutText}>
            We can help you prepare information for an official report. You may submit identity theft
            concerns to <Text style={styles.boldWhite}>IdentityTheft.gov</Text> by the FTC or cybercrime
            complaints to the <Text style={styles.boldWhite}>FBI IC3</Text>.
          </Text>
        </Animated.View>

        {/* FTC / IdentityTheft Card */}
        <Animated.View entering={FadeInDown.delay(150).duration(500)} style={styles.authorityCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="shield-check-outline" size={22} color="#FFFFFF" />
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>IdentityTheft.gov / FTC</Text>
              <Text style={styles.cardSub}>GOVERNMENT AUTHORITY</Text>
            </View>
          </View>

          <View style={styles.bulletList}>
            <View style={styles.bulletRow}>
              <Feather name="check-circle" size={14} color="#30D158" style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Identity theft</Text>
            </View>
            <View style={styles.bulletRow}>
              <Feather name="check-circle" size={14} color="#30D158" style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Fraudulent accounts</Text>
            </View>
            <View style={styles.bulletRow}>
              <Feather name="check-circle" size={14} color="#30D158" style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Financial identity misuse</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.actionButton}
            onPress={() => router.push({ pathname: "/prepare", params: { type: "ftc" } } as any)}
          >
            <Text style={styles.actionButtonText}>PREPARE FTC REPORT INFO</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* FBI IC3 Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.authorityCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, styles.fbiIconBox]}>
              <MaterialCommunityIcons name="shield-alert-outline" size={22} color="#FF453A" />
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>FBI IC3</Text>
              <Text style={styles.cardSub}>FEDERAL BUREAU OF INVESTIGATION</Text>
            </View>
          </View>

          <View style={styles.bulletList}>
            <View style={styles.bulletRow}>
              <Feather name="alert-circle" size={14} color="#FF9F0A" style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Internet fraud</Text>
            </View>
            <View style={styles.bulletRow}>
              <Feather name="alert-circle" size={14} color="#FF9F0A" style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Online scams</Text>
            </View>
            <View style={styles.bulletRow}>
              <Feather name="alert-circle" size={14} color="#FF9F0A" style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Cybercrime & Financial loss</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.actionButton}
            onPress={() => router.push({ pathname: "/prepare", params: { type: "ic3" } } as any)}
          >
            <Text style={styles.actionButtonText}>PREPARE IC3 REPORT INFO</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer text */}
        <Animated.Text entering={FadeInDown.delay(250).duration(500)} style={styles.footerText}>
          Reporting serious exposure is a critical step in mitigating long-term risk. Privacera
          organizes your digital footprint data to expedite the official filing process.
        </Animated.Text>
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
  },
  backButton: {
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 4,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  shieldButton: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  titleSection: {
    marginBottom: 20,
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
  infoCallout: {
    flexDirection: "row",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  infoIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 1,
  },
  infoCalloutText: {
    color: "#8E8E93",
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: "System",
    flex: 1,
  },
  boldWhite: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  authorityCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  fbiIconBox: {
    borderColor: "rgba(255, 69, 58, 0.1)",
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 2,
  },
  cardSub: {
    color: "#8E8E93",
    fontSize: 9.5,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  bulletList: {
    marginBottom: 20,
    paddingLeft: 2,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bulletIcon: {
    marginRight: 10,
  },
  bulletText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontFamily: "System",
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  actionButtonText: {
    color: "#000000",
    fontSize: 12.5,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  footerText: {
    color: "#48484A",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    fontFamily: "System",
    marginTop: 8,
    paddingHorizontal: 16,
  },
});
