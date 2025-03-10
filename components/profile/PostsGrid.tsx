import { FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { styles } from "../../styles/profile.style";
import type { Doc } from "@/convex/_generated/dataModel";

type PostsGridProps = {
  posts: Doc<"posts">[];
  onPostPress?: (post: Doc<"posts">) => void;
};

export default function PostsGrid({ posts, onPostPress }: PostsGridProps) {
  return (
    <FlatList
      data={posts}
      numColumns={3}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.gridItem}
          onPress={onPostPress ? () => onPostPress(item) : () => {}}
        >
          <Image
            source={item.imageUrl}
            style={styles.gridImage}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item._id}
    />
  );
}
