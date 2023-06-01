import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const TemperatureDetails = () => {
  const [city, setCity] = useState('London');
  const [temperature, setTemperature] = useState('');
  const [openWeatherApiKey] = '584f53d972f546355722d0e2c919b41b';

  useEffect(() => {
    // Buscar temperatura
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}`)
      .then((response) => {
        const kelvin = response.data.main.temp;
        const celsius = kelvin - 273.15;
        setTemperature(celsius.toFixed(1));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [city]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Temperature Details</Text>
      <Text style={{ fontSize: 18 }}>City: {city}</Text>
      <Text style={{ fontSize: 18 }}>Temperature: {temperature}°C</Text>
      <TouchableOpacity onPress={() => setCity('Paris')}>
        <Text style={{ fontSize: 16, color: 'blue', marginTop: 10 }}>Change City to Paris</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TemperatureDetails;
