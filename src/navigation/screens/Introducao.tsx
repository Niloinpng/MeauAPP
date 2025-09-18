import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import SEButton from '../../components/SEButton';
import { useNavigation } from '@react-navigation/native'; 

export function Introducao() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Olá!</Text>
        <Text style={styles.subtitle}>
          Bem vindo ao Meau!{'\n'}
          Aqui você pode adotar, doar e ajudar{'\n'}
          cães e gatos com facilidade.{'\n'}
          Qual o seu interesse?
        </Text>

        <View style={styles.buttonContainer}>
          <SEButton onPress={() => navigation.navigate('App', { screen: 'Adotar' })}>
            Adotar
          </SEButton>
          
          <SEButton>
            Ajudar
          </SEButton>
          
          <SEButton onPress={() => navigation.navigate('App', { screen: 'Adotar', params: { screen: 'CadastroAnimal' } })}>
            Cadastrar Animal
          </SEButton>
        </View>
      </View>

      {/* Botão login - separado e clicável */}
      <View style={styles.loginContainer}>
        <Pressable 
          onPress={() => navigation.navigate('CadastroPessoal')}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            padding: 10,
          })}
        >
          <Text style={styles.loginText}>login</Text>
        </Pressable>
      </View>

      {/* Footer */}
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
  mainContent: {
    flex: 0.7, // Reduzido para dar espaço ao botão
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Courgette-Regular',
    fontSize: 72,
    color: '#ffd358',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  logoImage: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
  },
  loginText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#88c9bf',
    textAlign: 'center',
  },
  buttonContainer: {
    width: 232,
    gap: 16,
  }
});