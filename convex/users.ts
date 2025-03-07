import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    username: v.string(),
    fullName: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    // check user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) return;

    // create user in db
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      username: args.username,
      fullName: args.fullName,
      email: args.email,
      bio: args.bio,
      image: args.image,
      followers: 0,
      following: 0,
      posts: 0,
    });
  },
});
