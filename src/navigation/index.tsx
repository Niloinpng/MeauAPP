import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Introducao } from './screens/Introducao';
import { Adotar } from './screens/Adotar';
import { CadastroAnimal } from './screens/CadastroAnimal';
import { Login } from './screens/Login';
import { CadastroPessoal } from './screens/CadastroPessoal';
import { FinalizarProcesso } from './screens/FinalizarProcesso';
import { NotFound } from './screens/NotFound';

const RootStack = createNativeStackNavigator({
  screens: {
    Introducao: {
      screen: Introducao,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Adotar: {
      screen: Adotar,
      options: {
        title: 'Adotar', 
        headerStyle: {
          backgroundColor: '#ffd358', 
        },
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium', 
          fontSize: 20,
          color: '#434343',         
        },
        headerTintColor: '#434343', 
      },
    },
    CadastroAnimal: {
      screen: CadastroAnimal,
      options: {
        title: 'Cadastrar do Animal', 
        headerStyle: {
          backgroundColor: '#88c9bf', 
        },
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium', 
          fontSize: 20,
          color: '#434343',         
        },
        headerTintColor: '#434343', 
      },
    },
    CadastroPessoal: {
      screen: CadastroPessoal,
    },
    Login: {
      screen: Login,
    },
    FinalizarProcesso: {
      screen: FinalizarProcesso,
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
