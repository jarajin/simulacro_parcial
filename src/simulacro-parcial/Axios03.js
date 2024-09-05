import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { Card, Image } from '@rneui/themed';

const Axios03 = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Lista de Usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Title>{item.name}</Card.Title>
            <Card.Divider />
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={{ width: 150, height: 150 }}
            />
            <Text>Email: {item.email}</Text>
            <Text>Teléfono: {item.phone}</Text>
          </Card>
        )}
      />
    </View>
  );
};

export default Axios03;