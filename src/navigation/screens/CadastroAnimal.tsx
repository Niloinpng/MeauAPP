import React, { useState } from "react";
import { 
  View, 
  StyleSheet,
  TouchableOpacity,
  ScrollView, 
  SafeAreaView,
  Alert
} from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from '@react-navigation/native'; 
import SEButton from "../../components/SEButton";
import SETitle from '../../components/SETitle';
import SETextInput from '../../components/SETextInput';
import SERadioButtonGroup from "../../components/SERadioButtonGroup";
import SECheckboxGroup from "../../components/SECheckboxGroup";
import SEImagePicker from "../../components/SEImagePicker";

import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore"; 

const OPTIONS = ['ADOÇÃO'] as const;
type OptionType = typeof OPTIONS[number];
const AGE_OPTIONS = ['Filhote', 'Adulto', 'Idoso'];
const ESPECIE_OPTIONS = ['Cachorro', 'Gato'];
const SEXO_OPTIONS = ['Macho', 'Fêmea'];
const PORTE_OPTIONS = ['Pequeno', 'Médio', 'Grande'];
const PERSONALITY_OPTIONS = ['Brincalhão','Tímido','Calmo','Guarda','Amoroso','Preguiçoso'];
const HEALTH_OPTIONS = ['Vacinado','Vermifugado','Castrado','Doente'];
const EXIGENCIAS_OPTIONS = ['Termo de adoção','Fotos da casa','Visita prévia do animal','Acompanhamento pós-adoção'];


export function CadastroAnimal() {
  const navigation = useNavigation(); 

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedType, setSelectedType] = useState<OptionType>('ADOÇÃO');
  const [nome, setNome] = useState('');
  const [doencas, setDoencas] = useState('');
  const [sobre, setSobre] = useState('');
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedEspecie, setSelectedEspecie] = useState<string | null>(null);
  const [selectedSexo, setSelectedSexo] = useState<string | null>(null);
  const [selectedPorte, setSelectedPorte] = useState<string | null>(null);
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>([]);
  const [selectedHealth, setSelectedHealth] = useState<string[]>([]);
  const [selectedExigencias, setSelectedExigencias] = useState<string[]>([]);
  const [fotoAnimal, setFotoAnimal] = useState<string | null>(null);

