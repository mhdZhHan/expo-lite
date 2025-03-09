import { Modal, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { X } from "lucide-react-native";
import { COLORS, SIZES } from "../../constants";
import { styles } from "../../styles/profile.style";
import type { Doc } from "@/convex/_generated/dataModel";

type PostDetailModalProps = {
  post: Doc<"posts"> | null;
  onClose: () => void;
};

export default function PostDetailModal({
  post,
  onClose,
}: PostDetailModalProps) {
  return (
    <Modal visible={!!post} transparent onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalBackdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        {post && (
          <TouchableOpacity
            style={styles.postDetailContainer}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.postDetailHeader}>
              <TouchableOpacity onPress={onClose}>
                <X size={SIZES.lg} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            <Image
              source={post.imageUrl}
              style={styles.postDetailImage}
              cachePolicy="memory-disk"
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Modal>
  );
}
