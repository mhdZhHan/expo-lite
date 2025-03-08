import { View, Text, TouchableOpacity } from "react-native";
import { Bookmark, Heart, MessageCircle, Trash } from "lucide-react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { Id } from "../convex/_generated/dataModel";

import { styles } from "../styles/feed.style";
import { COLORS, SIZES } from "../constants";

type PostProps = {
  post: {
    _id: Id<"posts">;
    caption?: string | undefined;
    imageUrl: string;
    likes: number;
    comments: number;
    _creationTime: number;
    author: {
      _id: string;
      username: string;
      image: string;
    };
  };
};

export default function Post({ post }: PostProps) {
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

        <TouchableOpacity>
          <Trash size={20} color={COLORS.primary} />
        </TouchableOpacity>
        {/* 
        <TouchableOpacity>
          <Ellipsis size={20} color={COLORS.white} />
        </TouchableOpacity> */}
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
          <TouchableOpacity>
            <Heart size={SIZES.lg} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MessageCircle size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Bookmark size={22} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* POST INFO */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>Be the first to like</Text>

        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}

        <TouchableOpacity>
          <Text style={styles.commentsText}>View all 2 comments</Text>
        </TouchableOpacity>

        <Text style={styles.timeAgo}>2 hours ago</Text>
      </View>
    </View>
  );
}
