import React, { useState } from "react";
import { View, StyleSheet,TouchableOpacity  } from "react-native";
import { Text} from "react-native-paper";
import SEButton from "../../components/SEButton";
import SETitle from '../../components/SETitle';
import SETextInput from '../../components/SETextInput';
import SERadioButtonGroup from "../../components/SERadioButtonGroup";

const OPTIONS = ['ADOÇÃO','APADRINHAR','AJUDAR'] as const;
type OptionType = typeof OPTIONS[number];

const AGE_OPTIONS = ['Filhote', 'Adulto', 'Idoso'];
const ESPECIE_OPTIONS = ['Cachorro', 'Gato'];
const SEXO_OPTIONS = ['Macho', 'Fêmea'];
const PORTE_OPTIONS = ['Pequeno', 'Médio', 'Grande'];

export function CadastroAnimal() {
    const [selectedType, setSelectedType] = useState<OptionType>('ADOÇÃO');
    const [nome, setNome] = useState('');
    const [selectedAge, setSelectedAge] = useState<string | null>(null);
    const [selectedEspecie, setSelectedEspecie] = useState<string | null>(null);
    const [selectedSexo, setSelectedSexo] = useState<string | null>(null);
    const [selectedPorte, setSelectedPorte] = useState<string | null>(null);

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tenho interesse em adotar um animal para:</Text>

        <View style={styles.buttonContainer}>
        {OPTIONS.map((option) => {
          const isSelected = selectedType === option;

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.button,
                isSelected ? styles.buttonSelected : styles.buttonUnselected,
              ]}
              onPress={() => setSelectedType(option)}
            >
              <Text style={[styles.text]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

        <SETitle type="principal" color="preta">
          {selectedType}
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

        <SERadioButtonGroup
          options={ESPECIE_OPTIONS}
          selectedValue={selectedEspecie}
          onValueChange={setSelectedEspecie}
        />

        <SETitle type="second" color="azul">
          SEXO
        </SETitle>

        <SERadioButtonGroup
          options={SEXO_OPTIONS}
          selectedValue={selectedSexo}
          onValueChange={setSelectedSexo}
        />

        <SETitle type="second" color="azul">
          PORTE
        </SETitle>

        <SERadioButtonGroup
          options={PORTE_OPTIONS}
          selectedValue={selectedPorte}
          onValueChange={setSelectedPorte}
        />

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

        <SEButton backgroundColor = '#88C9BF'>COLOCAR PARA {selectedType}</SEButton>

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
    color: '#434343',
    fontFamily: 'Roboto-Regular',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24, 
  },

  button: {
    width: 110,
    height: 40,
    shadowColor: '#000',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  buttonUnselected: {
    backgroundColor: '#bdbdbd',
  },

  buttonSelected: {
    backgroundColor: '#92C9BF',
  },
});
  