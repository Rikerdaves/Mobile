import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const AtividadesScreen = () => {
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    // Função assíncrona para obter as atividades
    const fetchAtividades = async () => {
      try {
        // Fazer uma solicitação para a rota '/atividades'
        const response = await fetch('http://localhost:3000/atividades');
        const data = await response.json();
        setAtividades(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAtividades();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulação de um carregamento assíncrono
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
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
      {atividades.map((atividade) => (
        <View key={atividade._id} style={styles.atividadeItem}>
          <Text style={styles.atividadeText}>Tipo: {atividade.tipoAtividade}</Text>
          <Text style={styles.atividadeText}>Distância: {atividade.distancia} metros</Text>
          <Text style={styles.atividadeText}>Tempo: {atividade.tempo} minutos</Text>
          <Text style={styles.atividadeText}>Intensidade: {atividade.intensidade}</Text>
          <Text style={styles.atividadeText}>Calorias: {atividade.calorias} cal</Text>
          <Text style={styles.atividadeText}>Anotações: {atividade.anotacoes}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'gray',
  },
  atividadeItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  atividadeText: {
    fontSize: 16,
    marginBottom: 5,
  },
  loadingContainer: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AtividadesScreen;
