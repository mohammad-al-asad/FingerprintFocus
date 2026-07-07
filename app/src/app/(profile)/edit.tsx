import React, { useState, useEffect } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface EditFieldItem {
  id: string;
  value: string;
  isPrimary?: boolean;
  label?: string;
}

interface EditFieldConfig {
  title: string;
  subtitle: string;
  iconName: string;
  iconType: "feather" | "material";
  addButtonText: string;
  alertTitle: string;
  alertDesc: string;
  saveButtonText: string;
  defaultItems: EditFieldItem[];
}

const FIELD_CONFIGS: Record<string, EditFieldConfig> = {
  name: {
    title: "NAMES",
    subtitle: "We'll check public sources for these names to ensure your identity isn't exposed on data brokers.",
    iconName: "user",
    iconType: "feather",
    addButtonText: "ADD ANOTHER NAME",
    alertTitle: "Name Exposed",
    alertDesc: "This name matches 12 broker search profiles. Request automatic removal to secure your name.",
    saveButtonText: "SAVE NAME",
    defaultItems: [
      {
        id: "name-1",
        value: "Sarah Johnson",
        isPrimary: true,
        label: "BIOMETRIC VERIFICATION ACTIVE",
      },
    ],
  },
  email: {
    title: "EMAILS",
    subtitle: "We'll check public sources for these email addresses to ensure your data isn't exposed in breaches.",
    iconName: "at-sign",
    iconType: "feather",
    addButtonText: "ADD ANOTHER EMAIL ADDRESS",
    alertTitle: "Breach Detected",
    alertDesc: "This email address was found in 5 data leaks. We recommend updating your account password.",
    saveButtonText: "SAVE EMAILS",
    defaultItems: [
      {
        id: "email-1",
        value: "sarah****@gmail.com",
        isPrimary: true,
        label: "BIOMETRIC VERIFICATION ACTIVE",
      },
      {
        id: "email-2",
        value: "s.johnson****@yahoo.com",
        isPrimary: false,
        label: "ADDITIONAL SOURCE",
      },
    ],
  },
  phone: {
    title: "PHONE NUMBERS",
    subtitle: "We'll check public sources for these phone numbers to ensure your data isn't exposed in breaches or data broker lists.",
    iconName: "phone",
    iconType: "feather",
    addButtonText: "ADD ANOTHER PHONE NUMBER",
    alertTitle: "Exposure Detected",
    alertDesc: "Your primary number was found in 3 recent data leaks. Activate Shield Mode to mask this number.",
    saveButtonText: "SAVE PHONE NUMBERS",
    defaultItems: [
      {
        id: "phone-1",
        value: "+1 (***) ***-4921",
        isPrimary: true,
        label: "BIOMETRIC VERIFICATION ACTIVE",
      },
      {
        id: "phone-2",
        value: "+1 (***) ***-8810",
        isPrimary: false,
        label: "ADDITIONAL SOURCE",
      },
    ],
  },
  address: {
    title: "ADDRESSES",
    subtitle: "We'll check public sources for these addresses to ensure your physical location isn't exposed.",
    iconName: "map-pin",
    iconType: "feather",
    addButtonText: "ADD ANOTHER ADDRESS",
    alertTitle: "Location Exposed",
    alertDesc: "Your home address is listed on 4 public people-search directories. Request removal immediately.",
    saveButtonText: "SAVE ADDRESSES",
    defaultItems: [
      {
        id: "addr-1",
        value: "1248 ********* Ln, Austin, TX",
        isPrimary: true,
        label: "BIOMETRIC VERIFICATION ACTIVE",
      },
      {
        id: "addr-2",
        value: "567 ********* Dr, Dallas, TX",
        isPrimary: false,
        label: "ADDITIONAL SOURCE",
      },
    ],
  },
  identifiers: {
    title: "IDENTIFIERS",
    subtitle: "We'll check public sources for these identifiers to protect your critical government and personal IDs.",
    iconName: "shield",
    iconType: "feather",
    addButtonText: "ADD ANOTHER IDENTIFIER",
    alertTitle: "Identifiers Synced",
    alertDesc: "Your identifiers are encrypted and protected inside the Privacera Secure Vault.",
    saveButtonText: "SAVE IDENTIFIERS",
    defaultItems: [
      {
        id: "id-1",
        value: "SSN: ***-**-8829",
        isPrimary: true,
        label: "SECURED VAULT SYNCED",
      },
      {
        id: "id-2",
        value: "DOB: **/**/1992",
        isPrimary: false,
        label: "SECURED VAULT SYNCED",
      },
    ],
  },
};

