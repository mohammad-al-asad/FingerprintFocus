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
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
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

  const handleViewStatus = () => {
    router.replace("/(tabs)/removals" as any);
  };

  const handleBackToResult = () => {
    router.replace("/(tabs)/result" as any);
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.successScrollContent,
            {
              paddingTop: insets.top > 0 ? insets.top + 40 : 60,
              paddingBottom: insets.bottom + 24,
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
            <TouchableOpacity activeOpacity={0.9} style={styles.successPrimaryButton} onPress={handleViewStatus}>
              <Text style={styles.successPrimaryButtonText}>View Request Status</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.successSecondaryButton} onPress={handleBackToResult}>
              <Text style={styles.successSecondaryButtonText}>Back to Result</Text>
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
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Badge & Title */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <View style={styles.externalSourceBadge}>
            <Text style={styles.externalSourceText}>EXTERNAL SOURCE</Text>
          </View>
          <Text style={styles.mainTitle}>Removal Request</Text>
          <Text style={styles.subtitle}>
            We'll help you request removal of exposed information from this site.
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
            Some sites require verification before processing a removal request. You may receive an email or SMS at the contact details provided.
          </Text>
        </Animated.View>

        {/* Checkbox Section */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.checkboxContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.checkboxSquare, isConfirmed && styles.checkboxSquareActive]}
            onPress={() => setIsConfirmed((prev) => !prev)}
          >
            {isConfirmed && <Feather name="check" size={12} color="#000000" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel} onPress={() => setIsConfirmed((prev) => !prev)}>
            I confirm this information belongs to me and I want to start this removal request.
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
              SUBMIT REMOVAL REQUEST
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titleSection: {
    marginBottom: 20,
  },
  externalSourceBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  externalSourceText: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    fontFamily: "System",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 14.5,
    lineHeight: 20,
    fontFamily: "System",
    fontWeight: "500",
  },
  exposedDataCard: {
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  exposedDataHeader: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    fontFamily: "System",
    marginBottom: 16,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  addressDataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  dataLabel: {
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "System",
  },
  dataValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
  },
  addressValueText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
    flex: 1,
    textAlign: "right",
    marginLeft: 24,
  },
  exposedDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    width: "100%",
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 214, 10, 0.03)",
    borderColor: "#FFD60A",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  warningIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  warningText: {
    flex: 1,
    color: "#A0A0A5",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
    fontWeight: "500",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#48484A",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  checkboxSquareActive: {
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  },
  checkboxLabel: {
    flex: 1,
    color: "#A0A0A5",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 10,
  },
  submitButton: {
    borderRadius: 27,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  submitButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  submitButtonEnabled: {
    backgroundColor: "#FFFFFF",
  },
  submitButtonText: {
    fontSize: 14.5,
    fontWeight: "800",
  },
  submitButtonTextDisabled: {
    color: "rgba(255, 255, 255, 0.35)",
  },
  submitButtonTextEnabled: {
    color: "#000000",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1.5,
    borderRadius: 27,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  successScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  successIconWrapper: {
    marginBottom: 28,
  },
  successOuterCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(48, 209, 88, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  successInnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(48, 209, 88, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    fontFamily: "System",
    textAlign: "center",
    marginBottom: 8,
  },
  successSubtitle: {
    color: "#8E8E93",
    fontSize: 14.5,
    textAlign: "center",
    fontFamily: "System",
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  ticketCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    width: "100%",
    marginBottom: 32,
  },
  ticketLeftInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticketIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  ticketLabel: {
    color: "#8E8E93",
    fontSize: 9.5,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "System",
  },
  ticketValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "System",
    marginTop: 2,
  },
  successButtonContainer: {
    width: "100%",
  },
  successPrimaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 27,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  successPrimaryButtonText: {
    color: "#000000",
    fontSize: 14.5,
    fontWeight: "800",
  },
  successSecondaryButton: {
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1.5,
    borderRadius: 27,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  successSecondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
