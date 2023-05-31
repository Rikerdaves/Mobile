import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { styles } from './style';

const WeatherScreen = () => {
    const [weatherData, setWeatherData] = useState(null);
  
    useEffect(() => {
      fetchWeatherData();
    }, []);
  
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=Teresina,BR&appid=584f53d972f546355722d0e2c919b41b&units=metric&lang=pt_br`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <View style={styles.container1}>
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
        <Text style={styles.loading}>Loading...</Text>
      )}
    </View>
  );
};
  
  export default WeatherScreen;
  