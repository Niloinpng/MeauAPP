import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';

type InputType = 'default' | 'password' | 'email' | 'numeric';

interface SEInputProps extends TextInputProps {
  type?: InputType;
  label?: string;
  error?: string;
}

const SEInput: React.FC<SEInputProps> = ({
  type = 'default',
  label,
  error,
  style,
  ...rest
}) => {
  
  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'numeric':
        return 'numeric';
      default:
        return 'default';
    }
  };

  const getAutoCapitalize = () => {
    switch (type) {
      case 'email':
        return 'none';
      default:
        return 'sentences';
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          style
        ]}
        keyboardType={getKeyboardType()}
        autoCapitalize={getAutoCapitalize()}
        secureTextEntry={type === 'password'}
        placeholderTextColor="#9E9E9E"
        {...rest}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#434343',
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#434343',
  },
  inputError: {
    borderColor: '#F44336',
  },
  errorText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
  },
});

export default SEInput;