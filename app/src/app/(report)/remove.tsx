import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown, FadeInUp, Layout } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function RemoveRequestScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (isConfirmed) {
      setIsSubmitted(true);
    }
  };

  const handleBackToRequests = () => {
    // Go back to the main report screen or pop back
    router.replace("/report" as any);
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.successScrollContent,
            {
              paddingTop: insets.top > 0 ? insets.top + 40 : 60,
              paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Green check mark double-ring icon */}
          <Animated.View entering={FadeIn.delay(100).duration(600)} style={styles.successIconWrapper}>
            <View style={styles.successOuterCircle}>
              <View style={styles.successInnerCircle}>
                <Feather name="check" size={32} color="#30D158" />
              </View>
            </View>
          </Animated.View>

          <Animated.Text entering={FadeInDown.delay(200).duration(500)} style={styles.successTitle}>
            Remove request submitted
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(250).duration(500)} style={styles.successSubtitle}>
            We'll track this request and update your status when progress changes.
          </Animated.Text>

          {/* Ticket ID card */}
          <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.ticketCard}>
            <View style={styles.ticketLeftInfo}>
              <View style={styles.ticketIconBox}>
                <Feather name="file-text" size={18} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.ticketLabel}>TICKET ID</Text>
                <Text style={styles.ticketValue}>#PX-8821-RMV</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={16} color="#8E8E93" />
          </Animated.View>

          {/* Bottom Success Buttons */}
          <Animated.View entering={FadeInDown.delay(350).duration(600)} style={styles.successButtonContainer}>
            <TouchableOpacity activeOpacity={0.9} style={styles.primaryButton} onPress={handleBackToRequests}>
              <Text style={styles.primaryButtonText}>View Request Status</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.secondaryButton} onPress={handleBackToRequests}>
              <Text style={styles.secondaryButtonText}>Back to Requests</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>REMOVE REQUEST</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Badge & Title */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <View style={styles.externalSourceBadge}>
            <Text style={styles.externalSourceText}>EXTERNAL SOURCE</Text>
          </View>
          <Text style={styles.mainTitle}>Remove request</Text>
          <Text style={styles.subtitle}>
            We'll help you request removal of exposed information from this source.
          </Text>
        </Animated.View>

        {/* Exposed Data Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.exposedDataCard}>
          <Text style={styles.exposedDataHeader}>EXPOSED DATA DETECTED</Text>

          {/* Row 1: Name */}
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Name</Text>
            <Text style={styles.dataValue}>John D****</Text>
          </View>

          <View style={styles.exposedDivider} />

          {/* Row 2: Phone */}
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Phone</Text>
            <Text style={styles.dataValue}>(555) ***-4829</Text>
          </View>

          <View style={styles.exposedDivider} />

          {/* Row 3: Address */}
          <View style={styles.addressDataRow}>
            <Text style={styles.dataLabel}>Address</Text>
            <Text style={styles.addressValueText}>123 P*** Ave, New York, NY</Text>
          </View>
        </Animated.View>

        {/* Warning Alert Box */}
        <Animated.View entering={FadeInDown.delay(150).duration(600)} style={styles.warningBox}>
          <Feather name="alert-circle" size={18} color="#FFD60A" style={styles.warningIcon} />
          <Text style={styles.warningText}>
            Some sites require verification before processing a remove request. You may receive an email or SMS at the contact details provided.
          </Text>
        </Animated.View>

        {/* Checkbox Section */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.checkboxContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.checkboxSquare}
            onPress={() => setIsConfirmed((prev) => !prev)}
          >
            {isConfirmed && <Feather name="check" size={14} color="#FFFFFF" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel} onPress={() => setIsConfirmed((prev) => !prev)}>
            I confirm this information belongs to me and I want to start a remove request.
          </Text>
        </Animated.View>

        {/* Submit & Cancel Buttons */}
        <Animated.View entering={FadeInDown.delay(250).duration(600)} style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.submitButton,
              isConfirmed ? styles.submitButtonEnabled : styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!isConfirmed}
          >
            <Text
              style={[
                styles.submitButtonText,
                isConfirmed ? styles.submitButtonTextEnabled : styles.submitButtonTextDisabled,
              ]}
            >
              SUBMIT REMOVE REQUEST
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>CANCEL</Text>
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
  externalSourceBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  externalSourceText: {
    color: "#8E8E93",
    fontSize: 9.5,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 26,
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
  exposedDataCard: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  exposedDataHeader: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    fontFamily: "System",
    marginBottom: 16,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  addressDataRow: {
    paddingVertical: 4,
  },
  dataLabel: {
    color: "#8E8E93",
    fontSize: 13.5,
    fontFamily: "System",
  },
  dataValue: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  addressValueText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "600",
    fontFamily: "System",
    marginTop: 6,
  },
  exposedDivider: {
    height: 1,
    backgroundColor: "#1C1C1E",
    marginVertical: 12,
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderLeftWidth: 3.5,
    borderLeftColor: "#FFD60A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  warningIcon: {
    marginRight: 10,
    marginTop: 1,
  },
  warningText: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: "System",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 2,
    marginBottom: 24,
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#3E3E42",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 1,
  },
  checkboxLabel: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
  },
  buttonContainer: {
    marginTop: 8,
  },
  submitButton: {
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  submitButtonDisabled: {
    backgroundColor: "#2C2C2E",
  },
  submitButtonEnabled: {
    backgroundColor: "#FFFFFF",
  },
  submitButtonText: {
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  submitButtonTextDisabled: {
    color: "#8E8E93",
  },
  submitButtonTextEnabled: {
    color: "#000000",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#3E3E42",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },

  /* Success State Styles */
  successScrollContent: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  successIconWrapper: {
    marginBottom: 32,
    alignItems: "center",
  },
  successOuterCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: "rgba(48, 209, 88, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  successInnerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: "#30D158",
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "System",
    textAlign: "center",
    marginBottom: 12,
  },
  successSubtitle: {
    color: "#8E8E93",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  ticketCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: "100%",
    marginBottom: 40,
  },
  ticketLeftInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticketIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  ticketLabel: {
    color: "#8E8E93",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "System",
    marginBottom: 2,
  },
  ticketValue: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "700",
    fontFamily: "System",
  },
  successButtonContainer: {
    width: "100%",
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
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#3E3E42",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
  },
});
