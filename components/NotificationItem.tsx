import { View, Text, TouchableOpacity, Image } from "react-native";
import { Heart, MessageCircle, UserRoundPlus } from "lucide-react-native";
import { Link } from "expo-router";
import { formatDistanceToNow } from "date-fns";

import { styles } from "../styles/notifications.style";
import { COLORS } from "../constants";
import type { Notification } from "../types";

type NotificationItemProps = {
  notification: Notification;
};

export default function NotificationItem(props: NotificationItemProps) {
  const {
    notification: {
      type: notificationType,
      comment,
      _creationTime: notificationCreationTime,
      sender,
      post,
    },
  } = props;

  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link href={`/user/${sender._id}`} asChild>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={{ uri: sender.image }}
              style={styles.avatar}
              resizeMode="cover"
            />

            <View style={styles.iconBadge}>
              {notificationType === "like" ? (
                <Heart color={COLORS.primary} size={14} />
              ) : notificationType === "follow" ? (
                <UserRoundPlus color={"#800080"} size={14} />
              ) : (
                <MessageCircle color={COLORS.secondary} size={14} />
              )}
            </View>
          </TouchableOpacity>
        </Link>

        <View style={styles.notificationInfo}>
          <Link href={`/user/${sender._id}`} asChild>
            <TouchableOpacity>
              <Text style={styles.username}>{sender.username}</Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.action}>
            {notificationType === "follow"
              ? "Start following you"
              : notificationType === "like"
                ? "Liked your post"
                : `commented: ${comment}`}
          </Text>

          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notificationCreationTime, { addSuffix: true })}
          </Text>
        </View>
      </View>

      {post && (
        <Image
          source={{ uri: post.imageUrl }}
          resizeMode="cover"
          style={styles.postImage}
        />
      )}
    </View>
  );
}
