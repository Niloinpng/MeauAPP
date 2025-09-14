import { Button } from '@react-navigation/elements';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';

export function Introducao() {
  return (
    <View style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.title}>Olá!</Text>

        <Text style={styles.subtitle}>
          Bem vindo ao Meau!{'\n'}
          Aqui você pode adotar, doar e ajudar{'\n'}
          cães e gatos com facilidade.{'\n'}
          Qual o seu interesse?
        </Text>

        <Button 
          style={styles.button}
          screen="Adotar"
        >
          Adotar
        </Button>

        <Button 
          style={styles.button}
        >
          Ajudar
        </Button>

        <Button           
          style={styles.button}
          screen="CadastroAnimal"
        >
          Cadastrar Animal
        </Button>

        <Button 
          style={styles.loginText}
          screen="CadastroPessoal"
        >
          Login
        </Button>

      </View>

      <View style={styles.footer}>
        <Image 
          //source={require('../assets/images/Meau_marca_2.png')} 
          style={styles.logoImage} 
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 32, 
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
  button: {
    backgroundColor: '#ffd358',
    width: 232,
    height: 40,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#434343',
  },
  loginText: {
    backgroundColor: 'transparent',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#88c9bf',
    marginTop: 24,
  },
  logoImage: {
    width: 120,
    resizeMode: 'contain',
  },
});
