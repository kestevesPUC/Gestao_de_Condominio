import React from 'react'
import { Box, Center, HStack, Text, VStack } from 'native-base'
import { Constants } from '../../../../helpers/constants';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';



export default function Option({ ...props }) {

  const data = props.data.item;

  return (
    <TouchableOpacity onPress={data.click} >
      <Box bgColor={Constants.dSecundaryColor} h={160} borderBottomColor={Constants.dPrimaryColor} borderBottomWidth={0.5} justifyContent={'center'}>
        <HStack justifyContent={'space-evenly'}>
          <VStack >
            <Center>
              {data.icon}
            </Center>
          </VStack>
          <VStack justifyContent={'center'}>
            <Text fontSize={20} color={'#FFF'} fontWeight={'bold'}>{data.title}</Text>
            {data.subTitle ? <Text fontSize={15} color={'#eeeded'}>{data.subTitle}</Text> : null}
          </VStack>
          <VStack justifyContent={'center'}>
            <Center>
              <TouchableOpacity style={styles.button} >
                <Center justifyContent={'center'} right={-1}>
                  <MaterialIcons name='arrow-forward-ios' size={10} color={'#93959c'} />
                </Center>
              </TouchableOpacity>
            </Center>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: Constants.dPrimaryColor,
    padding: 6,
    borderRadius: 22,
  }
});