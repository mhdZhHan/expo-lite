import { View, Text, Image } from "react-native";
import { formatDistanceToNow } from "date-fns";

import { styles } from "../styles/feed.style";

type CommentProps = {
  comment: {
    user: {
      fullName: string;
      image: string;
    };
    _creationTime: number;
    comment: string;
  };
};

export default function Comment({ comment }: CommentProps) {
  const {
    comment: commentText,
    user: { fullName, image },
    _creationTime: creationTime,
  } = comment;

  return (
    <View style={styles.commentContainer}>
      <Image
        source={{ uri: image }}
        style={styles.commentAvatar}
        resizeMode="cover"
      />

      <View style={styles.commentContent}>
        <Text style={styles.commentUsername}>{fullName}</Text>
        <Text style={styles.commentText}>{commentText}</Text>
        <Text style={styles.commentTime}>
          {formatDistanceToNow(creationTime, { addSuffix: true })}
        </Text>
      </View>
    </View>
  );
}
