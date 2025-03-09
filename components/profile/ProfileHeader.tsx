import { View, Text, TouchableOpacity } from "react-native";
import { LogOut } from "lucide-react-native";
import { COLORS } from "../../constants";
import { styles } from "../../styles/profile.style";

type ProfileHeaderProps = {
  username: string;
  onSignOut: () => void;
};

export default function ProfileHeader({
  username,
  onSignOut,
}: ProfileHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerIcon} onPress={onSignOut}>
          <LogOut color={COLORS.white} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
