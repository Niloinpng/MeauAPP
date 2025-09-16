import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

// Criar usuário
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário cadastrado:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.log("Erro no cadastro:", error.message);
    throw error;
  }
};

// Login
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login feito:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.log("Erro no login:", error.message);
    throw error;
  }
};

