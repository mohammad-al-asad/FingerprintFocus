import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  style?: ViewStyle;
  showBorder?: boolean;
  transparent?: boolean;
  rightElement?: React.ReactNode;
}

export default function Header({
  style,
  showBorder = true,
  transparent = false,
  rightElement,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.headerContainer,
        { paddingTop: insets.top + 8 },
        transparent && { backgroundColor: "transparent" },
        !showBorder && { borderBottomWidth: 0 },
        style,
      ]}
    >
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/app/logoWithText.png")}
          style={styles.logo}
          contentFit="contain"
          transition={200}
        />
        {rightElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#0A0A0C",
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1E",
    paddingBottom: 12,
    paddingHorizontal: 20,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 36,
  },
  logo: {
    width: 160,
    height: 32,
  },
});
