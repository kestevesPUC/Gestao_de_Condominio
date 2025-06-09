import React from 'react'
import { Box, Text, HStack, VStack, Center } from 'native-base'
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Picture from '../Picture';
import { useNavigation } from '@react-navigation/native';
import { Constants } from '../../../../helpers/constants';

export default function ListItem({ ...props }) {
    const navigation = useNavigation();
    const data = props.data.item;
    console.log(data);

    const clickVeiculo = () => {
        navigation.navigate('Veiculo', data);

    }

    return (
        <Box bgColor={Constants.dSecundaryColor} borderBottomColor={'#000'} pb={2} >
            <TouchableOpacity onPress={() => clickVeiculo()}>
                <Box borderBottomColor={Constants.dPrimaryColor}>
                    <HStack >
                        <VStack ml={5} size={30} justifyContent={'center'}>
                            <TouchableOpacity onPress={() => clickVeiculo()}>
                                <Center>
                                    <Image
                                        source={{ uri: `data:image/jpeg;base64,${data.imagens}` }}
                                        style={{ width: 80, height: 80, size: 20, borderRadius: 44 }}
                                    />
                                </Center>
                            </TouchableOpacity>
                        </VStack>
                        <VStack justifyContent={'center'} ml={7} w={40}>
                            <HStack mt={3} ml={3}>
                                <Text fontWeight={'bold'} fontSize={17}>{data.modelo}</Text>
                            </HStack>
                            <HStack ml={3}>
                                <Text>{data.marca}</Text>
                            </HStack>
                            <HStack ml={3}>
                                <Text>{data.cor}</Text>
                            </HStack>
                            <HStack ml={3}>
                                <Text>{data.ano}</Text>
                            </HStack>
                        </VStack>
                        <VStack justifyContent={'center'}>
                            <HStack >
                                <VStack ml={5}>
                                    <Center>
                                        <TouchableOpacity style={styles.button} onPress={() => clickVeiculo()} >
                                            <Center justifyContent={'center'} right={-1}>
                                                <MaterialIcons name='arrow-forward-ios' size={10} color={'#93959c'} />
                                            </Center>
                                        </TouchableOpacity>
                                    </Center>
                                </VStack>
                            </HStack>
                        </VStack>
                    </HStack>
                </Box>
            </TouchableOpacity>
        </Box>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Constants.dPrimaryColor,
        padding: 6,
        borderRadius: 22,
    }
});