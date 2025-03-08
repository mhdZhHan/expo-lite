import { useState } from "react";
import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { X } from "lucide-react-native";
import { useMutation, useQuery } from "convex/react";

import { type Id } from "../convex/_generated/dataModel";
import { api } from "../convex/_generated/api";

import { styles } from "../styles/feed.style";
import { COLORS, SIZES } from "../constants";

// components
import Loader from "./Loader";
import Comment from "./Comment";

type CommentsModelProps = {
  postId: Id<"posts">;
  visible: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
};

export default function CommentsModel({
  onClose,
  onCommentAdded,
  postId,
  visible,
}: CommentsModelProps) {
  const [newComment, setNewComment] = useState("");

  const comments = useQuery(api.comments.getComments, { postId });
  const addComment = useMutation(api.comments.addComment);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addComment({
        postId,
        comment: newComment.trim(),
      });

      setNewComment("");
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.container}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <X size={SIZES.lg} color={COLORS.white} />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Comments</Text>
          <View style={{ width: 24 }}></View>
        </View>

        {comments === undefined ? (
          <Loader />
        ) : (
          <FlatList
            data={comments}
            renderItem={({ item }) => <Comment comment={item} />}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={styles.commentsList}
          />
        )}

        <View style={styles.commentInput}>
          <TextInput
            style={styles.input}
            placeholder="Add your comment..."
            placeholderTextColor={COLORS.grey}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />

          <TouchableOpacity
            onPress={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Text
              style={[
                styles.postButton,
                !newComment.trim() && styles.postButtonDisabled,
              ]}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
