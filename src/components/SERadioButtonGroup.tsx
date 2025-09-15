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
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  optionContainer: {
    width: '32%', 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  optionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#757575',
    marginLeft: 8,
  },

  selectedOptionText: {
    color: '#434343', 
  }
});

export default SERadioButtonGroup;