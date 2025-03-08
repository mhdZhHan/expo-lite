import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles/feed.style";
import { Story } from "../types";

type StoryProps = {
  story: Story;
};

export default function UserStoryCircle({ story }: StoryProps) {
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
        <Image
          source={{ uri: story.avatar }}
          style={styles.storyAvatar}
          accessibilityLabel={`${story.username}'s story avatar`}
        />
      </View>

      <Text style={styles.storyUsername} numberOfLines={1} ellipsizeMode="tail">
        {story.username}
      </Text>
    </TouchableOpacity>
  );
}
