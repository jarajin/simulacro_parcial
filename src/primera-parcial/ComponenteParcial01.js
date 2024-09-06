import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

const ComponenteParcial01 = ({ navigation }) => {
  const [nombreMateria, setNombreMateria] = useState('');
  const [numero, setNumero] = useState('');

  const items = [
    { id: '1', title: 'PropsParcial02', action: () => navigation.navigate('PropsParcial02', { materia: nombreMateria, nota: numero }) },
    { id: '2', title: 'AxiosParcial03', action: () => navigation.navigate('AxiosParcial03') },
    { id: '3', title: 'AstncStorageParcial04', action: () => navigation.navigate('AstncStorageParcial04') }
  ];

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Examen Primera Parcial</Text>

      {/* Entrada para el nombre de la materia */}
      <TextInput 
        style={styles.input}
        placeholder="Ingresar nombre de materia"
        value={nombreMateria}
        onChangeText={setNombreMateria}
      />

      {/* Entrada para el número */}
      <TextInput
        style={styles.input}
        placeholder="Ingresar un número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"  // Para permitir solo números
      />

      {/* Lista de navegación */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.title}
            onPress={item.action} // Navegar a cada componente con los parámetros correctos
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',  // Centrar el título
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  }
});

export default ComponenteParcial01;
