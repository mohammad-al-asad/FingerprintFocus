import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ProfileStep from "@/components/ui/ProfileStep";

const maskEmail = (email: string) => {
  if (!email) return "None provided";
  const [local, domain] = email.split("@");
  if (!domain) return email;
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
};

const maskPhone = (phone: string) => {
  if (!phone) return "None provided";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;
  const lastFour = digits.slice(-4);
  return `+1 (***) ***-${lastFour}`;
};

const { width } = Dimensions.get("window");

export default function ProfileSetupIdentityScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);

  // Form State - Step 1: Basic Identity
  const [fullName, setFullName] = useState("Johnathan Doe");
  const [ageRange, setAgeRange] = useState("Select age range");
  const [country, setCountry] = useState("United States");
  const [stateRegion, setStateRegion] = useState("");

  // Form State - Step 2: Contact Details
  const [primaryEmail, setPrimaryEmail] = useState("johnathan@privacera.com");
  const [additionalEmail, setAdditionalEmail] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [additionalPhone, setAdditionalPhone] = useState("");

  // Form State - Step 3: Address Details
  const [currentAddress, setCurrentAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateRegionAddress, setStateRegionAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [previousAddress, setPreviousAddress] = useState("");

  // Form State - Step 4: Scan Settings
  const [autoSweep, setAutoSweep] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const steps = [
    { key: "step1" },
    { key: "step2" },
    { key: "step3" },
    { key: "step4" },
  ];

  const handleSelectAge = () => {
    Alert.alert("Select Age Range", "Choose your age range:", [
      { text: "Under 18", onPress: () => setAgeRange("Under 18") },
      { text: "18 - 25", onPress: () => setAgeRange("18 - 25") },
      { text: "26 - 35", onPress: () => setAgeRange("26 - 35") },
      { text: "36 - 45", onPress: () => setAgeRange("36 - 45") },
      { text: "46 - 60", onPress: () => setAgeRange("46 - 60") },
      { text: "60+", onPress: () => setAgeRange("60+") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleSelectCountry = () => {
    Alert.alert("Select Country", "Choose your country:", [
      { text: "United States", onPress: () => setCountry("United States") },
      { text: "Canada", onPress: () => setCountry("Canada") },
      { text: "United Kingdom", onPress: () => setCountry("United Kingdom") },
      { text: "Australia", onPress: () => setCountry("Australia") },
      { text: "Germany", onPress: () => setCountry("Germany") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleContinue = () => {
    if (currentStep < 3) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      flatListRef.current?.scrollToIndex({ index: nextStep, animated: true });
    } else {
      router.push("/(profileSetup)/scanning" as any);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      flatListRef.current?.scrollToIndex({ index: prevStep, animated: true });
    } else {
      router.back();
    }
  };

  const handleSkip = () => {
    router.replace("/(tabs)" as any);
  };

  // Render Helpers for Form Steps
  const renderStep1 = () => (
    <View style={{ width: width - 40 }}>
      {/* Full Legal Name */}
      <Input
        label="FULL LEGAL NAME"
        labelStyle={styles.inputLabel}
        placeholder="Johnathan Doe"
        value={fullName}
        onChangeText={setFullName}
        containerStyle={{ marginBottom: 16 }}
      />

      {/* Date of Birth Dropdown */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleSelectAge}>
        <Input
          label="DATE OF BIRTH OR AGE RANGE (OPTIONAL)"
          labelStyle={styles.inputLabel}
          value={ageRange}
          editable={false}
          pointerEvents="none"
          rightIcon={<Feather name="chevron-down" size={20} color="#8E8E93" style={{ marginRight: 8 }} />}
          containerStyle={{ marginBottom: 16 }}
        />
      </TouchableOpacity>

      {/* Country Dropdown */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleSelectCountry}>
        <Input
          label="COUNTRY"
          labelStyle={styles.inputLabel}
          value={country}
          editable={false}
          pointerEvents="none"
          rightIcon={<Feather name="chevron-down" size={20} color="#8E8E93" style={{ marginRight: 8 }} />}
          containerStyle={{ marginBottom: 16 }}
        />
      </TouchableOpacity>

      {/* State / Region Input */}
      <Input
        label="STATE / REGION"
        labelStyle={styles.inputLabel}
        placeholder="e.g. California"
        value={stateRegion}
        onChangeText={setStateRegion}
        containerStyle={{ marginBottom: 20 }}
      />

      {/* Scan Matching Info line */}
      <View style={styles.infoRow}>
        <Feather name="info" size={16} color="#8E8E93" style={{ marginRight: 8, marginTop: 1 }} />
        <Text style={styles.infoRowText}>
          More accurate details can improve scan matching.
        </Text>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={{ width: width - 40 }}>
      {/* Email Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>EMAIL ADDRESSES</Text>
        <TouchableOpacity onPress={() => Alert.alert("Why we ask", "We scan data brokers and breach logs using your email to locate leaks.")}>
          <Text style={styles.sectionInfoLink}>Why we ask</Text>
        </TouchableOpacity>
      </View>

      {/* Primary Email */}
      <Input
        placeholder="Primary email address"
        value={primaryEmail}
        onChangeText={setPrimaryEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        rightIcon={<Feather name="at-sign" size={18} color="#48484A" style={{ marginRight: 8 }} />}
        containerStyle={{ marginBottom: 12 }}
      />

      {/* Additional Email */}
      <Input
        placeholder="Additional email address (Optional)"
        value={additionalEmail}
        onChangeText={setAdditionalEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        containerStyle={{ marginBottom: 20 }}
      />

      {/* Phone Section Header */}
      <Text style={styles.sectionLabel}>PHONE NUMBERS</Text>

      {/* Primary Phone */}
      <Input
        placeholder="Primary phone number"
        value={primaryPhone}
        onChangeText={setPrimaryPhone}
        keyboardType="phone-pad"
        rightIcon={<Feather name="smartphone" size={18} color="#48484A" style={{ marginRight: 8 }} />}
        containerStyle={{ marginBottom: 12 }}
      />

      {/* Additional Phone */}
      <Input
        placeholder="Additional phone number (Optional)"
        value={additionalPhone}
        onChangeText={setAdditionalPhone}
        keyboardType="phone-pad"
        containerStyle={{ marginBottom: 20 }}
      />

      {/* Encryption Warning card */}
      <View style={styles.disclaimerCard}>
        <Feather name="shield" size={18} color="#30D158" style={{ marginRight: 14 }} />
        <Text style={styles.disclaimerText}>
          All contact data is encrypted locally before being compared against breach databases.
        </Text>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={{ width: width - 40 }}>
      {/* Current Address */}
      <Input
        label="Current address (Optional)"
        labelStyle={styles.inputLabel}
        placeholder="123 Security Lane"
        value={currentAddress}
        onChangeText={setCurrentAddress}
        containerStyle={{ marginBottom: 16 }}
      />

      {/* City & State Row */}
      <View style={styles.formRow}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <Input
            label="City"
            labelStyle={styles.inputLabel}
            placeholder="San Francisco"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="State / region"
            labelStyle={styles.inputLabel}
            placeholder="CA"
            value={stateRegionAddress}
            onChangeText={setStateRegionAddress}
          />
        </View>
      </View>

      {/* ZIP Code */}
      <Input
        label="ZIP / postal code"
        labelStyle={styles.inputLabel}
        placeholder="94103"
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="number-pad"
        containerStyle={{ marginBottom: 16, marginTop: 16 }}
      />

      {/* Previous Address */}
      <Input
        label="Previous address (Optional)"
        labelStyle={styles.inputLabel}
        placeholder="Optional former residency"
        value={previousAddress}
        onChangeText={setPreviousAddress}
        containerStyle={{ marginBottom: 20 }}
      />

      {/* Encryption Warning card */}
      <View style={styles.disclaimerCard}>
        <Feather name="lock" size={18} color="#FFFFFF" style={{ marginRight: 14 }} />
        <Text style={styles.disclaimerText}>
          Address information is encrypted and only used for exposure matching.
        </Text>
      </View>
    </View>
  );

  const editStep = (index: number) => {
    setCurrentStep(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const renderStep4 = () => {
    const hasAddress = currentAddress || city || stateRegionAddress;
    const addressText = hasAddress
      ? `${currentAddress}${city ? ", " + city : ""}${stateRegionAddress ? ", " + stateRegionAddress : ""}`
      : "None provided";

    const hasOptional = additionalEmail || additionalPhone || previousAddress;
    const optionalText = hasOptional
      ? [
          additionalEmail && "Additional Email",
          additionalPhone && "Additional Phone",
          previousAddress && "Previous Address",
        ]
          .filter(Boolean)
          .join(", ")
      : "No additional data provided";

    return (
      <View style={{ width: width - 40 }}>
        {/* Legal Name */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewLabel}>LEGAL NAME</Text>
            <Text style={styles.reviewValue}>{fullName || "None provided"}</Text>
          </View>
          <TouchableOpacity onPress={() => editStep(0)} activeOpacity={0.6}>
            <Text style={styles.editLink}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Email Addresses */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewLabel}>EMAIL ADDRESSES</Text>
            <Text style={styles.reviewValue}>{maskEmail(primaryEmail)}</Text>
            {additionalEmail ? (
              <Text style={[styles.reviewValue, { marginTop: 4 }]}>{maskEmail(additionalEmail)}</Text>
            ) : null}
          </View>
          <TouchableOpacity onPress={() => editStep(1)} activeOpacity={0.6}>
            <Text style={styles.editLink}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Phone Numbers */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewLabel}>PHONE NUMBERS</Text>
            <Text style={styles.reviewValue}>{maskPhone(primaryPhone)}</Text>
            {additionalPhone ? (
              <Text style={[styles.reviewValue, { marginTop: 4 }]}>{maskPhone(additionalPhone)}</Text>
            ) : null}
          </View>
          <TouchableOpacity onPress={() => editStep(1)} activeOpacity={0.6}>
            <Text style={styles.editLink}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Primary Address */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewLabel}>PRIMARY ADDRESS</Text>
            <Text style={styles.reviewValue}>{addressText}</Text>
          </View>
          <TouchableOpacity onPress={() => editStep(2)} activeOpacity={0.6}>
            <Text style={styles.editLink}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Optional Identifiers */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewLabel}>OPTIONAL IDENTIFIERS</Text>
            <Text style={styles.reviewValue}>{optionalText}</Text>
          </View>
          <TouchableOpacity onPress={() => editStep(2)} activeOpacity={0.6}>
            <Text style={styles.editLink}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Encrypted Transit Warning card */}
        <View style={styles.encryptedTransitCard}>
          <Feather name="check-circle" size={18} color="#30D158" style={{ marginRight: 14, marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.encryptedTransitTitle}>Encrypted Transit</Text>
            <Text style={styles.encryptedTransitText}>
              Your data is masked and transmitted via AES-256 encrypted tunnels. Only you hold the decryption key.
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: { key: string } }) => {
    switch (item.key) {
      case "step1":
        return (
          <ProfileStep
            title="Basic identity"
            subtitle="Add the details we'll use to match public exposure."
          >
            {renderStep1()}
          </ProfileStep>
        );
      case "step2":
        return (
          <ProfileStep
            title="Contact details"
            subtitle="We'll scan for public exposure linked to your email and phone."
          >
            {renderStep2()}
          </ProfileStep>
        );
      case "step3":
        return (
          <ProfileStep
            title="Address details"
            subtitle="Addresses are optional, but they help identify broker profiles more accurately."
          >
            {renderStep3()}
          </ProfileStep>
        );
      case "step4":
        return (
          <ProfileStep
            title="Review your scan profile"
            subtitle="Confirm these details before we scan public sources for your personal data."
          >
            {renderStep4()}
          </ProfileStep>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Custom Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROFILE SETUP</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Background Fingerprint */}
      <Image
        source={require("@/assets/images/app/fingerprint.png")}
        style={styles.fingerprintBg}
      />

      <Animated.View entering={FadeInDown.delay(100).duration(600)} style={{ flex: 1 }}>
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>STEP {currentStep + 1} OF 4</Text>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressSegment,
              currentStep >= 0 && styles.segmentActive,
              currentStep === 0 && styles.segmentCurrent
            ]} />
            <View style={[
              styles.progressSegment,
              currentStep >= 1 && styles.segmentActive,
              currentStep === 1 && styles.segmentCurrent
            ]} />
            <View style={[
              styles.progressSegment,
              currentStep >= 2 && styles.segmentActive,
              currentStep === 2 && styles.segmentCurrent
            ]} />
            <View style={[
              styles.progressSegment,
              currentStep >= 3 && styles.segmentActive,
              currentStep === 3 && styles.segmentCurrent
            ]} />
          </View>
        </View>

        {/* Swipeable form contents */}
        <FlatList
          ref={flatListRef}
          data={steps}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          style={{ flex: 1 }}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title= "CONTINUE"
            onPress={handleContinue}
            style={styles.continueButton}
          />
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton} activeOpacity={0.6}>
            <Text style={styles.skipButtonText}>SKIP FOR NOW</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1E",
    paddingBottom: 16,
    width: "100%",
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
  fingerprintBg: {
    position: "absolute",
    alignSelf: "center",
    width: 280,
    height: 280,
    opacity: 0.03,
    resizeMode: "contain",
    top: 130,
    zIndex: -1,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 20,
  },
  stepText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
  },
  progressBar: {
    flexDirection: "row",
  },
  progressSegment: {
    width: 16,
    height: 3,
    backgroundColor: "#2C2C2E",
    borderRadius: 1.5,
    marginLeft: 6,
  },
  segmentActive: {
    backgroundColor: "#FFFFFF",
  },
  segmentCurrent: {
    width: 36,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8E8E93",
    marginBottom: 8,
    letterSpacing: 1,
    fontFamily: "System",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 2,
    marginTop: 8,
  },
  infoRowText: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8E8E93",
    letterSpacing: 1,
    fontFamily: "System",
    marginBottom: 8,
  },
  sectionInfoLink: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "600",
    textDecorationLine: "underline",
    fontFamily: "System",
  },
  disclaimerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  disclaimerText: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
  },
  formRow: {
    flexDirection: "row",
    width: "100%",
  },
  sectionDescription: {
    color: "#8E8E93",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    fontFamily: "System",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  toggleContent: {
    flex: 1,
    marginRight: 16,
  },
  toggleTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    fontFamily: "System",
  },
  toggleDesc: {
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
  },
  switchTrack: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#2C2C2E",
    padding: 2,
    justifyContent: "center",
  },
  switchTrackActive: {
    backgroundColor: "#30D158",
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  switchThumbActive: {
    alignSelf: "flex-end",
  },
  footer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 36 : 24,
    paddingTop: 12,
  },
  continueButton: {
    width: "100%",
    marginBottom: 16,
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipButtonText: {
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
  },
  reviewCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  reviewLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8E8E93",
    letterSpacing: 1,
    fontFamily: "System",
  },
  reviewValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    fontFamily: "System",
  },
  editLink: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    textDecorationLine: "underline",
    fontFamily: "System",
  },
  encryptedTransitCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(48, 209, 88, 0.05)",
    borderColor: "rgba(48, 209, 88, 0.12)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  encryptedTransitTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
    fontFamily: "System",
  },
  encryptedTransitText: {
    color: "#8E8E93",
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: "System",
  },
});
