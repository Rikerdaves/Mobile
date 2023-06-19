import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import RegistroAtividadesScreen from './src/components/RegistroAtividadesScreen';
import AtividadesScreen from './src/components/AtividadeScreen';
import AcompanhamentoProgressoScreen from './src/components/AcompanhamentoProgressoScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
            headerTintColor: '#fff',
            headerBackImage: () => (
              <Ionicons name="arrow-back" size={24} color="#fff" style={styles.backIcon} />
            ),
            headerStatusBarHeight: 0,
            headerMode: 'screen', // Define o modo de exibição do cabeçalho como "screen"
          }}
        >
          <Stack.Screen
            name="Bem-Vindo!"
            component={HomeScreen}
            options={{
              headerTransparent: true,
              headerTitle: null,
            }}
          />
          <Stack.Screen
            name="Registre sua atividade"
            component={RegistroAtividadesScreen}
            options={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTransparent: false,
            }}
          />
          <Stack.Screen
            name="Acompanhe sua atividade"
            component={AcompanhamentoProgressoScreen}
            options={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTransparent: false,
            }}
          />
          <Stack.Screen
            name="Suas atividades"
            component={AtividadesScreen}
            options={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTransparent: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Adiciona o espaço para a StatusBar
  },
  loadingContainer: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
