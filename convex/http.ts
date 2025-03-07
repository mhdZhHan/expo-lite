import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

// Clerk webhook event structure
type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses: { email_address: string }[];
    first_name?: string;
    last_name?: string;
    image_url?: string;
  };
};

// Svix headers structure
type SvixHeaders = {
  "svix-id": string;
  "svix-signature": string;
  "svix-timestamp": string;
};

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webHookSecret = process.env.CLERK_WEBHOOK_SECRET as string;
    if (!webHookSecret) {
      throw new Error(
        "CLERK_WEBHOOK_SECRET environment variable is not configured. Please add it in your Convex dashboard under Environment Variables.",
      );
    }

    // Get headers
    const svixId = request.headers.get("svix-id");
    const svixSignature = request.headers.get("svix-signature");
    const svixTimestamp = request.headers.get("svix-timestamp");

    // Check for missing headers
    if (!svixId || !svixSignature || !svixTimestamp) {
      return new Response("Missing required Svix headers", {
        status: 400,
      });
    }

    // Create headers object with correct typing
    const headers: SvixHeaders = {
      "svix-id": svixId,
      "svix-signature": svixSignature,
      "svix-timestamp": svixTimestamp,
    };

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webHookSecret);
    let evt: ClerkWebhookEvent;

    // Verify webhook
    try {
      evt = wh.verify(body, headers) as ClerkWebhookEvent;
    } catch (error) {
      console.error("Error verifying webhook:", error);
      return new Response("Webhook verification failed", {
        status: 400,
      });
    }

    // Handle user.created event
    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;

      // Validate email_address array
      if (!email_addresses?.length) {
        return new Response("No email address provided", {
          status: 400,
        });
      }

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.createUser, {
          clerkId: id,
          email,
          fullName: name,
          image: image_url || "",
          username: email.split("@")[0],
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error creating user", {
          status: 500,
        });
      }
    }

    return new Response("Webhook processed successfully", {
      status: 200,
    });
  }),
});

export default http;
