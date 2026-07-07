import { Stack } from "expo-router";

export default function ProfileSetupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000000" },
      }}
    />
  );
}
