import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Separator = ({ color = '#ccc', height = 1, marginVertical = 10 }) => {
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: color,
          height: height,
          marginVertical: marginVertical,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    width: '100%',
  },
});
