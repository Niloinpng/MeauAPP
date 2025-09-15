import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text} from "react-native-paper";



export function CadastroAnimal() {
    return (
      <View style={styles.container}>
        <Text>Cadastro de Animal</Text>
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
  