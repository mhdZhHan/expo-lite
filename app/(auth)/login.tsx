import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSSO } from "@clerk/clerk-expo";
import { Sprout } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS, SIZES } from "@/constants";
import { styles } from "./login.styles";

export default function Login() {
  const router = useRouter();
  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("OAuth error", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* BRAND SECTION */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Sprout size={SIZES.xl} color={COLORS.primary} />
        </View>

        <Text style={styles.appName}>expo lite</Text>
        <Text style={styles.tagLine}>Let's make your day brighter!</Text>
      </View>

      {/* ILLUSTRATION */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("@/assets/images/auth-bg.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/* LOGIN SECTION */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>

          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
