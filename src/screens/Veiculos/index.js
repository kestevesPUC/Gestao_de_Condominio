import { Box, FlatList, Input } from 'native-base';
import React, { useState } from 'react'
import Header from '../../components/Header';
import { Constants } from '../../helpers/constants';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState();

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
        if (result?.success) {
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

          setFilteredData(arr)
          setData(arr)

        } else {
          alert(result.message)
        }


      }).catch(error => {
        console.error(error);
      });


    setLoad(false)


  }


  const searchVeiculo = async (search) => {
    setSearch(search);

    if (search === '') {
      setFilteredData(data);
    } else {
      const searchLower = search.toLowerCase();

      const filtered = data.filter(item => {
        const itemString = JSON.stringify(item).toLowerCase();
        return itemString.includes(searchLower);
      });

      setFilteredData(filtered);
    }
  };


  const add = () => {
    navigation.navigate("CriarVeiculo")
  }

  return (
    <>
      {
        load ? <Load /> :
          <Box flex={1} >
            <Header />
            <>
              <View style={{ padding: 10 }}>
                <Input placeholder='Pesquisar Veículo' value={search} onChangeText={((text) => searchVeiculo(text))} />
              </View>
            </>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={filteredData}
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

