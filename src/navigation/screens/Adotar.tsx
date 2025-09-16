mport * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { PetCard } from '../../components/PetCard'; 

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
    id: '1',
    name: 'Bidu',
    image: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=800&auto=format&fit=crop',
    gender: 'MACHO',
    age: 'ADULTO',
    size: 'MÉDIO',
    location: 'SAMAMBAIA SUL – DISTRITO FEDERAL',
  },
  {
    id: '2',
    name: 'Alec',
    image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=800&auto=format&fit=crop',
    gender: 'MACHO',
    age: 'FILHOTE',
    size: 'PEQUENO',
    location: 'BRASÍLIA – DISTRITO FEDERAL',
  },
];

export function Adotar() {
  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <PetCard pet={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  list: { 
    paddingHorizontal: 8, 
    paddingTop: 8, 
    paddingBottom: 16 
  },
});