import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

interface ProfileStepProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const { width } = Dimensions.get("window");

export default function ProfileStep({ title, subtitle, children }: ProfileStepProps) {
  return (
    <View style={styles.stepContainer}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.formContainer}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    width: width,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "#A0A0A5",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: "System",
  },
  formContainer: {
    flex: 1,
  },
});
