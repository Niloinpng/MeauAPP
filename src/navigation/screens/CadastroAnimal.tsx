import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text} from "react-native-paper";
import SEButton from "../../components/SEButton";
import SETitle from '../../components/SETitle';
import SETextInput from '../../components/SETextInput';
import SERadioButtonGroup from "../../components/SERadioButtonGroup";

const AGE_OPTIONS = ['Filhote', 'Adulto', 'Idoso'];

export function CadastroAnimal() {
    const [nome, setNome] = useState('');
    const [selectedAge, setSelectedAge] = useState<string | null>(null);

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tenho interesse em adotar um animal para:</Text>
        
        <SETitle type="principal" color="preta">
          Adoção
        </SETitle>

        <SETitle type="second" color="azul">
          NOME DO ANIMAL
        </SETitle>

        <SETextInput
          placeholder="Nome do Animal"
          value={nome}
          onChangeText={setNome} 
        />

        <SETitle type="second" color="azul">
          FOTOS DO ANIMAL
        </SETitle>

        <SETitle type="second" color="azul">
          ESPÉCIE
        </SETitle>


        <SETitle type="second" color="azul">
          SEXO
        </SETitle>

        <SETitle type="second" color="azul">
          PORTE
        </SETitle>

        <SETitle type="second" color="azul">
          IDADE
        </SETitle>

        <SERadioButtonGroup
          options={AGE_OPTIONS}
          selectedValue={selectedAge}
          onValueChange={setSelectedAge}
        />

        <SETitle type="second" color="azul">
          TEMPERAMENTO
        </SETitle>

        <SETitle type="second" color="azul">
          SAÚDE
        </SETitle>

        <SETitle type="second" color="azul">
          EXIGÊNCIAS PARA ADOÇÃO
        </SETitle>

        <SETitle type="second" color="azul">
          SOBRE O ANIMAL
        </SETitle>

        <SETextInput
          placeholder="Compartilhe a história do animal"
          value={nome}
          onChangeText={setNome} 
        />

        <SEButton backgroundColor = '#88C9BF'>COLOCAR PARA ADOÇÃO</SEButton>

      </View>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  text: {
    fontSize: 14,
    color: '#757575',
  }
});
  