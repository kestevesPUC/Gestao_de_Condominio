import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Constants } from '../../helpers/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getVisitantes } from '../../services/Methods/Visitor';
import Visitante from './partials/Visitante';

export default function Visitantes() {
  const navigation = useNavigation();
  const [visitantes, setVisitantes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      init();
    }, [])
  );

  const init = async () => {
    const result = await getVisitantes();
    setVisitantes(result);

  }


  const cadastrarVisitante = () => {
    navigation.navigate("CadastrarVisitante")
  }
  return (
    <>
      <Header />

      <View style={Styles.row}>
        <View style={Styles.column}>

          <Text style={{ fontSize: 20, padding: 3, fontWeight: "bold" }}>Visitantes autorizados na semana:</Text>
        </View>
      </View>
      <FlatList
        keyExtractor={(item) => item.v.id.toString()}
        data={visitantes}
        renderItem={(item) =>
          <Visitante item={item} />
        }
      />
      <View style={Styles.viewButton}>
        <TouchableOpacity style={Styles.button} onPress={cadastrarVisitante}>
          <Ionicons name='add' size={30} color={"#FFF"} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const Styles = StyleSheet.create({
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
  },
   title: {
        fontWeight: "bold"
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        marginRight: 20
    },
});
