import { useState } from "react";
import { View, ScrollView } from "react-native";
import { useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/profile.style";
import type { Doc } from "@/convex/_generated/dataModel";

// Components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import PostsGrid from "@/components/profile/PostsGrid";
import EditProfileModal from "@/components/profile/EditProfileModal";
import PostDetailModal from "@/components/profile/PostDetailModal";

import Loader from "@/components/Loader";
import NotFound from "@/components/NotFound";

export default function Profile() {
  const { signOut, userId } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);

  const user = useQuery(
    api.users.getUserByClerkId,
    userId ? { clerkId: userId } : "skip",
  );
  const posts = useQuery(api.posts.getPostsByUser, {});
  const updateProfile = useMutation(api.users.updateUserProfile);

  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || "",
    bio: user?.bio || "",
  });

  const handleUpdateProfile = async () => {
    await updateProfile(profileForm);
    setIsEditModalOpen(false);
  };

  if (!user || posts === undefined) return <Loader />;

  if (posts.length === 0) return <NotFound text="No posts yet" />;

  return (
    <View style={styles.container}>
      <ProfileHeader username={user.username} onSignOut={signOut} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileInfo
          user={user}
          onEditProfile={() => setIsEditModalOpen(true)}
        />
        <PostsGrid posts={posts} onPostPress={setSelectedPost} />
      </ScrollView>

      <EditProfileModal
        isVisible={isEditModalOpen}
        profileForm={profileForm}
        setProfileForm={setProfileForm}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateProfile}
      />

      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </View>
  );
}
