import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorage04 = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState(null); // Para rastrear si estamos editando

  // Guardar o actualizar datos
  const storeData = async () => {
    const newData = { nombre, cedula };

    if (editingKey) {
      // Si estamos en modo edición, actualizamos el dato
      // Actualizamos con la nueva cédula y el nuevo nombre
      await AsyncStorage.removeItem(editingKey); // Elimina la cédula anterior para evitar duplicados
      await AsyncStorage.setItem(cedula, JSON.stringify(newData)); // Guarda el dato actualizado
      const updatedData = data.map(item => (item.cedula === editingKey ? newData : item));
      setData(updatedData);
      setEditingKey(null);
    } else {
      // Si no estamos en modo edición, agregamos un nuevo dato
      await AsyncStorage.setItem(cedula, JSON.stringify(newData));
      setData([...data, newData]);
    }

    setNombre('');
    setCedula('');
  };

  // Obtener los datos almacenados en AsyncStorage
  const getData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const parsedData = result
        .map(req => {
          try {
            return JSON.parse(req[1]);
          } catch (e) {
            console.error('Error al parsear el dato: ', req[1]);
            return null;
          }
        })
        .filter(item => item !== null);
      setData(parsedData);
    } catch (error) {
      console.error('Error al cargar los datos', error);
    }
  };

  // Eliminar un dato
  const deleteData = async (key) => {
    await AsyncStorage.removeItem(key);
    const filteredData = data.filter(item => item.cedula !== key);
    setData(filteredData);
  };

  // Editar un dato
  const editData = (item) => {
    setNombre(item.nombre);
    setCedula(item.cedula); // Permitimos la edición de la cédula
    setEditingKey(item.cedula);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        // Eliminamos el editable={!editingKey} para permitir la edición de la cédula
      />
      <Button title={editingKey ? "Actualizar" : "Guardar"} onPress={storeData} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.cedula}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.nombre} - {item.cedula}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => editData(item)} style={styles.editButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteData(item.cedula)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AsyncStorage04;

