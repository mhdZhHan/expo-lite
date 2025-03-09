import { View, Text } from "react-native";
import { COLORS, SIZES } from "../constants";

type NotFoundProps = {
  text: string;
};

export default function NotFound(props: NotFoundProps) {
  const { text } = props;

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
        {text}
      </Text>
    </View>
  );
}
