import { useCallback, useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";

import Providers from "@/components/Providers";
import AuthNavigation from "@/components/AuthNavigation";

import { COLORS } from "@/constants";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontLoaded] = useFonts({
    "JetBrainsMono-Medium": require("@/assets/fonts/JetBrainsMono-Medium.ttf"),
    "JetBrainsMono-Light": require("@/assets/fonts/JetBrainsMono-Light.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
    "SpaceMono-Regular": require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) await SplashScreen.hideAsync();
  }, [fontLoaded]);

  // NOTE: Fix Android navigation bar style to match the app's dark theme
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(COLORS.background);
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  return (
    <Providers>
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
          onLayout={onLayoutRootView}
        >
          <AuthNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </Providers>
  );
};

export default RootLayout;
