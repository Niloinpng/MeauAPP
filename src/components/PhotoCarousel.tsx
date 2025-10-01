import { useRef, useState } from "react";
import { FlatList, View, TouchableOpacity, StyleSheet, Dimensions, Image, Text } from "react-native";
import { IconButton } from "react-native-paper";

const SCREEN_WIDTH = Dimensions.get('window').width; 

export const PhotoCarousel = ({ photos }: { photos: string[] }) => {
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList<string>>(null);

  const goTo = (next: number) => {
    if (next < 0 || next >= photos.length) return;
    ref.current?.scrollToIndex({ index: next, animated: true });
    setIndex(next);
    console.log('goTo', next);
    console.log('index', index);
    console.log('photos.length', photos);
  };

  if (!photos || photos.length === 0) {
    return (
      <View style={[styles.carouselWrapper, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>No photos available</Text>
      </View>
    );
  }

  return (
    <View style={styles.carouselWrapper}>
      <FlatList
        ref={ref}
        data={photos}
        keyExtractor={(uri, i) => `${uri}-${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, i) => ({ length: SCREEN_WIDTH, offset: SCREEN_WIDTH * i, index: i })}
        onMomentumScrollEnd={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          setIndex(Math.round(x / SCREEN_WIDTH));
        }}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.carouselImage} />
        )}
      />

      {photos.length > 1 && (
        <>
          <TouchableOpacity style={[styles.arrow, styles.arrowLeft]} onPress={() => goTo(index - 1)} activeOpacity={0.7}>
            <IconButton icon="chevron-left" size={24} iconColor="#434343" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.arrow, styles.arrowRight]} onPress={() => goTo(index + 1)} activeOpacity={0.7}>
            <IconButton icon="chevron-right" size={24} iconColor="#434343" />
          </TouchableOpacity>
        </>
      )}

      {photos.length > 1 && (
        <View style={styles.dots}>
          {photos.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index ? styles.dotActive : null
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  content: { paddingBottom: 80 },

  headerRow: {
    backgroundColor: "#88c9bf",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: { fontSize: 20, fontFamily: "Roboto-Medium", color: "#434343" },

  carouselWrapper: {
    width: '100%',
    height: 184,           
    backgroundColor: '#eee',
    position: 'relative',
  },
  carouselImage: {
    width: SCREEN_WIDTH,         
    height: 184,
    resizeMode: 'contain',
  },
  dots: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    height: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(67,67,67,0.35)',
  },
  dotActive: {
    backgroundColor: '#434343',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  arrow: {
    position: 'absolute',
    top: '45%',
    backgroundColor: 'rgba(250,250,250,0.9)',
    borderRadius: 999,
  },
  arrowLeft: { left: 8 },
  arrowRight: { right: 8 },
});