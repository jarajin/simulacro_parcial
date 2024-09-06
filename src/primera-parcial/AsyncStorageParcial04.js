import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageParcial04 = () => {
  const [codigo, setCodigo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [materia, setMateria] = useState('');
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);

  // Guardar o actualizar datos con claves específicas para evitar interferencias
  const storeData = async () => {
    if (!codigo || !carrera || !materia) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const newData = { codigo, carrera, materia };
    const storageKey = `primera_parcial_${codigo}`;

    if (editingKey) {
      await AsyncStorage.removeItem(editingKey);
      await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
      const updatedData = data.map(item => (item.codigo === editingKey ? newData : item));
      setData(updatedData);
      setEditingKey(null);
    } else {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
      setData([...data, newData]);
    }

    setCodigo('');
    setCarrera('');
    setMateria('');
  };

  // Obtener los datos almacenados en AsyncStorage usando claves específicas
  const getData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const projectKeys = keys.filter(key => key.startsWith('primera_parcial_'));  // Filtrar claves para este proyecto
      const result = await AsyncStorage.multiGet(projectKeys);  // Obtener los datos almacenados
      const parsedData = result.map(req => {
        try {
          return JSON.parse(req[1]);
        } catch (e) {
          console.error('Error al parsear el dato: ', req[1]);
          return null;
        }
      }).filter(item => item !== null);
      setData(parsedData);
    } catch (error) {
      console.error('Error al cargar los datos', error);
    }
  };

  // Editar un dato
  const editData = (item) => {
    setCodigo(item.codigo);
    setCarrera(item.carrera);
    setMateria(item.materia);
    setEditingKey(`primera_parcial_${item.codigo}`);
  };

  // Cargar los datos cuando el componente se monta
  useEffect(() => {
    getData();  // Recargar los datos al iniciar la pantalla
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
        style={styles.input}
      />
      <TextInput
        placeholder="Carrera"
        value={carrera}
        onChangeText={setCarrera}
        style={styles.input}
      />
      <TextInput
        placeholder="Materia"
        value={materia}
        onChangeText={setMateria}
        style={styles.input}
      />
      <Button
        title={editingKey ? "Actualizar" : "Guardar"}
        onPress={storeData}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.codigo} - {item.carrera} - {item.materia}</Text>
            <TouchableOpacity onPress={() => editData(item)} style={styles.editButton}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AsyncStorageParcial04;
