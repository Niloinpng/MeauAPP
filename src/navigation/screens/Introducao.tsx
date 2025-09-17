import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import SEButton from '../../components/SEButton';
import { useNavigation } from '@react-navigation/native'; 

export function Introducao() {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Olá!</Text>
        <Text style={styles.subtitle}>
          Bem vindo ao Meau!{'\n'}
          Aqui você pode adotar, doar e ajudar{'\n'}
          cães e gatos com facilidade.{'\n'}
          Qual o seu interesse?
        </Text>

        <View style={styles.buttonContainer}>
          <SEButton screen="Adotar">
            Adotar
          </SEButton>
          <SEButton>
            Ajudar
          </SEButton>
          <SEButton screen="CadastroAnimal">
            Cadastrar Animal
          </SEButton>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('CadastroPessoal')}>
          <Text style={styles.loginText}>login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Image 
          source={require('../../assets/images/Meau_marca_2.png')} 
          style={styles.logoImage} 
        />
      </View>
    </SafeAreaView>
  );
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  content: {
    flex: 0.8, 
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    flex: 0.2, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  title: {
    fontFamily: 'Courgette-Regular',
    fontSize: 72,
    color: '#ffd358',
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 20, 
  },
  logoImage: {
    width: 120,
    resizeMode: 'contain',
  },
  loginText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#88c9bf',
    marginTop: 24,
  },
  buttonContainer: {
    width: 232,
    gap: 16,
  }
});