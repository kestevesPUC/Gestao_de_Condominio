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
                        <Picture url={data.avatarUrl} />
                    </VStack>
                    <VStack>
                        <HStack mt={3} ml={3}>
                            <Text fontWeight={'bold'} fontSize={17}>{data.name}</Text>
                        </HStack>
                        <HStack ml={3}>
                            <Text>Bloco: {data.bloco}</Text>
                        </HStack>
                        <HStack ml={3} mb={3}>
                            <Text>Apartamento: {data.apartament_id ?? "N/A"}</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </TouchableOpacity>
        </Box>
    )
}

