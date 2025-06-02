import { View, Text, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'
import { Box, FlatList, HStack, VStack } from 'native-base'
import Picture from '../Moradores/partials/Picture'
import { Constants } from '../../helpers/constants';
import { LinearGradient } from 'expo-linear-gradient';
import Info from './partials/Info'
import Option from './partials/Options';
import { FontAwesome5,Foundation } from '@expo/vector-icons'; 

export default function Profile({ ...props }) {
  
  const profile = props.route.params;
  console.log(profile);
  
  const [data, setData] = useState([
    {
      id: '1',
      icon: <FontAwesome5 name='car' size={50} color={'#000'}/>,
      title: 'Veículos',
      subTitle: 'Carro & Motocicleta'
    },
    {
      id: '2',
      icon: <Foundation name='telephone' size={50} color={'#000'}/>,
      title: 'Contato',
      subTitle: 'Formas de contato'
    },
  ]);

  return (
    <Box flex={1}>
      <VStack >
        <HStack>
            <Picture url={profile[0].avatarUrl} radius={0} w={'100%'} h={Platform.OS == 'android' ? 400 : 536} />
        </HStack>
        <Box p={3} bgColor={Constants.dPrimaryColor}>
          <Info profile={profile} />
        </Box>
        <Box >
          <HStack >
            <FlatList 
              data={data}
              renderItem={ (item) => <Option data={item} />}
            />
          </HStack>
          
        </Box>
      </VStack>
    </Box>
  )
}
