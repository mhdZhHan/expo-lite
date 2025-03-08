import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "../constants";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.md,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: SIZES.md,
    fontWeight: 600,
    color: COLORS.white,
  },
  contentDisabled: {
    opacity: 0.7,
  },
  shareButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  shareButtonDisabled: {
    opacity: 0.5,
  },
  shareText: {
    color: COLORS.primary,
    fontSize: SIZES.md,
    fontWeight: 600,
  },
  shareTextDisabled: {
    color: COLORS.grey,
  },
  emptyImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  emptyImageText: {
    color: COLORS.grey,
    fontSize: SIZES.md,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageSection: {
    width: width,
    height: width,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  changeImageButton: {
    position: "absolute",
    bottom: SIZES.md,
    right: SIZES.md,
    backgroundColor: "rgba(0,0,0,0.75)",
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.sm,
    borderRadius: SIZES.sm,
    gap: 6,
  },
  changeImageText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 500,
  },
  inputSection: {
    padding: SIZES.md,
    flex: 1,
  },
  captionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SIZES.sm,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignSelf: "flex-start",
  },
  captionInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: SIZES.md,
    minHeight: 40,
    padding: 4,
  },
});
