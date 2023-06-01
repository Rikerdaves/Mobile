import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const TemperatureDetails = () => {
  const [city, setCity] = useState('Teresina');
  const [temperature, setTemperature] = useState('');
  const openWeatherApiKey = '584f53d972f546355722d0e2c919b41b';

  const updateTemperature = () => {
    if (city.trim() === '') {
      // Verifica se o campo de cidade está vazio ou contém apenas espaços em branco
      return;
    }

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
  };

  const clearCity = () => {
    setCity('');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Detalhes de Temperatura</Text>
      <Text style={{ fontSize: 18 }}>Cidade: {city}</Text>
      <Text style={{ fontSize: 18 }}>Temperatura: {temperature}°C</Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>Mudar Local</Text>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TextInput
          style={{ flex: 1, fontSize: 16, borderWidth: 1, borderColor: 'gray', padding: 5 }}
          placeholder="Digite o nome da cidade"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TouchableOpacity onPress={updateTemperature}>
          <Text style={{ fontSize: 16, color: 'blue', marginLeft: 5, backgroundColor:'darkgray', padding: 5, borderRadius: 5 }}>Atualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearCity}>
          <Text style={{ fontSize: 16, color: 'red', marginLeft: 5, backgroundColor:'darkgray', padding: 5, borderRadius: 5 }}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TemperatureDetails;
