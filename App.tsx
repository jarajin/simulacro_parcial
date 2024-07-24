import React from 'react';

import {
  ScrollView,
  StyleSheet,
} from 'react-native';
//Componentes que se van sumando a mi pantalla principal
import BasicComponents from './src/components/BasicComponents';
import TextComponents from './src/components/TextComponents';
import TextInputComponents from './src/components/TextInputComponents';
import ListNotasComponents from './src/components/ListNotasComponents';




const App = () =>{
  return (
    <ScrollView>
       {/* <BasicComponents></BasicComponents>*/}
       {/* <TextComponents></TextComponents>*/}
       {/* <TextInputComponents></TextInputComponents>*/}
       <ListNotasComponents></ListNotasComponents>
    </ScrollView>

  );
}

const styles = StyleSheet.create({

});

export default App;

