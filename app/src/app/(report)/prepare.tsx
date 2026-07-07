import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
  Linking,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const MISUSE_OPTIONS = [
  "Credit card or bank account fraud",
  "Tax evasion or government benefit fraud",
  "Medical services identity fraud",
  "Employment or utility account fraud",
  "Other identity misuse",
];

export default function PrepareReportInfoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const reportType = (params.type as string) || "ftc";
  const isFTC = reportType === "ftc";

  // Form states
  const [fullName, setFullName] = useState("Sentinel Zero-One");
  const [emailAddress, setEmailAddress] = useState("s*******@privacera.io");
  const [phone, setPhone] = useState("+1 (***) ***-****");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [incidentDetails, setIncidentDetails] = useState("");
  const [suspectedMisuse, setSuspectedMisuse] = useState("Credit card or bank account fraud");
  const [showMisuseDropdown, setShowMisuseDropdown] = useState(false);

  // Accounts affected tags
  const [accounts, setAccounts] = useState<string[]>(["Gmail", "Chase Bank"]);

  // Exposed data checkboxes (true = checked, false = unchecked)
  const [exposedData, setExposedData] = useState<Record<string, boolean>>({
    ssn: true,
    dob: true,
    license: false,
    passwords: false,
  });

  const handleToggleExposedData = (key: string) => {
    setExposedData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAddAccount = () => {
    Alert.prompt(
      "Add Account",
      "Enter the name of the affected service or institution (e.g. Wells Fargo, Netflix):",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add",
          onPress: (text?: string) => {
            if (text && text.trim()) {
              setAccounts((prev) => [...prev, text.trim()]);
            }
          },
        },
      ]
    );
  };

  const handleRemoveAccount = (accountName: string) => {
    setAccounts((prev) => prev.filter((acc) => acc !== accountName));
  };

  const handlePreviewSummary = () => {
    Alert.alert(
      "Report Summary",
      `PRIVACERA DIGITAL IDENTITY EXPOSURE REPORT\n\nNAME: ${fullName}\nEMAIL: ${emailAddress}\nMISUSE: ${suspectedMisuse}\nCOMPROMISED SECTORS: ${accounts.join(
        ", "
      )}\nEXPOSURES DETECTED: Email breaches, Address leaks, Mapped broker files.\n\nPayload securely ready for export.`
    );
  };

  const handleGoToPortal = () => {
    const url = isFTC ? "https://www.identitytheft.gov" : "https://www.ic3.gov";
    Alert.alert(
      "Redirecting to Official Authority",
      `You are being routed to ${isFTC ? "IdentityTheft.gov" : "IC3.gov"}. Use the prepared data payload to expedite your filing process.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Go to Site",
          onPress: () => {
            Linking.openURL(url).catch((err) =>
              Alert.alert("Error", "Could not open web browser.")
            );
          },
        },
      ]
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
          style={styles.profileButton}
          activeOpacity={0.7}
        >
          <Feather name="user" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            {isFTC ? "Prepare FTC Report Info" : "Prepare IC3 Report Info"}
          </Text>
          <Text style={styles.subtitle}>
            {isFTC
              ? "Collect the details you may need for IdentityTheft.gov."
              : "Collect the details you may need for FBI IC3."}
          </Text>
        </Animated.View>

        {/* ================= PERSONAL DETAILS ================= */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <Feather name="user" size={12} color="#8E8E93" style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>
          </View>

          {/* Full Name */}
          <Text style={styles.fieldLabel}>FULL NAME</Text>
          <TextInput
            style={styles.whiteInput}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
            placeholderTextColor="#8E8E93"
          />

          {/* Email Address */}
          <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
          <TextInput
            style={styles.whiteInput}
            value={emailAddress}
            onChangeText={setEmailAddress}
            placeholder="Enter email address"
            placeholderTextColor="#8E8E93"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Phone & Zip Code Row */}
          <View style={styles.row}>
            <View style={[styles.col, { marginRight: 12 }]}>
              <Text style={styles.fieldLabel}>PHONE</Text>
              <TextInput
                style={styles.whiteInput}
                value={phone}
                onChangeText={setPhone}
                placeholder="+1 (555) 555-5555"
                placeholderTextColor="#8E8E93"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>ZIP CODE</Text>
              <TextInput
                style={styles.whiteInput}
                value={zipCode}
                onChangeText={setZipCode}
                placeholder="Optional"
                placeholderTextColor="#8E8E93"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Street Address */}
          <Text style={styles.fieldLabel}>STREET ADDRESS (OPTIONAL)</Text>
          <TextInput
            style={styles.whiteInput}
            value={streetAddress}
            onChangeText={setStreetAddress}
            placeholder="Enter secure address"
            placeholderTextColor="#8E8E93"
          />
        </Animated.View>

        {/* ================= INCIDENT DETAILS ================= */}
        <Animated.View entering={FadeInDown.delay(150).duration(500)} style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <Feather name="activity" size={12} color="#8E8E93" style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>INCIDENT DETAILS</Text>
          </View>

          {/* What Happened */}
          <Text style={styles.fieldLabel}>WHAT HAPPENED?</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the incident with as much technical detail as possible..."
              placeholderTextColor="#48484A"
              multiline={true}
              numberOfLines={4}
              value={incidentDetails}
              onChangeText={setIncidentDetails}
              textAlignVertical="top"
            />
          </View>

          {/* Suspected Misuse Dropdown */}
          <Text style={styles.fieldLabel}>SUSPECTED IDENTITY MISUSE?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dropdownButton}
            onPress={() => setShowMisuseDropdown((prev) => !prev)}
          >
            <Text style={styles.dropdownButtonText}>{suspectedMisuse}</Text>
            <Feather name={showMisuseDropdown ? "chevron-up" : "chevron-down"} size={16} color="#8E8E93" />
          </TouchableOpacity>

          {showMisuseDropdown && (
            <View style={styles.dropdownList}>
              {MISUSE_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSuspectedMisuse(opt);
                    setShowMisuseDropdown(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dropdownItemText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Accounts Affected */}
          <Text style={styles.fieldLabel}>ACCOUNTS AFFECTED?</Text>
          <View style={styles.tagsContainer}>
            {accounts.map((acc) => (
              <View key={acc} style={styles.tag}>
                <Text style={styles.tagText}>{acc}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveAccount(acc)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Feather name="x" size={12} color="#8E8E93" style={{ marginLeft: 6 }} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.addTagButton}
              onPress={handleAddAccount}
            >
              <Text style={styles.addTagText}>+ Add Account</Text>
            </TouchableOpacity>
          </View>

          {/* Exposed Data Grid */}
          <Text style={styles.fieldLabel}>EXPOSED DATA INVOLVED</Text>
          <View style={styles.checkboxGrid}>
            {/* Row 1 */}
            <View style={styles.checkboxRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.checkboxItem}
                onPress={() => handleToggleExposedData("ssn")}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    exposedData.ssn ? styles.checkboxBoxChecked : styles.checkboxBoxUnchecked,
                  ]}
                >
                  {exposedData.ssn && <Feather name="check" size={10} color="#000000" />}
                </View>
                <Text style={styles.checkboxLabel}>SSN</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.checkboxItem}
                onPress={() => handleToggleExposedData("dob")}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    exposedData.dob ? styles.checkboxBoxChecked : styles.checkboxBoxUnchecked,
                  ]}
                >
                  {exposedData.dob && <Feather name="check" size={10} color="#000000" />}
                </View>
                <Text style={styles.checkboxLabel}>Date of Birth</Text>
              </TouchableOpacity>
            </View>

            {/* Row 2 */}
            <View style={styles.checkboxRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.checkboxItem}
                onPress={() => handleToggleExposedData("license")}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    exposedData.license ? styles.checkboxBoxChecked : styles.checkboxBoxUnchecked,
                  ]}
                >
                  {exposedData.license && <Feather name="check" size={10} color="#000000" />}
                </View>
                <Text style={styles.checkboxLabel}>Drivers License</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.checkboxItem}
                onPress={() => handleToggleExposedData("passwords")}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    exposedData.passwords ? styles.checkboxBoxChecked : styles.checkboxBoxUnchecked,
                  ]}
                >
                  {exposedData.passwords && <Feather name="check" size={10} color="#000000" />}
                </View>
                <Text style={styles.checkboxLabel}>Passwords</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* ================= EXPOSURE SUMMARY ================= */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.formSection}>
          <View style={styles.summaryHeaderRow}>
            <View style={styles.summaryHeaderLeft}>
              <Feather name="alert-triangle" size={12} color="#FF453A" style={{ marginRight: 6 }} />
              <Text style={styles.summaryTitle}>EXPOSURE SUMMARY</Text>
            </View>
            <Text style={styles.autoDetectedText}>AUTO-DETECTED</Text>
          </View>

          {/* Leak 1 */}
          <View style={styles.exposureCard}>
            <View style={[styles.circleBadge, styles.redBadge]}>
              <Feather name="at-sign" size={14} color="#FFFFFF" />
            </View>
            <View style={styles.exposureCardContent}>
              <Text style={styles.exposureCardTitle}>Email breach found</Text>
              <Text style={styles.exposureCardSub}>Linked to "Collection #1" dump</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Alert.alert("Breach Info", "Found on major dark web leak index. Action recommended.")}
            >
              <Feather name="info" size={16} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          {/* Leak 2 */}
          <View style={styles.exposureCard}>
            <View style={[styles.circleBadge, styles.orangeBadge]}>
              <Feather name="map-pin" size={14} color="#FFFFFF" />
            </View>
            <View style={styles.exposureCardContent}>
              <Text style={styles.exposureCardTitle}>Address exposed</Text>
              <Text style={styles.exposureCardSub}>Found in 2 recent data aggregators</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Alert.alert("Address Info", "Listed publicly on Whitepages and FastPeopleSearch.")}
            >
              <Feather name="info" size={16} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          {/* Leak 3 */}
          <View style={styles.exposureCard}>
            <View style={[styles.circleBadge, styles.greenBadge]}>
              <Feather name="database" size={14} color="#FFFFFF" />
            </View>
            <View style={styles.exposureCardContent}>
              <Text style={styles.exposureCardTitle}>Broker profiles detected</Text>
              <Text style={styles.exposureCardSub}>12 public profiles mapped to Identity</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Alert.alert("Broker Info", "Detailed people finder records matching this biometric identity profile.")}
            >
              <Feather name="info" size={16} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Subtle Watermark Fingerprint at bottom */}
        <Animated.View entering={FadeInDown.delay(250).duration(600)} style={styles.watermarkWrapper}>
          <MaterialCommunityIcons name="fingerprint" size={120} color="rgba(255, 255, 255, 0.02)" />
        </Animated.View>

        {/* Bottom buttons */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.primaryButton}
            onPress={handlePreviewSummary}
          >
            <Text style={styles.primaryButtonText}>Preview Report Summary</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.outlineButton}
            onPress={handleGoToPortal}
          >
            <Text style={styles.outlineButtonText}>
              {isFTC ? "Go to IdentityTheft.gov" : "Go to FBI IC3 Portal"}
            </Text>
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
  profileButton: {
    paddingHorizontal: 20,
    paddingVertical: 4,
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
  formSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    paddingBottom: 8,
  },
  sectionTitle: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    fontFamily: "System",
  },
  fieldLabel: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "System",
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  whiteInput: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
  },
  textAreaContainer: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    minHeight: 100,
    marginBottom: 16,
  },
  textArea: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13.5,
    fontFamily: "System",
    padding: 0,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  dropdownButtonText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontFamily: "System",
  },
  dropdownList: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: -8,
    marginBottom: 16,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1E",
  },
  dropdownItemText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "System",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 16,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  addTagButton: {
    backgroundColor: "transparent",
    borderColor: "#3E3E42",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  addTagText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "System",
  },
  checkboxGrid: {
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  checkboxItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxBoxChecked: {
    backgroundColor: "#FFFFFF",
  },
  checkboxBoxUnchecked: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#3E3E42",
  },
  checkboxLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "System",
  },

  summaryHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    paddingBottom: 8,
  },
  summaryHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryTitle: {
    color: "#FF453A",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    fontFamily: "System",
  },
  autoDetectedText: {
    color: "#8E8E93",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  exposureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  circleBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  redBadge: {
    backgroundColor: "rgba(255, 69, 58, 0.15)",
    borderColor: "rgba(255, 69, 58, 0.25)",
    borderWidth: 1,
  },
  orangeBadge: {
    backgroundColor: "rgba(255, 159, 10, 0.15)",
    borderColor: "rgba(255, 159, 10, 0.25)",
    borderWidth: 1,
  },
  greenBadge: {
    backgroundColor: "rgba(48, 209, 88, 0.15)",
    borderColor: "rgba(48, 209, 88, 0.25)",
    borderWidth: 1,
  },
  exposureCardContent: {
    flex: 1,
  },
  exposureCardTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 2,
  },
  exposureCardSub: {
    color: "#8E8E93",
    fontSize: 11.5,
    fontFamily: "System",
  },

  watermarkWrapper: {
    alignItems: "center",
    marginVertical: 16,
  },

  buttonContainer: {
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#3E3E42",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  outlineButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
  },
});
