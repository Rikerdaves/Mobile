import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const WeatherCard = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},BR&appid=584f53d972f546355722d0e2c919b41b&units=metric&lang=pt_br`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.card}>
      {weatherData ? (
        <View>
          <Text style={styles.temperature}>
            Temperatura: {weatherData.main.temp}°C
          </Text>
          <Text style={styles.description}>
            Descrição: {weatherData.weather[0].description}
          </Text>
        </View>
      ) : (
        <Text style={styles.loading}>Carregando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
  },
  loading: {
    fontSize: 18,
    color: 'gray',
  },
});

export default WeatherCard;
