import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

import { tokenCache } from "../cache";

export default function Providers({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const CONVEX_URL = process.env.EXPO_PUBLIC_CONVEX_URL!;

  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  if (!CONVEX_URL) {
    throw new Error("Add EXPO_PUBLIC_CONVEX_URL in your .env");
  }

  const convex = new ConvexReactClient(CONVEX_URL, {
    unsavedChangesWarning: false,
  });

  return (
    <GestureHandlerRootView>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={CLERK_PUBLISHABLE_KEY}
      >
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
          <ClerkLoaded>{children}</ClerkLoaded>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
