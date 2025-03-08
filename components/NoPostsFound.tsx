import { View, Text } from "react-native";
import { COLORS, SIZES } from "../constants";

export default function NoPostsFound() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: SIZES.md,
          color: COLORS.primary,
        }}
      >
        No posts yet
      </Text>
    </View>
  );
}
