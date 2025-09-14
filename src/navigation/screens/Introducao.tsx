import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function Introducao() {
  return (
    <View style={styles.container}>
      <Text>Olá</Text>
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>

      <Button screen="Adotar">
        Adotar
      </Button>

      <Button>Ajudar</Button>

      <Button screen="CadastroAnimal">
        Cadastrar Animal
      </Button>

      <Button screen="CadastroPessoal">
        Login
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
