import React from 'react';
import { Box, VStack, Text, HStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';

export default function Info({ ...props }) {
    const profile = props.profile[0]
    const openModal = props.profile[1];
    const bodyModal = props.profile[2];
    
    const clickBell = async () => {   
        await bodyModal(profile);
        openModal(true)
    }


    return (
        <HStack justifyContent={`space-between`}>
            <VStack >
                <Box >
                    <Box>
                        <Text fontSize={15} color={'#FFF'} fontWeight={'bold'}>{profile.name}</Text>
                    </Box>
                    <Box>
                        <Text fontSize={13} color={'#FFF'} >Bloco {profile.bloco} Apartamento {profile.apartamento}</Text>
                    </Box>
                </Box>
            </VStack>
            <VStack justifyContent={'center'} mr={3}>
                <TouchableOpacity onPress={ () => clickBell() }>
                    <FontAwesome name='bell' size={28} color={'#FFF'}/>
                </TouchableOpacity>
            </VStack>
        </HStack>
    )
}