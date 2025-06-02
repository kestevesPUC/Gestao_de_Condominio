import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList } from 'native-base';
import axios from 'axios';
import { route } from '../../config/route';
import Load from '../../components/Load';
import PerfilFuncionario from './partials/PerfilFuncionario';
import { Constants } from '../../helpers/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Funcionarios() {
  const [load, setLoad] = useState(false)
  const [data, setData] = useState([])

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      init();
    }, [])
  );

  const init = async () => {
    setLoad(true);
    await axios.post(route.user.listar_funcionarios)
      .then((response) => {
        let result = response.data;

        setData(result.data)
      })
    setLoad(false);
  }

  const addFuncionario = () => {
    navigation.navigate("CriarFuncionario")
  }


  return (
    <>
      <Header />
      {
        load ? <Load /> :
          <>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={data}
              showsHorizontalScrollIndicator={true}
              renderItem={(item) => (
                <PerfilFuncionario item={item} />
              )}
            />

            <View style={styles.viewButton}>
              <TouchableOpacity style={styles.button} onPress={addFuncionario}>
                <Ionicons name='add' size={30} color={"#FFF"} />
              </TouchableOpacity>
            </View>
          </>
      }
    </>
  )
}

const styles = StyleSheet.create({
  buttons: {
    borderRadius: 22,
    size: 44,
    backgroundColor: '#DADADA',
  },
  button: {
    backgroundColor: Constants.dPrimaryColor,
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    elevation: 8,
  },
  viewButton: {
    alignItems: 'flex-end',
  }
});