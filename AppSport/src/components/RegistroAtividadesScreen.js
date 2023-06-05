import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import axios from 'axios';

const RegistroAtividadesScreen = () => {
  const [tipoAtividade, setTipoAtividade] = useState('');
  const [distancia, setDistancia] = useState('');
  const [tempo, setTempo] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [calorias, setCalorias] = useState('');
  const [anotacoes, setAnotacoes] = useState('');
  const [mensagem, setMensagem] = useState('');

  const tiposAtividade = [
    'Corrida',
    'Ciclismo',
    'Natação',
    'Musculação',
    'Outros'
  ];

  const handleSave = () => {
    // Verificar se algum campo está vazio
    if (
      tipoAtividade.trim() === '' ||
      distancia.trim() === '' ||
      tempo.trim() === '' ||
      intensidade.trim() === '' ||
      calorias.trim() === '' ||
      anotacoes.trim() === ''
    ) {
      setMensagem('Por favor, preencha todos os campos');
      return;
    }
    const registro = {
      tipoAtividade,
      distancia,
      tempo,
      intensidade,
      calorias,
      anotacoes
    };

    // Fazer a solicitação HTTP POST para a API
    axios.post('http://localhost:3000/api/atividades', registro)
      .then(response => {
        console.log('Registro salvo com sucesso:', response.data);
        setMensagem('Registro salvo com sucesso');
      })
      .catch(error => {
        console.error('Erro ao salvar o registro:', error);
        setMensagem('Erro ao salvar o registro');
      });
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={tipoAtividade}
        onValueChange={(itemValue) => setTipoAtividade(itemValue)}
      >
        <Picker.Item label="Selecione o tipo de atividade" value="" />
        {tiposAtividade.map((tipo) => (
          <Picker.Item key={tipo} label={tipo} value={tipo} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Distância (em metros)"
        value={distancia}
        onChangeText={setDistancia}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Tempo (em minutos)"
        value={tempo}
        onChangeText={setTempo}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Intensidade"
        value={intensidade}
        onChangeText={setIntensidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Calorias queimadas"
        value={calorias}
        onChangeText={setCalorias}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Anotações"
        value={anotacoes}
        onChangeText={setAnotacoes}
        multiline
      />
      <Button title="Salvar" onPress={handleSave} />
      {mensagem ? <Text style={styles.errorText}>{mensagem}</Text> : null}
    </View>
  );
};

// Estilos do coomponente

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'grey',
  },
  picker: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  input: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  errorText: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
});

export default RegistroAtividadesScreen;
