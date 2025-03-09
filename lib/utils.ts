import type { Notification } from "@/types";

export const checkImageURL = (url: string) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
      "i",
    );
    return pattern.test(url);
  }
};

// Section type
export type NotificationSection = {
  title: string;
  data: Notification[];
};

/**
 * Groups notifications by their type
 * @param notifications Array of notification objects
 * @returns Array of sections with title and data
 */
export const groupNotificationsByType = (
  notifications: Notification[],
): NotificationSection[] => {
  return notifications.reduce<NotificationSection[]>((acc, notification) => {
    const type = notification.type;
    const title = type.charAt(0).toUpperCase() + type.slice(1) + "s"; // Capitalize and pluralize

    // Find existing section or create new one
    const existingSection = acc.find((section) => section.title === title);

    if (existingSection) {
      existingSection.data.push(notification);
    } else {
      acc.push({ title, data: [notification] });
    }

    return acc;
  }, []);
};
