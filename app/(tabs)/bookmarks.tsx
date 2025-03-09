import { View, Text, FlatList, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { useQuery } from "convex/react";

import { styles } from "@/styles/feed.style";
import { api } from "@/convex/_generated/api";

// components
import Loader from "@/components/Loader";
import NotFound from "@/components/NotFound";

export default function Bookmarks() {
  const { width } = useWindowDimensions();

  // Container padding
  const containerPadding = 16;

  // Gap between items
  const gap = 8;

  // number of columns based on screen width
  const numColumns = width >= 768 ? 3 : 2;

  // available width for grid items
  const availableWidth = width - containerPadding * 2;

  // total gap space between columns
  const totalGapSpace = gap * (numColumns - 1);

  // item width
  const itemWidth = (availableWidth - totalGapSpace) / numColumns;
  // -----------------------------------------------------------------

  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);

  if (bookmarkedPosts === undefined) return <Loader />;

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>

      <FlatList
        data={bookmarkedPosts}
        renderItem={({ item }) => (
          <View
            style={{
              width: itemWidth,
              marginBottom: gap,
            }}
          >
            <Image
              source={item?.imageUrl}
              style={{
                width: "100%",
                aspectRatio: 1,
                borderRadius: 5,
              }}
              contentFit="cover"
              transition={200}
              cachePolicy={"memory-disk"}
            />
          </View>
        )}
        keyExtractor={(item) => item?._id.toString()!}
        numColumns={numColumns}
        key={numColumns} // Force re-render when columns change
        ListEmptyComponent={<NotFound text="No bookmarks yet" />}
        contentContainerStyle={{
          padding: containerPadding,
          paddingBottom: 20,
          ...(bookmarkedPosts.length === 0 && {
            flex: 1,
            justifyContent: "center",
          }),
        }}
        columnWrapperStyle={
          bookmarkedPosts.length > 0
            ? {
                justifyContent: "space-between",
              }
            : undefined
        }
      />
    </View>
  );
}
