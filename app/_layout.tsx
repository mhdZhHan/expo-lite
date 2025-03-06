import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Providers from "@/components/Providers";
import AuthNavigation from "@/components/AuthNavigation";

import { COLORS } from "@/constants";

const RootLayout = () => {
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
        >
          <AuthNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </Providers>
  );
};

export default RootLayout;
