import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Image as ExpoImage } from "expo-image";
import { useUser } from "@clerk/clerk-expo";
import { ArrowLeft, ImagePlus, X } from "lucide-react-native";

import { styles } from "@/styles/create.style";
import { COLORS, SIZES } from "@/constants";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Create() {
  const router = useRouter();
  const { user } = useUser();

  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const createPost = useMutation(api.posts.createPost);

  const handleShare = async () => {
    if (!selectedImage) return;

    try {
      setIsSharing(true);

      const uploadUrl = await generateUploadUrl();
      const uploadResult = await FileSystem.uploadAsync(
        uploadUrl,
        selectedImage,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
          mimeType: "image/jpeg",
        },
      );

      if (uploadResult.status !== 200) throw new Error("Upload failed");
      const { storageId } = JSON.parse(uploadResult.body);

      await createPost({ storageId, caption });

      router.push("/(tabs)");
    } catch (error) {
      console.error("Error sharing the post", error);
    } finally {
      setIsSharing(false);
    }
  };

  if (!selectedImage) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={COLORS.primary} size={SIZES.lg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <View style={{ width: SIZES.lg }} />
        </View>

        <TouchableOpacity
          style={styles.emptyImageContainer}
          onPress={pickImage}
        >
          <ImagePlus color={COLORS.grey} size={SIZES["3xl"]} />
          <Text style={styles.emptyImageText}>Tap to select and image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setSelectedImage("");
            setCaption("");
          }}
        >
          <X color={isSharing ? COLORS.grey : COLORS.white} size={SIZES.lg} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Post</Text>

        <TouchableOpacity
          style={[styles.shareButton, isSharing && styles.shareButtonDisabled]}
          onPress={handleShare}
          disabled={isSharing || !selectedImage}
        >
          {isSharing ? (
            <ActivityIndicator size={"small"} color={COLORS.primary} />
          ) : (
            <Text style={styles.shareText}>Share</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContent}
        bounces={false}
        keyboardShouldPersistTaps="never"
        contentOffset={{ x: 0, y: 100 }}
      >
        <View style={[styles.content, isSharing && styles.contentDisabled]}>
          {/* IMAGE SECTION */}
          <View style={styles.imageSection}>
            <ExpoImage
              source={selectedImage}
              style={styles.previewImage}
              contentFit="cover"
              transition={200}
            />

            <TouchableOpacity
              style={styles.changeImageButton}
              onPress={pickImage}
              disabled={isSharing}
            >
              <ImagePlus color={COLORS.grey} size={SIZES.md} />
              <Text style={styles.emptyImageText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* INPUT SECTION */}
          <View style={styles.inputSection}>
            <View style={styles.captionContainer}>
              <Image
                source={{ uri: user?.imageUrl }}
                style={styles.userAvatar}
                resizeMode="cover"
              />

              <TextInput
                style={styles.captionInput}
                placeholder="Write a caption"
                placeholderTextColor={COLORS.grey}
                multiline
                value={caption}
                onChangeText={setCaption}
                editable={!isSharing}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
