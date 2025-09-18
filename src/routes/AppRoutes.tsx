// AppRoutes.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";

import LoginScreen from "../navigation/screens/Login";
import CadastroScreen from "../navigation/screens/CadastroPessoal";
import MeuPerfil from "../navigation/screens/MeuPerfil";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return null; // pode exibir um SplashScreen

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // Rotas privadas
        <Stack.Screen name="Perfil" component={MeuPerfil} />
      ) : (
        // Rotas públicas
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

