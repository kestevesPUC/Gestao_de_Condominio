import { Box, FlatList, Input } from 'native-base';
import React from 'react'
import Header from '../../components/Header';
import { Constants } from '../../helpers/constants';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Serach from '../../components/buttons/Round/Search';
import ListItem from './partials/ListItem';

const data = [
  {
    id: 1,
    tipo: 1,
    marca: "Fiat",
    modelo: "Uno",
    ano: '2008',
    placa: "ABC-1234",
    cor: "Vermelho",
    imagens: ['https://garagemotorsoficial.com.br/carros/aa36609f3adf901167f4688f0842f0b2-thumbjpeg-fiat-uno-9653703-1000-750-70.jpg'],
    proprietario: 'Kaio',
  },
  {
    id: 2,
    tipo: 1,
    marca: "Volkswagen",
    modelo: "Gol",
    ano: '2023',
    placa: "ABC-1234",
    cor: "prata",
    imagens: ['https://cdn.motor1.com/images/mgl/YAAopq/s3/volkswagen-gol-1.0-2023.jpg'],
    proprietario: 'Kaio',
  },
]

export default function Veiculos() {
  return (
    <Box flex={1} >
      <Header/>
      <FlatList
        keyExtractor={ (item) => item.id.toString() }
        data={data}
        renderItem={ (item) => 
          <ListItem data={item}  />
        }
      />
      <Serach  />
    </Box>
  )
}

