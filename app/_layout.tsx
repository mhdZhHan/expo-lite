import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

import { tokenCache } from "@/cache";
import { COLORS } from "@/constants";

import AuthNavigation from "@/components/AuthNavigation";

const RootLayout = () => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <SafeAreaProvider>
            <StatusBar
              backgroundColor={COLORS.background}
              barStyle={"light-content"}
              animated
            />

            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: COLORS.background,
              }}
            >
              <AuthNavigation />
            </SafeAreaView>
          </SafeAreaProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
