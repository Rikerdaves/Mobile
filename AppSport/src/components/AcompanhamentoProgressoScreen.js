import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card, Divider } from 'react-native-elements';

const AcompanhamentoProgressoScreen = () => {
  const [analise, setAnalise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatarTempo = (tempo) => {
    const horas = Math.floor(tempo / 60);
    const minutos = Math.floor(tempo % 60);
    const segundos = Math.floor((tempo % 1) * 60);
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Fazer a requisição para obter a análise dos dados
    fetch('http://localhost:3000/api/analise')
      .then((response) => response.json())
      .then((data) => {
        setAnalise(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
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
      {analise && (
        <Card>
          <Text style={styles.title}>Acompanhamento de Progresso</Text>
          <Divider style={styles.divider} />
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: ['Distância (KM)', 'Tempo (S)', 'Calorias (cal)'],
                datasets: [
                  {
                    data: [
                      analise.totalDistancia,
                      analise.totalTempo,
                      analise.totalCalorias,
                    ],
                  },
                ],
              }}
              width={300}
              height={200}
              chartConfig={{
                color: () => '#007bff',
              }}
              bezier
            />
          </View>
          <Text>Total de Atividades: {analise.totalAtividades}</Text>
          <Text>Total de Distância: {analise.totalDistancia} KM</Text>
          <Text>Total de Tempo: {formatarTempo(analise.totalTempo)}</Text>
          <Text>Total de Calorias: {analise.totalCalorias} cal</Text>
          <Text>Média da Distância: {analise.mediaDistancia} KM</Text>
          <Text>Média de Calorias: {analise.mediaCalorias} cal</Text>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  divider: {
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AcompanhamentoProgressoScreen;
