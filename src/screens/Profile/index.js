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
  
  const [data, setData] = useState([
    {
      id: '1',
      icon: <FontAwesome5 name='car' size={50} color={'#000'}/>,
      title: 'Veículos',
      subTitle: 'Carro & Motocicleta',
      click: () => { console.log(profile) }
    },
    {
      id: '2',
      icon: <Foundation name='telephone' size={50} color={'#000'}/>,
      title: 'Contato',
      subTitle: 'Formas de contato',
      
      click: () => { console.log('2222') }
    },
  ]);

  
  return (
    <Box flex={1}>
      <VStack >
        <HStack>
            <Picture 
            url={
              (profile[0].photo ? 
              `data:image/jpeg;base64,${profile[0].photo ?? ""}` 
                : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              )} radius={0} w={'100%'} h={Platform.OS == 'android' ? 400 : 536} />
        </HStack>
        <Box p={3} bgColor={Constants.dPrimaryColor}>
          <Info profile={profile} />
        </Box>
        <Box >
          <HStack >
            <FlatList 
              data={data}
              renderItem={ (item) => <Option profile={profile} data={item} />}
            />
          </HStack>
          
        </Box>
      </VStack>
    </Box>
  )
}
