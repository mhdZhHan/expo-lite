import { View, ActivityIndicator } from "react-native";
import { COLORS } from "../constants";

export default function Loader() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size={"small"} color={COLORS.primary} />
    </View>
  );
}
