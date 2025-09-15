import * as React from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { Appbar, Card, Text, IconButton } from "react-native-paper";

const CARD = {
  width: 344,
  height: 264,
  headerH: 32,
  imageH: 183,
} as const;
const FOOTER_H = CARD.height - CARD.headerH - CARD.imageH; // 49

type Pet = {
  id: string;
  name: string;
  image: string;
  gender: string;
  age: string;
  size: string;
  location: string;
};

const pets: Pet[] = [
  {
    id: "1",
    name: "Bidu",
    image: "https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=800&auto=format&fit=crop",
    gender: "MACHO",
    age: "ADULTO",
    size: "MÉDIO",
    location: "SAMAMBAIA SUL – DISTRITO FEDERAL",
  },
  {
    id: "2",
    name: "Alec",
    image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=800&auto=format&fit=crop",
    gender: "MACHO",
    age: "FILHOTE",
    size: "PEQUENO",
    location: "BRASÍLIA – DISTRITO FEDERAL",
  },
];

export function Adotar() {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Action icon="menu" color="#434343" size={24} onPress={() => {}} />
        <Appbar.Content title="Adotar" titleStyle={styles.appBarTitle} />
        <Appbar.Action icon="magnify" color="#434343" size={24} onPress={() => {}} />
      </Appbar.Header>

      <FlatList
        data={pets}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card} mode="elevated">
            {/* Header 344x32 #fee29b */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <IconButton
                icon="heart-outline"
                size={24}
                iconColor="#434343"
                onPress={() => {}}
              />
            </View>

            {/* Imagem 344x183 */}
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* Footer 49 de altura (centralizado) */}
            <View style={styles.footer}>
              <View style={styles.tagsRow}>
                <Text style={styles.tag}>{item.gender}</Text>
                <Text style={styles.tag}>{item.age}</Text>
                <Text style={styles.tag}>{item.size}</Text>
              </View>
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // AppBar 56dp
  appBar: { backgroundColor: "#ffd358", height: 56 },
  appBarTitle: { fontSize: 20, color: "#434343", fontFamily: "Roboto-Medium" },

  // Lista com margens 8dp
  list: { paddingHorizontal: 8, paddingTop: 8, paddingBottom: 16 },

  // Card 344x264, centralizado e com espaçamento de 8dp
  card: {
    width: CARD.width,
    height: CARD.height,
    alignSelf: "center",
    marginVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
  },

  // Header do card (retângulo 344x32 #fee29b)
  cardHeader: {
    height: CARD.headerH,
    backgroundColor: "#fee29b",
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 16,
    color: "#434343",
    fontFamily: "Roboto-Medium",
  },

  // Imagem 344x183
  image: {
    width: CARD.width,
    height: CARD.imageH,
  },

  // Footer 49dp, com conteúdo centralizado
  footer: {
    height: FOOTER_H, // 49
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  tagsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 4,
  },
  tag: {
    fontSize: 12,
    color: "#434343",
    fontFamily: "Roboto-Regular",
  },
  location: {
    fontSize: 12,
    color: "#434343",
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
});
