import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { X } from "lucide-react-native";
import { COLORS, SIZES } from "../../constants";
import { styles } from "../../styles/profile.style";

type EditProfileModalProps = {
  isVisible: boolean;
  profileForm: { fullName: string; bio: string };
  setProfileForm: (data: { fullName: string; bio: string }) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function EditProfileModal({
  isVisible,
  profileForm,
  setProfileForm,
  onClose,
  onSave,
}: EditProfileModalProps) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalContainer}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>

              <TouchableOpacity onPress={onClose}>
                <X size={SIZES.lg} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            {/* NAME UPDATE */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={profileForm.fullName}
                onChangeText={(text) =>
                  setProfileForm({ ...profileForm, fullName: text })
                }
                placeholderTextColor={COLORS.grey}
              />
            </View>

            {/* BIO UPDATE */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                numberOfLines={4}
                multiline
                value={profileForm.bio}
                onChangeText={(text) =>
                  setProfileForm({ ...profileForm, bio: text })
                }
                placeholderTextColor={COLORS.grey}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
