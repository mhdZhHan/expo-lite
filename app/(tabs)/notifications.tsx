import { View, Text, SectionList } from "react-native";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/notifications.style";

// components
import Loader from "@/components/Loader";
import NotFound from "@/components/NotFound";
import NotificationItem from "@/components/NotificationItem";

import { COLORS, SIZES } from "@/constants";
import { groupNotificationsByType } from "@/lib/utils";
import type { Notification } from "@/types";

export default function Notifications() {
  const notifications = useQuery(api.notifications.getNotifications) as
    | Notification[]
    | undefined;

  if (notifications === undefined) return <Loader />;
  // if (notifications.length === 0)
  //   return <NotFound text="No notifications yet" />;

  // Use utility function to group notifications
  const groupedNotifications = groupNotificationsByType(notifications);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <SectionList
        sections={groupedNotifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              backgroundColor: COLORS.background,
              paddingVertical: 8,
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: SIZES.md,
                color: COLORS.text,
              }}
            >
              {title}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        stickySectionHeadersEnabled={true}
        ListEmptyComponent={<NotFound text="No notifications yet" />}
      />
    </View>
  );
}
