import React, { useEffect, useState } from 'react';
import { View, Text, Image} from 'react-native';
import axios from 'axios';
import { styles } from './style.js';

const NewsScreen = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us', 
            apiKey: '53d2c9a5f36e402cb22b2ac51a6e216c',
          },
        });

        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <View style={styles.container2}>
      <Text style={styles.titlenews}>News</Text>
      {articles.map((article, index) => (
        <View style={styles.card} key={index}>
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.description}>{article.description}</Text>
        </View>
      ))}
    </View>
  );
};


export default NewsScreen;
