import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/ui/Button";

const { width, height } = Dimensions.get("window");

export default function ScanningScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [authorized, setAuthorized] = useState(false);

  const handleStartScan = () => {
    if (!authorized) return;
    router.push("/(scan)" as any);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
        <View style={{ width: 44 }} />
        <Text style={styles.headerTitle}>Scan</Text>
        <TouchableOpacity
          onPress={handleClose}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Feather name="x" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.textContainer}>
          <Text style={styles.title}>Authorize your exposure scan</Text>
          <Text style={styles.subtitle}>
            We'll use your provided information to search public exposure sources and create your privacy report.
          </Text>
        </Animated.View>

        {/* Card 1: What we scan */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="search" size={18} color="#FFFFFF" style={{ marginRight: 10 }} />
            <Text style={styles.cardTitle}>What we scan</Text>
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
        </Animated.View>

        {/* Card 2: What we do not do */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="shield" size={18} color="#FF9500" style={{ marginRight: 10 }} />
            <Text style={styles.cardTitle}>What we do not do</Text>
          </View>

          <View style={styles.bulletItem}>
            <View style={styles.redBullet} />
            <Text style={styles.bulletItemText}>We do not sell your data to any third parties.</Text>
          </View>

          <View style={styles.bulletItem}>
            <View style={styles.redBullet} />
            <Text style={styles.bulletItemText}>
              We do not guarantee every broker will remove information automatically.
            </Text>
          </View>
        </Animated.View>

        {/* Card 3: REMOVE REQUEST NOTE */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.noteCard}>
          <Feather name="info" size={18} color="#8E8E93" style={styles.noteIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.noteTitle}>REMOVE REQUEST NOTE</Text>
            <Text style={styles.noteText}>
              Some broker processes require manual steps or verification that we cannot perform on your behalf.
            </Text>
          </View>
        </Animated.View>

        {/* Checkbox */}
        <Animated.View entering={FadeInDown.delay(500).duration(600)}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            activeOpacity={0.7}
            onPress={() => setAuthorized(!authorized)}
          >
            <View style={[styles.checkbox, authorized && styles.checkboxActive]}>
              {authorized && <View style={styles.checkboxCheck} />}
            </View>
            <Text style={styles.checkboxText}>
              I authorize this app to use my information to scan public exposure sources and generate a privacy report.
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

        {/* Footer */}
        <Animated.View entering={FadeInDown.delay(700).duration(600)} style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{" "}
            <Text
              style={styles.linkText}
              onPress={() => Alert.alert("Terms of Service", "Privacera Sentinel Terms of Service agreement details.")}
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
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1E",
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
    height: 2,
    backgroundColor: "#1C1C1E",
  },
  headerProgressFill: {
    width: "80%", // Matches visual indicator styling in mockup screenshot
    height: 2,
    backgroundColor: "#FFFFFF",
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
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 32,
    marginBottom: 8,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
    fontFamily: "System",
  },
  card: {
    backgroundColor: "#121214",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
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
    fontSize: 14,
    fontWeight: "500",
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
    paddingVertical: 8,
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
    color: "#8E8E93",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "System",
  },
  noteCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
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
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: "System",
  },
  noteText: {
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
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
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  checkboxActive: {
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  },
  checkboxCheck: {
    width: 10,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#000000",
    transform: [{ rotate: "-45deg" }],
    marginTop: -2,
  },
  checkboxText: {
    flex: 1,
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "System",
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
  },
  linkText: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
  },
});
