import { Box, FlatList, Input } from 'native-base';
import React, { useState } from 'react'
import Header from '../../components/Header';
import { Constants } from '../../helpers/constants';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Serach from '../../components/buttons/Round/Search';
import ListItem from './partials/ListItem';
import ButtonAdd from '../../components/buttons/ButtonAdd';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { route } from '../../config/route';
import Load from '../../components/Load';


export default function Veiculos() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false)

  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      getVehicles();
    }, [])
  );


  const getVehicles = async () => {
    setLoad(true);
    let result = {}
    let arr = [];

    await axios.post(route.vehicle.listar_vehicles)
      .then((response) => {
        result = response.data;

        console.log(response);
        if(result?.success) {
          let data = result.data;
          
          data.map(v => {
            arr.push({
              id: v?.id,
              tipo: v?.type?.description,
              marca: v?.brand?.name,
              modelo: v?.model?.name,
              ano: v?.year,
              placa: v?.plate,
              cor: v?.color?.name,
              imagens: v?.photo ?? "",
              proprietario: v?.userId,
              vaga: v?.vaga,
              photo: v?.photo
            })
          })

          setData(arr)
        } else {
          alert(result.message)
        }
        

      }).catch(error => {
        console.error(error);
      });
      
      
      setLoad(false)

      
  }

  
  const add = () => {
    navigation.navigate("CriarVeiculo")
  }

  return (
    <>
      {
        load ? <Load /> :
          <Box flex={1} >
            <Header />
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={data}
              renderItem={(item) =>
                <ListItem data={item} />
              }
            />
            {/* <Serach  /> */}
            <ButtonAdd func={add} />
          </Box>
      }
    </>
  )
}

