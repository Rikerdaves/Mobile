import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TemperatureDetails from './src/componentes/TemperatureDetails';
import NewsCard from './src/componentes/NewsCard';

import { styles } from './Styles';

// Configuração das APIs
const newsApiKey = '53d2c9a5f36e402cb22b2ac51a6e216c';
const openWeatherApiKey = '584f53d972f546355722d0e2c919b41b';

// Componente de tela inicial
const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [temperature, setTemperature] = useState('');
  const [city, setCity] = useState('Teresina');

  useEffect(() => {
    // Buscar notícias
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`)
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.error(error);
      });

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

  const renderNewsItem = ({ item }) => (
    <NewsCard
      article={item}
      onPress={() => navigation.navigate('NewsDetails', { article: item })}
    />
  );

  return (
    <>
      <StatusBar style='auto' />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Bem-Vindo ao AppNews</Text>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>{city}: {temperature}°C</Text>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TemperatureDetails')}>
            <Text style={styles.detailsText}>Alterar local</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={news}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.title}
          style={styles.newsList}
        />
      </View>
    </>
  );
};

// Componente de tela de detalhes da notícia
const NewsDetailsScreen = ({ navigation }) => {
  const article = navigation.getParam('article');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <Text style={styles.newsTitle}>{article.title}</Text>
      <Text style={styles.newsDescription}>{article.description}</Text>
    </ScrollView>
  );
};

// Configuração de navegação
const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    NewsDetails: { screen: NewsDetailsScreen, navigationOptions: { title: 'Detalhes da Noticia' } },
    TemperatureDetails: { screen: TemperatureDetails, navigationOptions: { title: 'Alterar Local' } }
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
