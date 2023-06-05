import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card, Divider } from 'react-native-elements';

const AcompanhamentoProgressoScreen = () => {
  const [analise, setAnalise] = useState(null);

  useEffect(() => {
    // Fazer a requisição para obter a análise dos dados
    fetch('http://localhost:3000/api/analise')
      .then((response) => response.json())
      .then((data) => setAnalise(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {analise && (
        <Card containerStyle={styles.card}>
          <Text style={styles.title}>Acompanhamento de Progresso</Text>
          <Divider style={styles.divider} />
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: ['Distância', 'Tempo', 'Calorias'],
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
                backgroundColor: '#e26a00',
                backgroundGradientFrom: 'red',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
            />
          </View>
          <Text style={styles.label}>Total de Atividades: {analise.totalAtividades}</Text>
          <Text style={styles.label}>Total de Distância: {analise.totalDistancia} metros</Text>
          <Text style={styles.label}>Total de Tempo: {analise.totalTempo} minutos</Text>
          <Text style={styles.label}>Total de Calorias: {analise.totalCalorias} cal</Text>
          <Text style={styles.label}>Média da Distância: {analise.mediaDistancia} metros</Text>
          <Text style={styles.label}>Média de Calorias: {analise.mediaCalorias} kcal</Text>
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
  card: {
    borderRadius: 8,
    padding: 16,
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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default AcompanhamentoProgressoScreen;
