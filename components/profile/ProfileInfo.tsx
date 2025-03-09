import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Share } from "lucide-react-native";
import { COLORS } from "../../constants";
import { styles } from "../../styles/profile.style";
import type { Doc } from "@/convex/_generated/dataModel";

type ProfileInfoProps = {
  user: Doc<"users">;
  onEditProfile: () => void;
};

export default function ProfileInfo({ user, onEditProfile }: ProfileInfoProps) {
  return (
    <View style={styles.profileInfo}>
      <View style={styles.avatarAndStats}>
        <View style={styles.avatarContainer}>
          <Image
            source={user.image}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <Text style={styles.name}>{user.fullName}</Text>
      {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton} onPress={() => {}}>
          <Share size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