export default function ProfileEditScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const fieldType = (params.type as string) || "phone";
  const config = FIELD_CONFIGS[fieldType] || FIELD_CONFIGS.phone;

  const [items, setItems] = useState<EditFieldItem[]>(config.defaultItems);

  // Sync state if fieldType changes
  useEffect(() => {
    setItems(config.defaultItems);
  }, [fieldType]);

  const handleDeleteItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleEditItem = (item: EditFieldItem) => {
    Alert.alert("Edit Entry", `Editing entry: ${item.value}`);
  };

  const handleAddItem = () => {
    let newValue = "";
    let mockLabel = "ADDITIONAL SOURCE";

    switch (fieldType) {
      case "phone":
        newValue = "+1 (***) ***-" + Math.floor(1000 + Math.random() * 9000);
        break;
      case "email":
        newValue = "added****@gmail.com";
        break;
      case "name":
        newValue = "Sarah J. Johnson";
        mockLabel = "ADDITIONAL NAME";
        break;
      case "address":
        newValue = "789 ********* Way, Houston, TX";
        break;
      case "identifiers":
        newValue = "DL: *****" + Math.floor(1000 + Math.random() * 9000);
        mockLabel = "SECURED VAULT SYNCED";
        break;
    }

    const newItem: EditFieldItem = {
      id: "mock-" + Date.now(),
      value: newValue,
      isPrimary: false,
      label: mockLabel,
    };

    setItems((prev) => [...prev, newItem]);
  };

  const handleSave = () => {
    Alert.alert("Success", `${config.title} saved successfully.`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const renderIcon = (type: string, iconColor: string = "#FFFFFF") => {
    const IconComponent = config.iconType === "feather" ? Feather : MaterialCommunityIcons;
    return <IconComponent name={config.iconName as any} size={18} color={iconColor} />;
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
        <Text style={styles.headerTitle}>{config.title}</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Subtle absolute background watermark fingerprint */}
      <View style={styles.absoluteWatermark}>
        <MaterialCommunityIcons name="fingerprint" size={240} color="rgba(255, 255, 255, 0.015)" />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom > 0 ? insets.bottom + 24 : 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title / Description */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.subtitle}>{config.subtitle}</Text>
        </Animated.View>

        {/* Dynamic Items Cards List */}
        <View style={styles.itemsList}>
          {items.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(100 + index * 50).duration(500)}
              style={styles.itemCard}
            >
              <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                  {renderIcon(fieldType)}
                </View>
                <View style={styles.itemTextContainer}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.itemValueText}>{item.value}</Text>
                    {item.isPrimary && (
                      <View style={styles.primaryBadge}>
                        <Text style={styles.primaryBadgeText}>PRIMARY</Text>
                      </View>
                    )}
                  </View>
                  {item.label && <Text style={styles.itemLabelText}>{item.label}</Text>}
                </View>
              </View>

              {item.isPrimary ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.actionIconWrapper}
                  onPress={() => handleEditItem(item)}
                >
                  <Feather name="edit-3" size={16} color="#8E8E93" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.actionIconWrapper}
                  onPress={() => handleDeleteItem(item.id)}
                >
                  <Feather name="trash-2" size={16} color="#FF453A" />
                </TouchableOpacity>
              )}
            </Animated.View>
          ))}

          {/* Dotted border Add Card */}
          <Animated.View entering={FadeInDown.delay(100 + items.length * 50).duration(500)}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.addCard}
              onPress={handleAddItem}
            >
              <Feather name="plus-circle" size={18} color="#FFFFFF" style={styles.addIcon} />
              <Text style={styles.addCardText}>{config.addButtonText}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Exposure warning alert banner */}
        {fieldType !== "identifiers" && (
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.alertBox}>
            {/* Background absolute watermark alert icon */}
            <View style={styles.alertWatermark}>
              <Feather name="alert-triangle" size={64} color="rgba(255, 69, 58, 0.02)" />
            </View>

            <Feather name="alert-circle" size={18} color="#FF453A" style={styles.alertIcon} />
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle}>{config.alertTitle}</Text>
              <Text style={styles.alertDesc}>{config.alertDesc}</Text>
            </View>
          </Animated.View>
        )}

        {/* Save Button */}
        <Animated.View entering={FadeInDown.delay(250).duration(600)} style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>{config.saveButtonText}</Text>
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
  absoluteWatermark: {
    position: "absolute",
    alignSelf: "center",
    top: "35%",
    zIndex: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    zIndex: 1,
  },
  titleSection: {
    marginBottom: 24,
  },
  subtitle: {
    color: "#8E8E93",
    fontSize: 13.5,
    lineHeight: 20,
    fontFamily: "System",
  },
  itemsList: {
    marginBottom: 24,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  itemValueText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  primaryBadge: {
    backgroundColor: "rgba(48, 209, 88, 0.12)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  primaryBadgeText: {
    color: "#30D158",
    fontSize: 8,
    fontWeight: "800",
    fontFamily: "System",
  },
  itemLabelText: {
    color: "#48484A",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  actionIconWrapper: {
    padding: 8,
  },
  addCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderColor: "#1C1C1E",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 12,
    height: 56,
    marginTop: 4,
  },
  addIcon: {
    marginRight: 10,
  },
  addCardText: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  alertBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 69, 58, 0.25)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    position: "relative",
    overflow: "hidden",
  },
  alertWatermark: {
    position: "absolute",
    right: -10,
    bottom: -15,
  },
  alertIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 4,
  },
  alertDesc: {
    color: "#8E8E93",
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: "System",
  },
  buttonContainer: {
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
});
