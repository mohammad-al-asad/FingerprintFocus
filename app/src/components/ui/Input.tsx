import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  rightLabel?: React.ReactNode;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export default function Input({
  label,
  rightLabel,
  icon,
  rightIcon,
  containerStyle,
  inputWrapperStyle,
  labelStyle,
  style,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label and optional right element */}
      {(label || rightLabel) && (
        <View style={styles.labelWrapper}>
          {label ? (
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
          ) : (
            <View />
          )}
          {rightLabel}
        </View>
      )}

      {/* Input wrapper */}
      <View style={[styles.inputWrapper, inputWrapperStyle]}>
        {icon}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#48484A"
          {...props}
        />
        {rightIcon}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#A0A0A5",
    fontFamily: "System",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B0B0C",
    borderColor: "#2C2C2E",
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    width: "100%",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    height: "100%",
    paddingVertical: 0,
    fontFamily: "System",
  },
});
