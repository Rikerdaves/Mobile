import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import NewsScreen from './src/componentes/noticias';
import { styles } from './src/componentes/style';
import WeatherCard from './src/componentes/Cardtemperatura';


export default function App() {
  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Bem-vindo ao AppNews </Text>
        <WeatherCard city="Teresina" />
        <NewsScreen />
      </View>
    </>
  );
}

