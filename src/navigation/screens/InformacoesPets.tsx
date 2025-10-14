import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Text, Button, ActivityIndicator } from "react-native-paper";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../config/firebase";
import { PhotoCarousel } from "../../components/PhotoCarousel";
import { Separator } from "../../components/Separator";
import { Animal } from "../../types/index";

export const InformacoesPets: React.FC<{ route: any }> = ({ route }) => {
  const [pet, setPet] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const { petId } = route.params;

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Erro", "Usuário não autenticado");
          setLoading(false);
          return;
        }

        const animaisCollectionRef = collection(db, "animais");
        const q = query(
          animaisCollectionRef,
          where("dono", "==", user.uid),
          where("__name__", "==", petId)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          Alert.alert("Erro", "Animal não encontrado");
          setLoading(false);
          return;
        }

        const petData = {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        } as Animal;

        setPet(petData);
      } catch (error) {
        console.error("Erro ao buscar detalhes do animal: ", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do animal");
      } finally {
        setLoading(false);
      }
    };

    if (petId) {
      fetchPetDetails();
    }
  }, [petId]);

  const handleRemovePet = async () => {
    if (!pet) return;

    Alert.alert(
      "Remover Animal",
      `Tem certeza que deseja remover ${pet.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "animais", pet.id));
              Alert.alert("Sucesso", "Animal removido com sucesso");
            } catch (error) {
              console.error("Erro ao remover animal: ", error);
              Alert.alert("Erro", "Não foi possível remover o animal");
            }
          },
        },
      ]
    );
  };

  const handleViewInterested = () => {
    Alert.alert(
      "Funcionalidade em desenvolvimento",
      "Em breve você poderá ver os interessados!"
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ffd358" />
        <Text style={styles.infoText}>Carregando informações...</Text>
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.infoText}>Animal não encontrado.</Text>
      </View>
    );
  }

  const getSexDisplay = (sexo: string) => {
    return sexo === "Macho" ? "Macho" : "Fêmea";
  };

  const getHealthStatus = (saude: string[]) => {
    const vaccinated = saude?.includes("Vacinado") || false;
    const dewormed = saude?.includes("Vermifugado") || false;
    const castrated = saude?.includes("Castrado") || false;
    return { vaccinated, dewormed, castrated };
  };

  const getTemperamentDisplay = (temperamento: string[]) => {
    return temperamento?.join(", ") || "Não informado";
  };

  const { vaccinated, dewormed, castrated } = getHealthStatus(pet.saude || []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <PhotoCarousel photos={pet.fotos || [pet.fotoPrincipal]} />

        <View style={styles.infoRow}>
          <Text style={styles.petName}>{pet.nome}</Text>
        </View>

        <View style={styles.infoRow}>
          <Info label="SEXO" value={getSexDisplay(pet.sexo)} />
          <Info label="PORTE" value={pet.porte} />
          <Info label="IDADE" value={pet.idade} />
        </View>

        <View style={styles.infoRow}>
          <Info label="LOCALIZAÇÃO" value={pet.localizacao} />
        </View>

        <View style={styles.infoRow}>
          <Info label="CASTRADO" value={castrated ? "Sim" : "Não"} />
          <Info label="VERMIFUGADO" value={dewormed ? "Sim" : "Não"} />
        </View>

        <View style={styles.infoRow}>
          <Info label="VACINADO" value={vaccinated ? "Sim" : "Não"} />
          <Info label="DOENÇAS" value={pet.doencas || "Nenhuma"} />
        </View>

        <View style={styles.infoRow}>
          <Info
            label="TEMPERAMENTO"
            value={getTemperamentDisplay(pet.temperamento)}
          />
        </View>

        <View style={styles.infoRow}>
          <Info label="ESPÉCIE" value={pet.especie} />
          <Info label="TIPO" value={pet.tipoCadastro} />
        </View>

        {pet.exigencias && pet.exigencias.length > 0 && (
          <Section
            title="EXIGÊNCIAS DO DOADOR"
            text={pet.exigencias.join(", ")}
          />
        )}

        {pet.sobre && (
          <Section
            title={`MAIS SOBRE ${pet.nome.toUpperCase()}`}
            text={pet.sobre}
          />
        )}

        <View style={styles.actionsRow}>
          <Button
            mode="outlined"
            textColor="#434343"
            style={styles.actionBtn}
            onPress={handleViewInterested}
          >
            Ver interessados
          </Button>
          <Button
            mode="outlined"
            textColor="#FF6B6B"
            style={[styles.actionBtn, styles.removeButton]}
            onPress={handleRemovePet}
          >
            Remover pet
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <View style={{ marginBottom: 12, flex: 1 }}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const Section = ({ title, text }: { title: string; text: string }) => (
  <View style={styles.section}>
    <Separator />
    <Text style={styles.infoLabel}>{title}</Text>
    <Text style={styles.infoValue}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  content: { paddingBottom: 80 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 16,
  },
  petName: {
    fontSize: 20,
    fontFamily: "Roboto-Medium",
    color: "#434343",
    textAlign: "center",
    width: "100%",
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "#589b9b",
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#757575",
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 28,
    gap: 12,
  },
  actionBtn: {
    borderColor: "#88c9bf",
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
  },
  removeButton: {
    borderColor: "#FF6B6B",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
    color: "#757575",
    fontFamily: "Roboto-Regular",
  },
});
