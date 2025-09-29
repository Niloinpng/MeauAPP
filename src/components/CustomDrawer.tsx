import React, { useState } from "react";
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SEButton from './SEButton';

const DrawerItem = ({ label, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.drawerItem}
  >
    <Text style={styles.drawerLabel}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const [openSection, setOpenSection] = useState<string | null>('User'); 

  const toggleSection = (sectionName: string) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/foto-do-perfil.png')}
          style={styles.profileImage}
        />
      </View>

      <View>
        <TouchableOpacity 
          style={[styles.sectionHeader, { backgroundColor: '#88c9bf' }]} 
          onPress={() => toggleSection('User')}
        >
          <Text style={styles.sectionLabel}>Nome do Usuário</Text>
          <Icon name={openSection === 'User' ? 'expand-less' : 'expand-more'} size={24} color="#757575" />
        </TouchableOpacity>
        {openSection === 'User' && (
          <View style={styles.subItemContainer}>
            <DrawerItem label="Meu Perfil" onPress={() => navigation.navigate('MeuPerfil')} />
            <DrawerItem label="Meus Pets" onPress={() => navigation.navigate('MeusPets')} />
            <DrawerItem label="Favoritos" onPress={() => navigation.navigate('Favoritos')} />
            <DrawerItem label="Chat" onPress={() => navigation.navigate('Chat')} />
          </View>
        )}

        <TouchableOpacity 
          style={[styles.sectionHeader, { backgroundColor: '#fee29b' }]} 
          onPress={() => toggleSection('Atalhos')}
        >
          <View style={styles.sectionTitleContainer}>
            <Icon name="pets" size={24} color="#757575" />
            <Text style={styles.sectionLabel}>Atalhos</Text>
          </View>
          <Icon name={openSection === 'Atalhos' ? 'expand-less' : 'expand-more'} size={24} color="#757575" />
        </TouchableOpacity>
        {openSection === 'Atalhos' && (
          <View style={styles.subItemContainer}>
            <DrawerItem label="Cadastrar um pet" onPress={() => navigation.navigate('Cadastrar Animal')} />
            <DrawerItem label="Adotar um pet" onPress={() => navigation.navigate('Adotar')} />
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.sectionHeader, { backgroundColor: '#cfe9e5' }]} 
          onPress={() => toggleSection('Informações')}
        >
          <View style={styles.sectionTitleContainer}>
            <Icon name="info-outline" size={24} color="#757575" />
            <Text style={styles.sectionLabel}>Informações</Text>
          </View>
          <Icon name={openSection === 'Informações' ? 'expand-less' : 'expand-more'} size={24} color="#757575" />
        </TouchableOpacity>
        {openSection === 'Informações' && (
          <View style={styles.subItemContainer}>
            <DrawerItem label="Dicas" onPress={() => navigation.navigate('Dicas')} />
            <DrawerItem label="Eventos" onPress={() => navigation.navigate('Eventos')} />
            <DrawerItem label="Legislação" onPress={() => navigation.navigate('Legislacao')} />
            <DrawerItem label="Termo de adoção" onPress={() => navigation.navigate('Termo')} />
            <DrawerItem label="Histórias de adoção" onPress={() => navigation.navigate('Historias')} />
          </View>
        )}

        <TouchableOpacity 
          style={[styles.sectionHeader, { backgroundColor: '#e6e7e8' }]} 
          onPress={() => toggleSection('Configuração')}
        >
          <View style={styles.sectionTitleContainer}>
            <Icon name="settings" size={24} color="#757575" />
            <Text style={styles.sectionLabel}>Configuração</Text>
          </View>
          <Icon name={openSection === 'Configuração' ? 'expand-less' : 'expand-more'} size={24} color="#757575" />
        </TouchableOpacity>
        {openSection === 'Configuração' && (
          <View style={styles.subItemContainer}>
            <DrawerItem label="Privacidade" onPress={() => navigation.navigate('Privacidade')} />
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
         <SEButton backgroundColor="#ffd358">SAIR</SEButton>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#88c9bf',
    paddingTop: 40,
    paddingLeft: 16,
    paddingBottom: 20,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
  },

  drawerItem: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0', 
  },
  drawerLabel: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#434343',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    color: '#434343',
    marginLeft: 16,
  },
 
  subItemContainer: {
    paddingLeft: 16, 
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
});