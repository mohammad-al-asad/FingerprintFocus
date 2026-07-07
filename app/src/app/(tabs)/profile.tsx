import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleEditProfile = () => {
    Alert.alert("Profile", "Edit profile info functionality...");
  };

  const handleAction = (item: string) => {
    Alert.alert("Account", `Navigating to ${item}...`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <View style={styles.headerLeft}>
          <Feather name="shield" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>Account</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleAction("Settings")}
          style={styles.settingsButton}
          activeOpacity={0.7}
        >
          <Feather name="settings" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Summary */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <Image
                source="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                style={styles.avatar}
              />
              <View style={styles.statusIndicator} />
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Sarah Johnson</Text>
              <Text style={styles.profileEmail}>sarah****@gmail.com</Text>

              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>PREMIUM MONITORING</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleEditProfile}
              style={styles.editButton}
              activeOpacity={0.7}
            >
              <Feather name="edit-2" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Section 1: SECURITY & DATA */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.section}>
          <Text style={styles.sectionLabel}>SECURITY & DATA</Text>

          <View style={styles.cardContainer}>
            {/* Row 1: Profile Data */}
            <TouchableOpacity
              onPress={() => router.push("/profile-data" as any)}
              style={styles.rowItem}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <Feather name="user" size={18} color="#FFFFFF" style={{ marginRight: 16 }} />
                <Text style={styles.rowText}>Profile Data</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#8E8E93" />
            </TouchableOpacity>
            <View style={styles.divider} />

            {/* Row 2: Login & Security */}
            <TouchableOpacity
              onPress={() => router.push("/login-security")}
              style={styles.rowItem}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <Feather name="lock" size={18} color="#FFFFFF" style={{ marginRight: 16 }} />
                <Text style={styles.rowText}>Login & Security</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#8E8E93" />
            </TouchableOpacity>
            <View style={styles.divider} />

            {/* Row 3: Subscription */}
            <TouchableOpacity
              onPress={() => router.push("/subscription" as any)}
              style={styles.rowItem}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <Feather name="credit-card" size={18} color="#FFFFFF" style={{ marginRight: 16 }} />
                <Text style={styles.rowText}>Subscription</Text>
              </View>
              <View style={styles.rowRight}>
                <View style={styles.renewingBadge}>
                  <Text style={styles.renewingBadgeText}>RENEWING</Text>
                </View>
                <Feather name="chevron-right" size={16} color="#8E8E93" />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />

            {/* Row 4: Data Privacy Controls */}
            <TouchableOpacity
              onPress={() => handleAction("Data Privacy Controls")}
              style={styles.rowItem}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <Feather name="shield" size={18} color="#FFFFFF" style={{ marginRight: 16 }} />
                <Text style={styles.rowText}>Data Privacy Controls</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Section 2: SYSTEM */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.section}>
          <Text style={styles.sectionLabel}>SYSTEM</Text>

          <View style={styles.cardContainer}>
            {/* Row 1: Notification Settings */}
            <TouchableOpacity
              onPress={() => router.push("/notifications" as any)}
              style={styles.rowItem}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <Feather name="bell" size={18} color="#FFFFFF" style={{ marginRight: 16 }} />
                <Text style={styles.rowText}>Notification Settings</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#8E8E93" />
            </TouchableOpacity>
            <View style={styles.divider} />

            {/* Row 2: Help & Support */}
            <TouchableOpacity
              onPress={() => router.push("/support" as any)}
              style={styles.rowItem}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <Feather name="help-circle" size={18} color="#FFFFFF" style={{ marginRight: 16 }} />
                <Text style={styles.rowText}>Help & Support</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#8E8E93" />
            </TouchableOpacity>
            <View style={styles.divider} />

            {/* Row 3: Log Out */}
            <TouchableOpacity
              onPress={() => router.navigate("/(auth)")}
              style={styles.rowItem}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <Feather name="log-out" size={18} color="#FF453A" style={{ marginRight: 16 }} />
                <Text style={[styles.rowText, { color: "#FF453A" }]}>Log Out</Text>
              </View>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  settingsButton: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
  },
  statusIndicator: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#30D158",
    borderColor: "#121214",
    borderWidth: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "System",
    marginBottom: 4,
  },
  profileEmail: {
    color: "#8E8E93",
    fontSize: 13,
    fontFamily: "System",
    marginBottom: 8,
  },
  premiumBadge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  premiumBadgeText: {
    color: "#000000",
    fontSize: 8.5,
    fontWeight: "800",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  editButton: {
    padding: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  cardContainer: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 56,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "System",
  },
  renewingBadge: {
    backgroundColor: "rgba(255, 159, 10, 0.12)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 10,
  },
  renewingBadgeText: {
    color: "#FF9F0A",
    fontSize: 9,
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    width: "100%",
  },
});
