import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import NotFound from "@/components/NotFound";
import Post from "@/components/Post";
import { useState } from "react";

export default function Index() {
  const { signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const posts = useQuery(api.posts.getFeedPosts);

  if (posts === undefined) return <Loader />;

  // NOTE: this does nothing just for fun, Convex is a supercharged backend! 🚀
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

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
        ListEmptyComponent={<NotFound text="No posts yet" />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary} // Makes the spinner match your app's theme
            colors={[COLORS.primary]} // Android
          />
        }
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
