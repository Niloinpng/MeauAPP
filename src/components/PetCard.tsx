import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

const CARD = {
  width: 344,
  height: 264,
  headerH: 32,
  imageH: 183,
} as const;
const FOOTER_H = CARD.height - CARD.headerH - CARD.imageH;

type Pet = {
  id: string;
  name: string;
  image: string;
  gender: string;
  age: string;
  size: string;
  location: string;
};

interface PetCardProps {
  pet: Pet;
}

export const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <Card style={styles.card} mode="elevated">
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{pet.name}</Text>
        <IconButton
          icon="heart-outline"
          size={24}
          iconColor="#434343"
          onPress={() => {
            console.log(`Favoritou ${pet.name}`);
          }}
        />
      </View>

      <Image source={{ uri: pet.image }} style={styles.image} />

      <View style={styles.footer}>
        <View style={styles.tagsRow}>
          <Text style={styles.tag}>{pet.gender}</Text>
          <Text style={styles.tag}>{pet.age}</Text>
          <Text style={styles.tag}>{pet.size}</Text>
        </View>
        <Text style={styles.location}>{pet.location}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD.width,
    height: CARD.height,
    alignSelf: 'center',
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    height: CARD.headerH,
    backgroundColor: '#fee29b',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    color: '#434343',
    fontFamily: 'Roboto-Medium',
  },
  image: {
    width: CARD.width,
    height: CARD.imageH,
  },
  footer: {
    height: FOOTER_H,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  tagsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 4,
  },
  tag: {
    fontSize: 12,
    color: '#434343',
    fontFamily: 'Roboto-Regular',
  },
  location: {
    fontSize: 12,
    color: '#434343',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
});