import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Button from "@/components/ui/Button";

const { width } = Dimensions.get("window");

export default function ScanningScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [authorized, setAuthorized] = useState(false);

  const handleStartScan = () => {
    if (!authorized) return;
    router.push("/premium" as any);
  };

  const handleClose = () => {
    router.replace("/(tabs)" as any);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <View style={{ width: 44 }} />
        <Text style={styles.headerTitle}>Scanning</Text>
        <TouchableOpacity
          onPress={handleClose}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Feather name="x" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Header Progress Track Indicator */}
      <View style={styles.headerProgressBg}>
        <View style={styles.headerProgressFill} />
      </View>

      {/* Faint Dotted Watermark Background */}
      <Image
        source={require("@/assets/images/app/fingerprint.png")}
        style={styles.fingerprintBg}
        contentFit="contain"
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.textContainer}>
          <Text style={styles.title}>Authorize your fingerprint scan</Text>
          <Text style={styles.subtitle}>
            We'll use your provided information to search the internet and create your privacy report.
          </Text>
        </Animated.View>

        {/* Card 1: What we scan online */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="search" size={18} color="#FFFFFF" style={{ marginRight: 10 }} />
            <Text style={styles.cardTitle}>What we scan online</Text>
          </View>

          <View style={styles.listItem}>
            <Feather name="check-circle" size={16} color="#30D158" style={styles.listIcon} />
            <Text style={styles.listItemText}>People-search sites</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.listItem}>
            <Feather name="check-circle" size={16} color="#30D158" style={styles.listIcon} />
            <Text style={styles.listItemText}>Data brokers</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.listItem}>
            <Feather name="check-circle" size={16} color="#30D158" style={styles.listIcon} />
            <Text style={styles.listItemText}>Public records</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.listItem}>
            <Feather name="check-circle" size={16} color="#30D158" style={styles.listIcon} />
            <Text style={styles.listItemText}>Breach databases</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.listItem}>
            <Feather name="check-circle" size={16} color="#30D158" style={styles.listIcon} />
            <Text style={styles.listItemText}>Indexed profiles</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.listItem}>
            <Feather name="check-circle" size={16} color="#30D158" style={styles.listIcon} />
            <Text style={styles.listItemText}>Social Media</Text>
          </View>
        </Animated.View>

        {/* Card 2: What we do not do */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="shield" size={18} color="#FF9F0A" style={{ marginRight: 10 }} />
            <Text style={styles.cardTitle}>What we do not do</Text>
          </View>

          <View style={styles.bulletItem}>
            <View style={styles.redBullet} />
            <Text style={styles.bulletItemText}>
              We do not sell your data to anyone or share it with third parties for advertising.
            </Text>
          </View>

          <View style={styles.bulletItem}>
            <View style={styles.redBullet} />
            <Text style={styles.bulletItemText}>
              We do not guarantee every broker will remove information automatically.
            </Text>
          </View>
        </Animated.View>

        {/* Card 3: REMOVAL REQUEST NOTE */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.noteCard}>
          <Feather name="info" size={18} color="#8E8E93" style={styles.noteIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.noteTitle}>REMOVAL REQUEST NOTE</Text>
            <Text style={styles.noteText}>
              Some broker processes require manual steps or verification that we cannot perform on your behalf.
            </Text>
          </View>
        </Animated.View>

        {/* Checkbox */}
        <Animated.View entering={FadeInDown.delay(500).duration(600)}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            activeOpacity={0.8}
            onPress={() => setAuthorized(!authorized)}
          >
            <View style={[styles.checkbox, authorized && styles.checkboxActive]}>
              {authorized && <Feather name="check" size={12} color="#000000" />}
            </View>
            <Text style={styles.checkboxText}>
              I agree to let Fingerprint Focus use my information to find exposed data and create my privacy report.
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Action Button */}
        <Animated.View entering={FadeInDown.delay(600).duration(600)} style={{ width: "100%" }}>
          <Button
            title="Start Scan"
            onPress={handleStartScan}
            disabled={!authorized}
            style={styles.scanButton}
          />
        </Animated.View>

        {/* Terms of Service Link */}
        <Animated.View entering={FadeInDown.delay(650).duration(600)} style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{" "}
            <Text
              style={styles.linkText}
              onPress={() => Alert.alert("Terms of Service", "Fingerprint Focus Terms of Service and Privacy Policy details.")}
            >
              Terms of Service
            </Text>
            .
          </Text>
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
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "System",
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  headerProgressBg: {
    width: "100%",
    height: 2.5,
    backgroundColor: "#1C1C1E",
  },
  headerProgressFill: {
    width: "75%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  fingerprintBg: {
    position: "absolute",
    alignSelf: "center",
    width: 320,
    height: 320,
    opacity: 0.025,
    top: 150,
    zIndex: -1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  textContainer: {
    marginTop: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 34,
    marginBottom: 8,
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14.5,
    color: "#8E8E93",
    lineHeight: 21,
    fontFamily: "System",
  },
  card: {
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "800",
    fontFamily: "System",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  listIcon: {
    marginRight: 12,
  },
  listItemText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "600",
    fontFamily: "System",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    width: "100%",
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  redBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF453A",
    marginRight: 12,
    marginTop: 7,
  },
  bulletItemText: {
    flex: 1,
    color: "#A0A0A5",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "System",
    fontWeight: "500",
  },
  noteCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(22, 22, 26, 0.55)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  noteIcon: {
    marginRight: 14,
    marginTop: 2,
  },
  noteTitle: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: "System",
  },
  noteText: {
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
    fontWeight: "500",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    paddingHorizontal: 2,
  },
  checkbox: {
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
  checkboxActive: {
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  },
  checkboxText: {
    flex: 1,
    color: "#A0A0A5",
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: "System",
    fontWeight: "500",
  },
  scanButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  footerText: {
    color: "#8E8E93",
    fontSize: 12.5,
    textAlign: "center",
    lineHeight: 18,
    fontFamily: "System",
    fontWeight: "500",
  },
  linkText: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
