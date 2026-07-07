import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  icon,
  style,
  textStyle,
  activeOpacity = 0.8,
  disabled = false,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        style,
      ]}
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.content}>
        {icon}
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
            icon ? { marginLeft: 10 } : null,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 28,
    height: 56,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: "#000000",
    borderColor: "#2C2C2E",
    borderWidth: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
  primaryText: {
    color: "#000000",
  },
  secondaryText: {
    color: "#FFFFFF",
  },
  disabledButton: {
    opacity: 0.35,
  },
});
