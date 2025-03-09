import type { Id } from "@/convex/_generated/dataModel";

export type Story = {
  id: number;
  username: string;
  avatar: string;
  hasStory: boolean;
};

export type Notification = {
  _id: Id<any>;
  _creationTime: number;
  type: "comment" | "like" | "follow";
  comment?: string;
  sender: {
    _id: Id<"users">;
    username: string;
    image: string;
  };
  post: {
    _id: Id<"posts">;
    _creationTime: number;
    caption?: string;
    comments: number;
    userId: Id<"users">;
    storageId: Id<"_storage">;
    imageUrl: string;
    likes: number;
  } | null;
  senderId: Id<"users">;
  receiverId?: Id<"users">;
  postId?: Id<"posts">;
  commentId?: Id<any>;
};
