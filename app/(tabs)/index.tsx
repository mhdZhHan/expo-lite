import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { LogOut } from "lucide-react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { styles } from "@/styles/feed.style";
import { COLORS, SIZES } from "@/constants";

import { STORIES } from "@/constants/mock-data";

// components
import UserStoryCircle from "@/components/UserStoryCircle";
import Loader from "@/components/Loader";
import NoPostsFound from "@/components/NoPostsFound";
import Post from "@/components/Post";

export default function Index() {
  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  if (posts === undefined) return <Loader />;

  if (posts.length === 0) return <NoPostsFound />;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>expo lite</Text>

        <TouchableOpacity onPress={() => signOut()}>
          <LogOut size={SIZES.lg} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
        >
          {STORIES.map((story) => (
            <UserStoryCircle key={story.id} story={story} />
          ))}
        </ScrollView>

        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </ScrollView> */}

      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={StoriesSection}
      />
    </View>
  );
}

const StoriesSection = () => {
  return (
    <FlatList
      data={STORIES}
      style={styles.storiesContainer}
      renderItem={({ item }) => <UserStoryCircle story={item} />}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
