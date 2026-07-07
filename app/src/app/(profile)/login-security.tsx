import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginSecurityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/profile" as any);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.backButton, { top: insets.top > 0 ? insets.top + 4 : 12 }]}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LOGIN & SECURITY</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Labels */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.textContainer}>
          <View style={styles.protocolBadge}>
            <Feather name="lock" size={13} color="#8E8E93" style={{ marginRight: 6 }} />
            <Text style={styles.protocolText}>SECURITY PROTOCOL</Text>
          </View>
          <Text style={styles.title}>Login & Security</Text>
        </Animated.View>

        {/* Security Options List */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.optionsList}>

          {/* Card 2: Change password */}
          <TouchableOpacity
            style={styles.optionCard}
            activeOpacity={0.75}
            onPress={() => router.push("/change-password")}
          >
            <View style={styles.cardLeft}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="form-textbox-password" size={22} color="#FFFFFF" />
              </View>
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitle}>Change password</Text>
                <Text style={styles.cardSubtitle}>Last changed 4 months ago</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={18} color="#8E8E93" />
          </TouchableOpacity>

          {/* Card 3: Delete account */}
          <TouchableOpacity
            style={styles.optionCard}
            activeOpacity={0.75}
            onPress={() => router.push("/delete-account")}
          >
            <View style={styles.cardLeft}>
              <View style={styles.iconContainer}>
                <Feather name="trash-2" size={20} color="#FF453A" />
              </View>
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitle}>Delete account</Text>
                <Text style={styles.cardSubtitle}>Permanently remove your account and data</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={18} color="#8E8E93" />
          </TouchableOpacity>

        </Animated.View>

        {/* Footer Security Shield Centerpiece */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.footerShieldContainer}>
          <MaterialCommunityIcons 
            name="shield-account-outline" 
            size={72} 
            color="rgba(255, 255, 255, 0.12)" 
            style={styles.shieldIcon}
          />
          <Text style={styles.shieldText}>END-TO-END ENCRYPTION ACTIVE</Text>
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
    justifyContent: "center",
    backgroundColor: "#000000",
    paddingBottom: 16,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1E",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 8,
    padding: 12,
    zIndex: 10,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  textContainer: {
    marginTop: 24,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  protocolBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  protocolText: {
    color: "#8E8E93",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 36,
    fontFamily: "System",
  },
  optionsList: {
    width: "100%",
    marginBottom: 40,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(28, 28, 30, 0.45)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 14,
    padding: 20,
    marginBottom: 12,
  },
  warningCard: {
    borderColor: "rgba(255, 69, 58, 0.22)",
    backgroundColor: "rgba(255, 69, 58, 0.03)",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardTextContent: {
    flex: 1,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
    marginBottom: 4,
  },
  cardSubtitle: {
    color: "#8E8E93",
    fontSize: 13,
    fontFamily: "System",
  },
  warningStatusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF453A",
    marginRight: 6,
  },
  warningText: {
    color: "#FF453A",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "System",
  },
  footerShieldContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
  },
  shieldIcon: {
    marginBottom: 12,
  },
  shieldText: {
    color: "#48484A",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "System",
    textAlign: "center",
  },
});
