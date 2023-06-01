import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';


const NewsCard = ({ article, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.description}>{article.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 10,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
});

export default NewsCard;
