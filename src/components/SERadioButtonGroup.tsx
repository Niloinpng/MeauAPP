import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SERadioButtonGroupProps {
  options: string[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  style?: ViewStyle;
}

const SERadioButtonGroup: React.FC<SERadioButtonGroupProps> = ({
  options,
  selectedValue,
  onValueChange,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        const isSelected = selectedValue === option;
        return (
          <TouchableOpacity
            key={option}
            style={styles.optionContainer}
            onPress={() => onValueChange(option)}
            activeOpacity={0.7}
          >
            <Icon
              name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={24}
              color={isSelected ? '#757575' : '#757575'}
            />
            <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  // Container principal com flexbox para o layout
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Alinha os itens (inicio, meio, fim)
  },
  // Container de cada opção individual
  optionContainer: {
    width: '32%', // Garante que teremos 3 colunas (~33%)
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, // Espaçamento entre as linhas
  },
  // Estilo do texto de cada opção
  optionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#757575',
    marginLeft: 8, // Espaço entre o ícone e o texto
  },
  // Estilo extra para o texto quando selecionado
  selectedOptionText: {
    color: '#434343', // Deixa o texto selecionado um pouco mais escuro
  }
});

export default SERadioButtonGroup;