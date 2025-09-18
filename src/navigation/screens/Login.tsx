import { Button } from '@react-navigation/elements';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    
    if (!username || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        const user = userCredential.user;

        alert("Login realizado com sucesso!");
        console.log("Usuário logado", user.email);
    }catch (error:any) {
        alert("Erro ao fazer Login: " + error.mesage);
    }

    
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Text>{isPasswordVisible ? '👁️' : '🔒'}</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <Button 
          style={styles.button}
          screen="CadastroPessoal">
          <Text style={styles.buttonText}>Cadastro</Text>
        </Button>
        </View>

        <TouchableOpacity style={styles.facebookButton} onPress={() => console.log('Facebook login')}>
          <View style={styles.socialButtonContent}>
            <Image 
              source={require('../../assets/images/facebook-icon.png')}
              style={styles.socialIcon}
            />
            <Text style={styles.facebookButtonText}>Entrar com Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={() => console.log('Google login')}>
          <View style={styles.socialButtonContent}>
            <Image 
              source={require('../../assets/images/google-icon.png')}
              style={styles.socialIcon}
            />
            <Text style={styles.googleButtonText}>Entrar com Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 32, 
  },
  title: {
    fontFamily: 'Courgette-Regular',
    fontSize: 32,
    color: '#ffd358',
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
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
    padding: 12,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  eyeIcon: {
    padding: 12,
  },
  button: {
    backgroundColor: '#88c9bf',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#434343',
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
  loginText: {
    backgroundColor: 'transparent',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#88c9bf',
    marginTop: 24,
  },
  logoImage: {
    width: 120,
    resizeMode: 'contain',
  },
});
