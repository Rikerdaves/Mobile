import React, { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const AtividadesScreen = () => {
  const [atividades, setAtividades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAtividade, setSelectedAtividade] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tipoAtividade, setTipoAtividade] = useState('');
  const [distancia, setDistancia] = useState('');
  const [tempo, setTempo] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [calorias, setCalorias] = useState('');
  const [anotacoes, setAnotacoes] = useState('');

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await fetch('http://localhost:3000/atividades');
        const data = await response.json();
        setAtividades(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAtividades();
  }, []);

  const handleDeleteAtividade = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/atividades/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Atualizar a lista de atividades após deletar
        const updatedAtividades = atividades.filter((atividade) => atividade._id !== id);
        setAtividades(updatedAtividades);
      } else {
        console.error('Erro ao deletar a atividade');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditAtividade = (atividade) => {
    setSelectedAtividade(atividade);
    setIsEditing(true);
    setTipoAtividade(atividade.tipoAtividade);
    setDistancia(atividade.distancia);
    setTempo(atividade.tempo);
    setIntensidade(atividade.intensidade);
    setCalorias(atividade.calorias);
    setAnotacoes(atividade.anotacoes);
  };

  const handleUpdateActivity = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/atividades/${selectedAtividade._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipoAtividade,
          distancia,
          tempo,
          intensidade,
          calorias,
          anotacoes,
        }),
      });

      if (response.ok) {
        // Atualizar a lista de atividades após editar
        const updatedAtividades = atividades.map((atividade) =>
          atividade._id === selectedAtividade._id ? { ...atividade, tipoAtividade, distancia, tempo, intensidade, calorias, anotacoes } : atividade
        );
        setAtividades(updatedAtividades);
        setSelectedAtividade(null);
        setIsEditing(false);
        setTipoAtividade('');
        setDistancia('');
        setTempo('');
        setIntensidade('');
        setCalorias('');
        setAnotacoes('');
      } else {
        console.error('Erro ao atualizar a atividade');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (isEditing) {
    // Renderizar o formulário de edição com os dados da atividade selecionada
    return (
      <View style={styles.container}>
        <Text>Editar Atividade</Text>
        <TextInput
          value={tipoAtividade}
          onChangeText={setTipoAtividade}
          placeholder="Tipo de atividade"
          style={styles.input}
        />
        <TextInput
          value={distancia}
          onChangeText={setDistancia}
          placeholder="Distância"
          style={styles.input}
        />
        <TextInput
          value={tempo}
          onChangeText={setTempo}
          placeholder="Tempo"
          style={styles.input}
        />
        <TextInput
          value={intensidade}
          onChangeText={setIntensidade}
          placeholder="Intensidade"
          style={styles.input}
        />
        <TextInput
          value={calorias}
          onChangeText={setCalorias}
          placeholder="Calorias"
          style={styles.input}
        />
        <TextInput
          value={anotacoes}
          onChangeText={setAnotacoes}
          placeholder="Anotações"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleUpdateActivity}>Salvar</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {atividades.map((atividade) => (
        <View key={atividade._id} style={styles.atividadeCard}>
          <Text style={styles.atividadeText}>Tipo: {atividade.tipoAtividade}</Text>
          <Text style={styles.atividadeText}>Distância: {atividade.distancia} metros</Text>
          <Text style={styles.atividadeText}>Tempo: {atividade.tempo} minutos</Text>
          <Text style={styles.atividadeText}>Intensidade: {atividade.intensidade}</Text>
          <Text style={styles.atividadeText}>Calorias: {atividade.calorias} cal</Text>
          <Text style={styles.atividadeText}>Anotações: {atividade.anotacoes}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteAtividade(atividade._id)}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditAtividade(atividade)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  atividadeCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  atividadeText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  input: {
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AtividadesScreen;
