import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';


export function MeuPerfil() {
  return (
    <View style={styles.container}>
      <Text>Meu Perfil</Text>
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