const handleFinalizar = async () => {
    if (!nome.trim() || !selectedEspecie || !selectedSexo || !selectedPorte || !selectedAge) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos obrigatórios (nome, espécie, sexo, porte e idade).");
      return;
    }

    setLoading(true);

    try {
      const animalData = {
        nome: nome.trim(),
        especie: selectedEspecie,
        sexo: selectedSexo,
        porte: selectedPorte,
        idade: selectedAge,
        temperamento: selectedPersonalities,
        saude: selectedHealth,
        exigencias: selectedExigencias,
        doencas: doencas.trim(),
        sobre: sobre.trim(),
        tipoCadastro: selectedType,
        dataCadastro: new Date(),
      };

      console.log("Dados do animal a serem salvos: ", animalData);

      await addDoc(collection(db, "animais"), animalData);
      
      setIsSubmitted(true);

    } catch (error) {
      console.error("Erro ao cadastrar animal: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar o animal.");
    } finally {
      setLoading(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>Eba!</Text>
          <Text style={styles.successBody}>
            O cadastro do seu pet foi realizado com sucesso!
          </Text>
          <Text style={styles.successBody}>
            Certifique-se que permitiu o envio de
            notificações por push no campo
            privacidade do menu configurações do
            aplicativo. Assim, poderemos te avisar
            assim que alguém interessado entrar
            em contato!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerText}>Tenho interesse em cadastrar um animal para:</Text>

        <Text style={styles.titleText}>
          {selectedType}
        </Text>
        <View style={styles.fieldGroup}>
          <SETitle type="second" color="azul">NOME DO ANIMAL</SETitle>
          <SETextInput
            placeholder="Nome do Animal"
            value={nome}
            onChangeText={setNome}
          />
        </View>
        
        <View style={styles.fieldGroup}>
          <SETitle type="second" color="azul">FOTOS DO ANIMAL</SETitle>
          <SEImagePicker
            imageUri={fotoAnimal}
            onImageChange={setFotoAnimal}
          />
        </View>

        <View style={styles.fieldGroup}>
          <SETitle type="second" color="azul">ESPÉCIE</SETitle>
          <SERadioButtonGroup
            options={ESPECIE_OPTIONS}
            selectedValue={selectedEspecie}
            onValueChange={setSelectedEspecie}
          />
        </View>

        <View style={styles.fieldGroup}>
          <SETitle type="second" color="azul">SEXO</SETitle>
          <SERadioButtonGroup
            options={SEXO_OPTIONS}
            selectedValue={selectedSexo}
            onValueChange={setSelectedSexo}
          />
        </View>

        <View style={styles.fieldGroup}>
          <SETitle type="second" color="azul">PORTE</SETitle>
          <SERadioButtonGroup
            options={PORTE_OPTIONS}
            selectedValue={selectedPorte}
            onValueChange={setSelectedPorte}
          />
        </View>

        <View style={styles.fieldGroup}>
          <SETitle type="second" color="azul">IDADE</SETitle>
          <SERadioButtonGroup
            options={AGE_OPTIONS}
            selectedValue={selectedAge}
            onValueChange={setSelectedAge}
          />
        </View>

        <View style={styles.fieldGroup}>
          <SETitle type="second" color="azul">TEMPERAMENTO</SETitle>
          <SECheckboxGroup
            options={PERSONALITY_OPTIONS}
            selectedValues={selectedPersonalities}
            onSelectionChange={setSelectedPersonalities}
          />
        </View>

        <View style={styles.fieldGroup}>
          <SETitle type="second" color="azul">SAÚDE</SETitle>
          <SECheckboxGroup
            options={HEALTH_OPTIONS}
            selectedValues={selectedHealth}
            onSelectionChange={setSelectedHealth}
          />
        </View>
        
        <View style={styles.fieldGroup}>
          <SETextInput
            placeholder="Doenças do animal (opcional)"
            value={doencas}
            onChangeText={setDoencas}
          />
        </View>

        <View style={styles.fieldGroup}>
          <SETitle type="second" color="azul">EXIGÊNCIAS PARA ADOÇÃO</SETitle>
          <SECheckboxGroup
            options={EXIGENCIAS_OPTIONS}
            selectedValues={selectedExigencias}
            onSelectionChange={setSelectedExigencias}
          />
        </View>
        <View style={styles.fieldGroup}>
          <SETitle type="second" color="azul">SOBRE O ANIMAL</SETitle>
          <SETextInput
            placeholder="Compartilhe a história do animal"
            value={sobre}
            onChangeText={setSobre}
            multiline={true} 
          />
        </View>
        <SEButton 
          backgroundColor='#88C9BF' 
          onPress={handleFinalizar}
        >
          {loading ? 'CADASTRANDO...' : `COLOCAR PARA ${selectedType}`}
        </SEButton>
      </ScrollView>
    </SafeAreaView>
  );
}
  
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24, 
    paddingVertical: 24,
  },
  headerText: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonUnselected: {
    backgroundColor: '#f1f2f2',
  },
  buttonSelected: {
    backgroundColor: '#ffd358',
  },
  textUnselected: {
    color: '#bdbdbd',
    fontFamily: 'Roboto-Regular',
  },
  textSelected: {
    color: '#434343',
    fontFamily: 'Roboto-Regular',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#434343',
  },
  fieldGroup: {
    marginBottom: 20, 
  },
    successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fafafa',
  },
  successTitle: {
    fontFamily: 'Courgette-Regular',
    fontSize: 72,
    color: '#ffd358',
  },
  successBody: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 21, 
  },
});