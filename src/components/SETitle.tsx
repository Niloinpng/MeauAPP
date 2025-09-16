import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

type TitleType = 'principal' | 'second';
type TitleColor = 'preta' | 'azul' | 'amarela';

interface SETitleProps extends TextProps {
  children: React.ReactNode;
  type: TitleType;
  color: TitleColor;
}

const colorMap = {
  preta: '#434343',
  azul: '#88C9BF', 
  amarela: '#f7a800', 
};

const SETitle: React.FC<SETitleProps> = ({
  children,
  type,
  color,
  style, 
  ...rest 
}) => {

  const typeStyle = type === 'principal' ? styles.principal : styles.second;

  return (
    <Text
      style={[
        typeStyle,         
        { color: colorMap[color] }, 
        style,                  
      ]}
      {...rest} 
    >
      {children}
    </Text>
  );
};


const styles = StyleSheet.create({
  principal: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  second: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
});

export default SETitle;