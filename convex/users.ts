import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
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

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    return user;
  },
});

// helper functions
export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  const currentUser = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first(); // identity.subject => current user `clerkId`

  if (!currentUser) throw new Error("User not found");

  return currentUser;
}
