import { Button } from '@react-navigation/elements';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { auth, db, storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { MaterialIcons } from '@expo/vector-icons';
import SEButton from '../../components/SEButton';
import SETextInput from '../../components/SETextInput'; 
export function CadastroPessoal() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Atenção", "Você precisa permitir o acesso à galeria para adicionar uma foto!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [1, 1],     
      quality: 1,          
    });

    if (!result.canceled) {
      setFotoPerfil(result.assets[0].uri);
    }
  };

const uploadImageAndGetURL = async (uri: string, userId: string): Promise<string> => {
    try {
      // 1. Comprimir e redimensionar a imagem
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 400 } }], // Redimensiona para uma largura de 400px
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      // 2. Converter a imagem para Blob
      const response = await fetch(manipulatedImage.uri);
      const blob = await response.blob();
      
      // 3. Criar referência no Firebase Storage
      const storageRef = ref(storage, `fotosDePerfil/${userId}/perfil.jpg`);

      // 4. Fazer upload do Blob
      await uploadBytes(storageRef, blob);

      // 5. Obter a URL de download
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;

    } catch (error) {
      console.error("Erro no upload da imagem: ", error);
      throw new Error("Não foi possível fazer o upload da imagem de perfil.");
    }
  };

  const handleCadastro = async () => {
    if (!fotoPerfil || !nome || !idade || !email || !estado || !cidade || !endereco || !telefone || !username || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos e adicione uma foto de perfil.');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Atenção', 'As senhas não coincidem');
      return;
    }

    setLoading(true); 

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const fotoURL = await uploadImageAndGetURL(fotoPerfil, user.uid);

      const userData = {
        uid: user.uid, 
        nome,
        idade,
        email,
        estado,
        cidade,
        endereco,
        telefone,
        username,
        fotoURL: fotoURL, 
        createdAt: new Date(), 
      };

      await setDoc(doc(db, "usuários", user.uid), userData);

      Alert.alert("Sucesso!", "Cadastro Realizado com sucesso!");
      
    } catch (error: any) {
      Alert.alert("Erro ao Cadastrar", error.message);
    } finally {
      setLoading(false); 
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>As informações preenchidas serão divulgadas apenas para a pessoa com a qual você realizar o processo de adoção e/ou apadrinhamento, após a formalização do processo</Text>
            </View>
            
            <View>
              <Text style={styles.sectionText}>INFORMAÇÕES PESSOAIS</Text>
            </View>
            
            <SETextInput
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

            <SETextInput
              placeholder="Idade"
              value={idade}
              onChangeText={setIdade}
              type="numeric"
            />
          
            <SETextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              type="email"
            />
            
            <SETextInput
              placeholder="Estado"
              value={estado}
              onChangeText={setEstado}
              autoCapitalize="words"
            />
            
            <SETextInput
              placeholder="Cidade"
              value={cidade}
              onChangeText={setCidade}
              autoCapitalize="words"
            />

            <SETextInput
              placeholder="Endereço"
              value={endereco}
              onChangeText={setEndereco}
              autoCapitalize="words"
            />
            
            <SETextInput
              placeholder="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
            
            <View>
              <Text style={styles.sectionText}>INFORMAÇÕES DE PERFIL</Text>
            </View>
            
            <SETextInput
              placeholder="Nome de usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            
            {/* Mantive os inputs de senha originais pois o SETextInput não tem ícone de olho integrado */}
            <View style={styles.passwordContainer}>
              <SETextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                style={styles.passwordInput}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text>{isPasswordVisible ? '👁️' : '🔒'}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.passwordContainer}>
              <SETextInput
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!isConfirmPasswordVisible}
                style={styles.passwordInput}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              >
                <Text>{isConfirmPasswordVisible ? '👁️' : '🔒'}</Text>
              </TouchableOpacity>
            </View>
            
            <View>
              <Text style={styles.sectionText}>FOTO DE PERFIL</Text>
            </View>
            
            <View style={styles.addPhotoContainer}>
              <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
                {fotoPerfil ? (
                  <Image source={{ uri: fotoPerfil }} style={styles.profileImage} />
                ) : (
                  <>
                    <MaterialIcons name="control-point" size={32} color="#434343" />
                    <Text style={styles.addPhotoText}>Adicionar foto</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <SEButton 
              backgroundColor='#88C9BF' 
              onPress={handleCadastro}
            >
              Fazer Cadastro
            </SEButton>
            
            <Button 
              style={styles.secondaryButton}
              screen="Login"
            >
              Já tenho uma conta
            </Button>
          </View>

          <Text style={styles.divider}>Ou cadastre-se com</Text>

          <TouchableOpacity style={styles.facebookButton} onPress={() => console.log('Facebook cadastro')}>
            <View style={styles.socialButtonContent}>
              <Image 
                source={require('../../assets/images/facebook-icon.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.facebookButtonText}>Cadastrar com Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton} onPress={() => console.log('Google cadastro')}>
            <View style={styles.socialButtonContent}>
              <Image 
                source={require('../../assets/images/google-icon.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.googleButtonText}>Cadastrar com Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#cfe9e5',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  infoText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#434343',
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#88c9bf',
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 0,
  },
  eyeIcon: {
    padding: 12,
  },
  addPhotoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  addPhotoText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#434343',
    marginTop: 8,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#88c9bf',
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#88c9bf',
  },
  secondaryButtonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#88c9bf',
  },
  divider: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#757575',
    marginVertical: 20,
    textAlign: 'center',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    width: 232,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    width: 232,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    resizeMode: 'contain',
  },
  facebookButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  googleButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  addPhotoButton: {
    width: 128,
    height: 128,
    backgroundColor: '#e6e7e7',
    borderRadius: 4, 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    overflow: 'hidden', 
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});
