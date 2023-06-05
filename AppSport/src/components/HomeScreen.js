import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('./img/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        
        <View style={styles.buttonContainer}>
        <Text style={styles.title}>Menu</Text>
          <TouchableOpacity
            style={[styles.button, styles.transparentButton]}
            onPress={() => navigation.navigate("Registre sua atividade")}
          >
            <Text style={[styles.buttonText, styles.transparentButtonText]}>Registro de Atividades</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.transparentButton]}
            onPress={() => navigation.navigate("Acompanhe sua atividade")}
          >
            <Text style={[styles.buttonText, styles.transparentButtonText]}>Acompanhamento das Atividades</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.transparentButton]}
            onPress={() => navigation.navigate("Suas atividades")}
          >
            <Text style={[styles.buttonText, styles.transparentButtonText]}>Atividades Registradas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adiciona uma camada de transparência
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom: 20,
    marginLeft: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  transparentButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.400)', // Define o fundo do botão como transparente
  },
  transparentButtonText: {
    color: 'white', // Define a cor do texto do botão como azul
  },
});

export default HomeScreen;
