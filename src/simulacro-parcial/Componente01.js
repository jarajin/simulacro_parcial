import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Componente01 = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Principal</Text>
      <TextInput 
        style={styles.input}
        placeholder="Ingresa un texto"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button
        title="Ir a Props02"
        onPress={() => navigation.navigate('Props02', { nombre: inputValue, estado: false })}
      />
      <Button
        title="Ir a Axios03"
        onPress={() => navigation.navigate('Axios03')}
      />
      <Button
        title="Ir a AsyncStorage04"
        onPress={() => navigation.navigate('AsyncStorage04')}
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
    fontSize: 48,  // Tamaño del título más grande (doble del tamaño usual)
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 60,  // Hacer el cuadro de texto más grande
    borderColor: '#000',  // Borde negro
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,  // Borde redondeado para mejor apariencia
    marginBottom: 20,  // Espacio inferior para separarlo de los botones
    backgroundColor: '#f9f9f9',  // Fondo gris claro
  },
});

export default Componente01;
