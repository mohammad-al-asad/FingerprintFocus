import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface ProfileField {
  id: string;
  label: string;
  value: string;
}

const PROFILE_FIELDS: ProfileField[] = [
  {
    id: "name",
    label: "FULL NAME",
    value: "Sarah Johnson",
  },
  {
    id: "email",
    label: "PRIMARY EMAIL",
    value: "sarah****@gmail.com",
  },
  {
    id: "phone",
    label: "PHONE NUMBER",
    value: "+1 (555) ***-9284",
  },
  {
    id: "address",
    label: "HOME ADDRESS",
    value: "1248 ********* Ln, Austin, TX",
  },
  {
    id: "identifiers",
    label: "IDENTIFIERS",
    value: "SSN (Masked), DOB (Masked)",
  },
];

export default function ProfileDataScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleEditField = (field: ProfileField) => {
    router.push({ pathname: "/edit", params: { type: field.id } } as any);
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
        <Text style={styles.headerTitle}>PROFILE DATA</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Subtle absolute background watermark fingerprint */}
      <View style={styles.absoluteWatermark}>
        <MaterialCommunityIcons name="fingerprint" size={220} color="rgba(255, 255, 255, 0.015)" />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.subtitle}>Update the information used for future exposure scans.</Text>
        </Animated.View>

        {/* Warning Alert Info Box */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.infoBox}>
          <Feather name="info" size={16} color="#FFFFFF" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Updating your profile may affect future scan results.
          </Text>
        </Animated.View>

        {/* Fields List */}
        <View style={styles.fieldsList}>
          {PROFILE_FIELDS.map((field, index) => (
            <Animated.View
              key={field.id}
              entering={FadeInDown.delay(150 + index * 50).duration(500)}
              style={styles.fieldCard}
            >
              <View style={styles.cardLeftContent}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <Text style={styles.fieldValue}>{field.value}</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.editButton}
                onPress={() => handleEditField(field)}
              >
                <Text style={styles.editButtonText}>EDIT</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
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
  absoluteWatermark: {
    position: "absolute",
    alignSelf: "center",
    top: "30%",
    zIndex: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    zIndex: 1,
  },
  titleSection: {
    marginBottom: 20,
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "System",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 12,
    opacity: 0.8,
  },
  infoText: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
  },
  fieldsList: {
    marginBottom: 12,
  },
  fieldCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  cardLeftContent: {
    flex: 1,
    marginRight: 12,
  },
  fieldLabel: {
    color: "#8E8E93",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
    marginBottom: 6,
  },
  fieldValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "System",
  },
  editButton: {
    backgroundColor: "transparent",
    borderColor: "#8E8E93",
    borderWidth: 1,
    borderRadius: 16,
    width: 68,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 10.5,
    fontWeight: "800",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
});
