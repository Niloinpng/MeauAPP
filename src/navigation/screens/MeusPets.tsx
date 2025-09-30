import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, IconButton, Button, FAB } from "react-native-paper";
import { PhotoCarousel } from "../../components/PhotoCarousel";

type Pet = {
  name: string;
  age: string;
  species: string;
  sex: string;
  size: string;
  temperament: string[];
  vaccinated: boolean;
  dewormed: boolean;
  castrated: boolean;
  diseases?: string;
  avatar: string;
  photos: string[];
  status: "available" | "adopted" | "reserved";
  city: string;
  description?: string;
  donorRequirements?: string;
  needs?: string;
};

const mockPet: Pet = {
  name: "Pequi",
  age: "adult",
  species: "dog",
  sex: "male",
  size: "small",
  temperament: ["brincalhão", "dócil"],
  vaccinated: false,
  dewormed: true,
  castrated: false,
  diseases: "Nenhuma",
  avatar: "https://thisdogexists.com/photos/b-109.jpeg",
  photos: [
    "https://thisdogexists.com/photos/b-109.jpeg",
    "https://thisdogexists.com/photos/b-110.jpeg",
    "https://thisdogexists.com/photos/b-111.jpeg",
  ],
  status: "available",
  city: "Planaltina – Brasília",
  description:
    "Pequi é um cão muito dócil e de fácil convivência. Adora caminhadas e se dá muito bem com crianças. Tem muito medo de raios e chuva. Está disponível para adoção pois eu e minha família o encontramos na rua e não podemos mantê-lo em nossa casa.",
  donorRequirements:
    "Termo de apadrinhamento, auxílio financeiro com alimentação",
  needs: "Ajuda financeira e alimento",
};

export const MeusPets: React.FC = () => {
  const pet = mockPet;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <PhotoCarousel photos={pet.photos} />

        <View style={styles.infoRow}>
          <Info label="SEXO" value={pet.sex === "male" ? "Macho" : "Fêmea"} />
          <Info label="LOCALIZAÇÃO" value={pet.city} />
        </View>

        <View style={styles.infoRow}>
          <Info label="CASTRADO" value={pet.castrated ? "Sim" : "Não"} />
          <Info label="VERMIFUGADO" value={pet.dewormed ? "Sim" : "Não"} />
          <Info label="VACINADO" value={pet.vaccinated ? "Sim" : "Não"} />
        </View>

        <View style={styles.infoRow}>
          <Info label="TEMPERAMENTO" value={pet.temperament.join(", ")} />
        </View>

        <View style={styles.infoRow}>
          <Info label="DOENÇAS" value={pet.diseases ?? "Nenhuma"} />
        </View>

        <View style={styles.infoRow}>
          <Info label="PORTE" value={pet.size} />
          <Info label="IDADE" value={pet.age} />
        </View>

        <Section
          title={`MAIS SOBRE ${pet.name.toUpperCase()}`}
          text={pet.description ?? ""}
        />

        <View style={styles.actionsRow}>
          <Button mode="outlined" textColor="#434343" style={styles.actionBtn}>
            Ver interessados
          </Button>
          <Button mode="outlined" textColor="#434343" style={styles.actionBtn}>
            Remover pet
          </Button>
        </View>

        {/* DONOR REQUIREMENTS */}
        <Section
          title="EXIGÊNCIAS DO DOADOR"
          text={pet.donorRequirements ?? ""}
        />

        {/* PET NEEDS */}
        <Section
          title={`O ${pet.name.toUpperCase()} PRECISA DE`}
          text={pet.needs ?? ""}
        />
      </ScrollView>
    </View>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const Section = ({ title, text }: { title: string; text: string }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{text}</Text>
  </View>
);

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

  image: { width: "100%", height: 184, backgroundColor: "#eee" },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },

  infoLabel: { fontSize: 12, fontFamily: "Roboto-Regular", color: "#589b9b" },
  infoValue: { fontSize: 14, fontFamily: "Roboto-Regular", color: "#757575" },

  section: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: "#434343",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#757575",
    lineHeight: 20,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 28,
  },
  actionBtn: { borderColor: "#88c9bf", borderWidth: 1, borderRadius: 4 },

  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#fafafa",
  },
});
