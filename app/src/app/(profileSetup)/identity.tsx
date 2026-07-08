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
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
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

  // Form State - Pre-populated with mockup values for perfect presentation
  // Step 1: Basic Identity
  const [fullName, setFullName] = useState("Johnathan Doe");
  const [dateOfBirth, setDateOfBirth] = useState("Select date of birth");
  const [country, setCountry] = useState("United States");
  const [stateRegion, setStateRegion] = useState("California");

  // Step 2: Contact Details
  const [primaryEmail, setPrimaryEmail] = useState("johnathan@example.com");
  const [additionalEmail, setAdditionalEmail] = useState("john2@work.com");
  const [primaryPhone, setPrimaryPhone] = useState("4155554567");
  const [additionalPhone, setAdditionalPhone] = useState("");

  // Step 3: Address Details
  const [currentAddress, setCurrentAddress] = useState("123 Security Lane");
  const [city, setCity] = useState("San Francisco");
  const [stateRegionAddress, setStateRegionAddress] = useState("CA");
  const [zipCode, setZipCode] = useState("94103");
  const [previousAddress, setPreviousAddress] = useState("");

  const steps = [
    { key: "step1" },
    { key: "step2" },
    { key: "step3" },
    { key: "step4" },
  ];

  const handleSelectDateOfBirth = () => {
    Alert.alert("Select Date of Birth", "Choose a year:", [
      { text: "1990", onPress: () => setDateOfBirth("January 15, 1990") },
      { text: "1995", onPress: () => setDateOfBirth("May 22, 1995") },
      { text: "2000", onPress: () => setDateOfBirth("September 10, 2000") },
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

  const handleWhyWeAsk = () => {
    Alert.alert(
      "Why we ask",
      "We use your contact details to scan public exposure sources, directories, and data broker catalogs for matching profiles."
    );
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

  const editStep = (index: number) => {
    setCurrentStep(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  // Render Helpers for Form Steps
  const renderStep1 = () => (
    <View style={styles.formStepContainer}>
      {/* Full Name */}
      <Input
        label="FULL NAME"
        labelStyle={styles.inputLabel}
        placeholder="Johnathan Doe"
        value={fullName}
        onChangeText={setFullName}
        containerStyle={{ marginBottom: 16 }}
      />

      {/* Date of Birth Dropdown */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleSelectDateOfBirth}>
        <Input
          label="DATE OF BIRTH (OPTIONAL)"
          labelStyle={styles.inputLabel}
          value={dateOfBirth}
          editable={false}
          pointerEvents="none"
          rightIcon={<Feather name="chevron-down" size={18} color="#8E8E93" style={{ marginRight: 8 }} />}
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
          rightIcon={<Feather name="chevron-down" size={18} color="#8E8E93" style={{ marginRight: 8 }} />}
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

      {/* Helper matching text */}
      <View style={styles.infoRow}>
        <Feather name="info" size={14} color="#8E8E93" style={{ marginRight: 8, marginTop: 2 }} />
        <Text style={styles.infoRowText}>
          Extra details can improve matching.
        </Text>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.formStepContainer}>
      {/* Email Addresses */}
      <Input
        label="EMAIL ADDRESSES"
        labelStyle={styles.inputLabel}
        rightLabel={
          <TouchableOpacity onPress={handleWhyWeAsk}>
            <Text style={styles.sectionInfoLink}>Why we ask</Text>
          </TouchableOpacity>
        }
        placeholder="Primary email address"
        value={primaryEmail}
        onChangeText={setPrimaryEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        rightIcon={<MaterialCommunityIcons name="at" size={18} color="#48484A" style={{ marginRight: 8 }} />}
        containerStyle={{ marginBottom: 12 }}
      />

      <Input
        placeholder="Additional email address (Optional)"
        value={additionalEmail}
        onChangeText={setAdditionalEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        containerStyle={{ marginBottom: 20 }}
      />

      {/* Phone Numbers */}
      <Input
        label="PHONE NUMBERS"
        labelStyle={styles.inputLabel}
        placeholder="Primary phone number"
        value={primaryPhone}
        onChangeText={setPrimaryPhone}
        keyboardType="phone-pad"
        rightIcon={<Feather name="smartphone" size={18} color="#48484A" style={{ marginRight: 8 }} />}
        containerStyle={{ marginBottom: 12 }}
      />

      <Input
        placeholder="Additional phone number (Optional)"
        value={additionalPhone}
        onChangeText={setAdditionalPhone}
        keyboardType="phone-pad"
        containerStyle={{ marginBottom: 20 }}
      />

      {/* Alert Card */}
      <View style={styles.disclaimerCard}>
        <MaterialCommunityIcons name="lock" size={18} color="#30D158" style={{ marginRight: 12 }} />
        <Text style={styles.disclaimerText}>
          All contact data is encrypted before being compared against breached databases.
        </Text>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.formStepContainer}>
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
        placeholder="A past address that may appear online"
        value={previousAddress}
        onChangeText={setPreviousAddress}
        containerStyle={{ marginBottom: 16 }}
      />

      {/* Add another address button */}
      <TouchableOpacity style={styles.addAddressButton} activeOpacity={0.7}>
        <Feather name="plus" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.addAddressText}>ADD ANOTHER ADDRESS</Text>
      </TouchableOpacity>

      {/* Alert Card */}
      <View style={styles.disclaimerCard}>
        <MaterialCommunityIcons name="lock" size={18} color="#30D158" style={{ marginRight: 12 }} />
        <Text style={styles.disclaimerText}>
          Address information is encrypted and only used for exposure matching.
        </Text>
      </View>
    </View>
  );

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
      <View style={styles.formStepContainer}>
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

        {/* Encrypted Transit Card */}
        <View style={styles.encryptedTransitCard}>
          <Feather name="check-circle" size={18} color="#30D158" style={{ marginRight: 12, marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.encryptedTransitTitle}>Encrypted Transit</Text>
            <Text style={styles.encryptedTransitText}>
              Your data is protected end-to-end with AES-256 encryption. Only you hold the decryption key.
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
            subtitle="Enter your name and basic details. We'll use them to find public records linked to you."
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
            subtitle="Home addresses are optional, but they help us identify public listings more accurately."
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
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROFILE SETUP</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Faint Dotted Watermark Background */}
      <Image
        source={require("@/assets/images/app/fingerprint.png")}
        style={styles.fingerprintBg}
        contentFit="contain"
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

        {/* Horizontal Form Content */}
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

        {/* Footer Actions */}
        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            style={styles.continueButton}
          />
          {currentStep < 3 && (
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton} activeOpacity={0.6}>
              <Text style={styles.skipButtonText}>SKIP FOR NOW</Text>
            </TouchableOpacity>
          )}
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
  headerRightPlaceholder: {
    width: 56,
  },
  fingerprintBg: {
    position: "absolute",
    alignSelf: "center",
    width: 320,
    height: 320,
    opacity: 0.025,
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
    letterSpacing: 1.2,
    fontFamily: "System",
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
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
  formStepContainer: {
    width: width - 40,
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
    alignItems: "center",
    paddingHorizontal: 2,
    marginTop: 8,
  },
  infoRowText: {
    color: "#8E8E93",
    fontSize: 13.5,
    fontFamily: "System",
    fontWeight: "500",
  },
  sectionInfoLink: {
    fontSize: 13,
    color: "#8E8E93",
    fontWeight: "600",
    textDecorationLine: "underline",
    fontFamily: "System",
  },
  disclaimerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(22, 22, 26, 0.55)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  disclaimerText: {
    flex: 1,
    color: "#A0A0A5",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
    fontWeight: "500",
  },
  formRow: {
    flexDirection: "row",
    width: "100%",
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderStyle: "dashed",
    marginTop: 8,
    marginBottom: 16,
    width: "100%",
  },
  addAddressText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "700",
    letterSpacing: 0.8,
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
    backgroundColor: "rgba(22, 22, 26, 0.45)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  reviewTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  reviewLabel: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#8E8E93",
    letterSpacing: 1,
    fontFamily: "System",
  },
  reviewValue: {
    color: "#FFFFFF",
    fontSize: 15.5,
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
    backgroundColor: "rgba(48, 209, 88, 0.04)",
    borderColor: "rgba(48, 209, 88, 0.1)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  encryptedTransitTitle: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
    marginBottom: 3,
    fontFamily: "System",
  },
  encryptedTransitText: {
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
    fontWeight: "500",
  },
});
