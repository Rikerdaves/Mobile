import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20
      },
    temperatureContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

      },
    temperatureText: {
        fontSize: 18,
        marginRight: 10,
        backgroundColor: 'darkgray',
        borderRadius: 5,
        padding: 15,
      },
    card: {
        padding: 10,
        backgroundColor: 'darkgray',
        borderRadius: 5,
    },
    detailsText: {
      fontSize: 16,
      color: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
    newsList: {
      width: '95%',
      backgroundColor:'gray',
      borderRadius: 10,
    },  
    newsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
    newsDescription: {
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
      },

  });