import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { COLORS } from "../constants";

const AuthNavigation = () => {
  const { isLoaded, isSignedIn } = useAuth();

  const segment = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthScreen = segment[0] === "(auth)";

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)/login");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [isLoaded, isSignedIn, segment, router]);

  if (!isLoaded) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: COLORS.background,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </Stack>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthNavigation;
