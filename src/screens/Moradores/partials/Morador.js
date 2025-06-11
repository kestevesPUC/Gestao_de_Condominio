import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { Box, HStack, Image, VStack, Text } from 'native-base';
import Picture from './Picture';
import { Modals } from '../../../components/Modals';
import { useNavigation } from '@react-navigation/native';


export default function Morador({ ...props }) {
    const navigation = useNavigation();
    const data = props.data.item;
    console.log(data);
    


    return (
        <Box mb={5} fontSize={25} bgColor={'#FFF'} fontWeight={'bold'} ml={3} mr={3} >
            <TouchableOpacity activeOpacity={0.6} borderRadius={22} onPress={
                () => {
                    navigation.navigate("Profile", [data, props.openModal, props.bodyModal])
                }
            }>
                <HStack >

                    <VStack justifyContent={'center'}>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${data.photo ?? ""}` }}
                            style={{ width: 80, height: 80, size: 20, borderRadius: 44 }}
                        />
                    </VStack>
                    <VStack>
                        <HStack mt={3} ml={3}>
                            <Text fontWeight={'bold'} fontSize={17}>{data.name}</Text>
                        </HStack>
                        <HStack ml={3}>
                            <Text>Bloco: {data?.apartment.bloco ?? "N/A"}</Text>
                        </HStack>
                        <HStack ml={3} mb={3}>
                            <Text>Apartamento: {data?.apartment.number ?? "N/A"}</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </TouchableOpacity>
        </Box>
    )
}

