import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "@/components/ui/Header";

const { width } = Dimensions.get("window");

interface RequestItem {
  id: string;
  name: string;
  iconName: string;
  iconType: "feather" | "material";
  status: "Sent" | "In Progress" | "Completed";
  updatedAt: string;
}

const ACTIVE_REQUESTS: RequestItem[] = [
  {
    id: "whitepages",
    name: "Whitepages",
    iconName: "globe",
    iconType: "feather",
    status: "In Progress",
    updatedAt: "Updated 2h ago",
  },
  {
    id: "spokeo",
    name: "Spokeo",
    iconName: "share-2",
    iconType: "feather",
    status: "Sent",
    updatedAt: "Updated 5h ago",
  },
  {
    id: "beenverified",
    name: "BeenVerified",
    iconName: "shield",
    iconType: "feather",
    status: "Completed",
    updatedAt: "Updated 1d ago",
  },
  {
    id: "peoplefinders",
    name: "PeopleFinders",
    iconName: "users",
    iconType: "feather",
    status: "In Progress",
    updatedAt: "Updated 10m ago",
  },
];

export default function RemovalsScreen() {
  const insets = useSafeAreaInsets();

  const getStatusColor = (status: RequestItem["status"]) => {
    switch (status) {
      case "Completed":
        return "#30D158"; // Green
      case "In Progress":
        return "#0A84FF"; // Blue
      default:
        return "#8E8E93"; // Grey
    }
  };

  const getStatusBgColor = (status: RequestItem["status"]) => {
    switch (status) {
      case "Completed":
        return "rgba(48, 209, 88, 0.1)";
      case "In Progress":
        return "rgba(10, 132, 255, 0.1)";
      default:
        return "rgba(255, 255, 255, 0.05)";
    }
  };

  const renderIcon = (item: RequestItem) => {
    const IconComponent = item.iconType === "feather" ? Feather : MaterialCommunityIcons;
    return (
      <View style={styles.iconBox}>
        <IconComponent name={item.iconName as any} size={18} color="#FFFFFF" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header same as Home & Result */}
      <Header
        showBorder={true}
        rightElement={
          <TouchableOpacity
            style={styles.avatarButton}
            activeOpacity={0.7}
          >
            <Image
              source="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              style={styles.avatar}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(50).duration(500)} style={styles.titleSection}>
          <Text style={styles.mainTitle}>Removal Overview</Text>
        </Animated.View>

        {/* Metrics Overview Stack */}
        <View style={styles.metricsContainer}>
          {/* Card 1: Sent */}
          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.metricCard}>
            <View style={styles.metricHeaderRow}>
              <View style={[styles.statusDot, { backgroundColor: "#8E8E93" }]} />
              <Text style={styles.metricLabel}>Sent</Text>
            </View>
            <Text style={styles.metricValue}>175</Text>
          </Animated.View>

          {/* Card 2: In Progress */}
          <Animated.View entering={FadeInDown.delay(150).duration(500)} style={styles.metricCard}>
            <View style={styles.metricHeaderRow}>
              <View style={[styles.statusDot, { backgroundColor: "#0A84FF" }]} />
              <Text style={styles.metricLabel}>In Progress</Text>
            </View>
            <Text style={styles.metricValue}>55</Text>
          </Animated.View>

          {/* Card 3: Completed */}
          <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.metricCard}>
            <View style={styles.metricHeaderRow}>
              <View style={[styles.statusDot, { backgroundColor: "#30D158" }]} />
              <Text style={styles.metricLabel}>Completed</Text>
            </View>
            <Text style={styles.metricValue}>120</Text>
          </Animated.View>
        </View>

        {/* Active Requests Section */}
        <Animated.View entering={FadeInUp.delay(250).duration(500)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Requests</Text>
        </Animated.View>

        {/* Active Requests List */}
        <View style={styles.requestsList}>
          {ACTIVE_REQUESTS.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(300 + index * 50).duration(500)}
              style={styles.requestCard}
            >
              <View style={styles.requestLeft}>
                {renderIcon(item)}
                <Text style={styles.requestName}>{item.name}</Text>
              </View>

              <View style={styles.requestRight}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBgColor(item.status) }
                ]}>
                  <View style={[
                    styles.badgeStatusDot,
                    { backgroundColor: getStatusColor(item.status) }
                  ]} />
                  <Text style={[
                    styles.statusBadgeText,
                    { color: getStatusColor(item.status) }
                  ]}>
                    {item.status}
                  </Text>
                </View>
                <Text style={styles.updatedAtText}>{item.updatedAt}</Text>
              </View>
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
  avatarButton: {
    paddingLeft: 16,
    paddingVertical: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  metricsContainer: {
    width: "100%",
    marginBottom: 28,
  },
  metricCard: {
    backgroundColor: "rgba(22, 22, 26, 0.65)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  metricHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  metricLabel: {
    color: "#8E8E93",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "System",
  },
  metricValue: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    fontFamily: "System",
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  requestsList: {
    width: "100%",
  },
  requestCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(22, 22, 26, 0.45)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    height: 76,
  },
  requestLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  requestName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    fontFamily: "System",
  },
  requestRight: {
    alignItems: "flex-end",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
  },
  badgeStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    fontFamily: "System",
  },
  updatedAtText: {
    color: "#8E8E93",
    fontSize: 11.5,
    fontFamily: "System",
    fontWeight: "500",
  },
});
