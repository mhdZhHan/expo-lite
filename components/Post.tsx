import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Trash,
  Ellipsis,
} from "lucide-react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useUser } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "convex/react";

import { api } from "../convex/_generated/api";
import { type Id } from "../convex/_generated/dataModel";

import { styles } from "../styles/feed.style";
import { COLORS, SIZES } from "../constants";
import CommentsModel from "./CommentsModel";
import { formatDistanceToNow } from "date-fns";

type PostProps = {
  post: {
    _id: Id<"posts">;
    caption?: string | undefined;
    imageUrl: string;
    likes: number;
    comments: number;
    _creationTime: number;
    isLiked: boolean;
    isBookmarked: boolean;
    author: {
      _id: string;
      username: string;
      image: string;
    };
  };
};

export default function Post({ post }: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments);

  const { user } = useUser(); // user from clerk
  const currentUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip",
  ); // user details from convex db

  // ------------------------------------------------------
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const toggleLike = useMutation(api.posts.toggleLike);

  const handleLike = () => {
    const wasLiked = isLiked;
    // Optimistically update UI
    setIsLiked(!wasLiked);
    setLikesCount((prev) => (wasLiked ? prev - 1 : prev + 1));

    // API call in background
    toggleLike({ postId: post._id }).catch((error) => {
      console.error("Error liking post", error);
      setIsLiked(wasLiked);
      setLikesCount((prev) => (wasLiked ? prev + 1 : prev - 1));
    });
  };
  // ------------------------------------------------------

  // ------------------------------------------------------
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);

  const handleBookmark = () => {
    const wasBookmarked = isBookmarked;
    // Optimistically update UI
    setIsBookmarked(!wasBookmarked);

    // API call in background
    toggleBookmark({ postId: post._id }).catch((error) => {
      console.error("Error bookmarking post", error);
      setIsBookmarked(wasBookmarked);
    });
  };
  // ------------------------------------------------------

  const deletePost = useMutation(api.posts.deletePost);
  const handlePostDelete = async () => {
    deletePost({ postId: post._id }).catch((error) => {
      console.error("Error bookmarking post", error);
    });
  };

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Link href={`/(tabs)/profile`}>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy={"memory-disk"}
            />

            <Text style={styles.postUsername}>{post.author.username}</Text>
          </TouchableOpacity>
        </Link>

        {post?.author?._id === currentUser?._id ? (
          <TouchableOpacity onPress={handlePostDelete}>
            <Trash size={20} color={COLORS.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Ellipsis size={20} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>

      <Image
        source={post.imageUrl}
        style={styles.postImage}
        contentFit="contain"
        transition={200}
        cachePolicy={"memory-disk"}
      />

      {/* POST ACTIONS */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity onPress={handleLike}>
            <Heart
              size={SIZES.lg}
              color={isLiked ? COLORS.primary : COLORS.white}
              fill={isLiked ? COLORS.primary : undefined}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowComments(true)}>
            <MessageCircle size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleBookmark}>
          <Bookmark
            size={22}
            color={isBookmarked ? COLORS.primary : COLORS.white}
            fill={isBookmarked ? COLORS.primary : undefined}
          />
        </TouchableOpacity>
      </View>

      {/* POST INFO */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>
          {likesCount > 0
            ? `${likesCount.toLocaleString()} likes`
            : `Be the first to like`}
        </Text>

        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}

        {commentsCount > 0 && (
          <TouchableOpacity onPress={() => setShowComments(true)}>
            <Text
              style={styles.commentsText}
            >{`View all ${commentsCount} comments`}</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.timeAgo}>
          {` ${formatDistanceToNow(post._creationTime, { addSuffix: true })} hours ago`}
        </Text>
      </View>

      <CommentsModel
        postId={post._id}
        visible={showComments}
        onClose={() => setShowComments(false)}
        onCommentAdded={() => {
          setCommentsCount((prev) => prev + 1);
        }}
      />
    </View>
  );
}
