import React from 'react';
import { View, Text } from 'react-native';

const Props02 = ({ route }) => {
  const { nombre, estado } = route.params;

  return (
    <View>
      <Text>Nombre: {nombre}</Text>
      <Text>Estado: {estado ? 'Activo' : 'Inactivo'}</Text>
    </View>
  );
};

export default Props02;
