import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface SETextInputProps extends TextInputProps {
  // Nenhuma prop customizada necessária para esta alteração
}

const SETextInput: React.FC<SETextInputProps> = ({ style, ...rest }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#bdbdbd"
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#434343',
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
    paddingVertical: 10,
    paddingHorizontal: 2, 
  },
});

export default SETextInput;