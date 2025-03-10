import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

import Loader from "@/components/Loader";
import { styles } from "@/styles/profile.style";
import { ArrowLeft, Images } from "lucide-react-native";
import { COLORS } from "@/constants";
import PostsGrid from "@/components/profile/PostsGrid";

export default function UserProfile() {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  const profile = useQuery(api.users.getUserProfile, { id: id as Id<"users"> });
  const posts = useQuery(api.posts.getPostsByUser, {
    userId: id as Id<"users">,
  });
  const isFollowing = useQuery(api.users.isFollowing, {
    followingId: id as Id<"users">,
  });

  const toggleFollow = useMutation(api.users.toggleFollow);

  if (profile === undefined || posts === undefined || isFollowing === undefined)
    return <Loader />;

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{profile.username}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarAndStats}>
            {/* AVATAR */}
            <Image
              source={{ uri: profile.image }}
              style={styles.avatar}
              resizeMode="cover"
            />

            {/* STATS */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <Text style={styles.name}>{profile.fullName}</Text>
          {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}

          <Pressable
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={() => toggleFollow({ followingId: id as Id<"users"> })}
          >
            <Text
              style={[
                styles.followButtonText,
                isFollowing && styles.followingButtonText,
              ]}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </Pressable>

          <View style={styles.postsGrid}>
            {posts.length === 0 ? (
              <View style={styles.noPostsContainer}>
                <Images size={48} color={COLORS.grey} />
                <Text style={styles.noPostsText}>No posts yet</Text>
              </View>
            ) : (
              <PostsGrid posts={posts} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
