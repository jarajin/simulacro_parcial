import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { Card } from '@rneui/themed';

const AxiosParcial03 = () => {
  const [users, setUsers] = useState([]);

  // Realizar la petición GET a la API para obtener la lista de usuarios
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);  // Guardar los usuarios en el estado
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Title>{item.name} ({item.username})</Card.Title>
            <Card.Divider />
            <Text>Email: {item.email}</Text>
            <Text>Dirección:</Text>
            <Text>- Calle: {item.address.street}</Text>
            <Text>- Suite: {item.address.suite}</Text>
            <Text>- Ciudad: {item.address.city}</Text>
            <Text>- Código Postal: {item.address.zipcode}</Text>
            <Text>- Coordenadas: {item.address.geo.lat}, {item.address.geo.lng}</Text>
          </Card>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default AxiosParcial03;
