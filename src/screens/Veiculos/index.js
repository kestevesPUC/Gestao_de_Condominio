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
          console.log(data);
          
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
              proprietario: 'Kaio',
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

  // const data = [
  //   {
  //     id: 1,
  //     tipo: 1,
  //     marca: "Fiat",
  //     modelo: "Uno",
  //     ano: '2008',
  //     placa: "ABC-1234",
  //     cor: "Vermelho",
  //     imagens: ['https://garagemotorsoficial.com.br/carros/aa36609f3adf901167f4688f0842f0b2-thumbjpeg-fiat-uno-9653703-1000-750-70.jpg'],
  //     proprietario: 'Kaio',
  //   },
  //   {
  //     id: 2,
  //     tipo: 1,
  //     marca: "Volkswagen",
  //     modelo: "Gol",
  //     ano: '2023',
  //     placa: "ABC-1234",
  //     cor: "prata",
  //     imagens: ['https://cdn.motor1.com/images/mgl/YAAopq/s3/volkswagen-gol-1.0-2023.jpg'],
  //     proprietario: 'Kaio',
  //   },
  // ]

  const add = () => {
    nav

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

