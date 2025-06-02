
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Image, VStack } from 'native-base';
import { Text, TouchableOpacity } from 'react-native';


export default function PerfilFuncionario({ ...props }) {
    const navigation = useNavigation();
    const data = props?.item;

    console.log(data.item);
    
    return (
        <Box mb={5} fontSize={25} bgColor={'#FFF'} fontWeight={'bold'} ml={3} mr={3} >
            <TouchableOpacity activeOpacity={0.6} borderRadius={22} onPress={
                () => {}
            }>
                <HStack >
                    <VStack justifyContent={'center'}>
                        <Image key={20} size={props.size ?? 20} w={props.w ?? null} h={props.h ?? null} resizeMode="cover" source={{uri: props.url}} alt={"avatar"}  borderRadius={props.radius ?? 44}/>
                    </VStack>
                    <VStack>
                        <HStack mt={3} ml={3}>
                            <Text fontWeight={'bold'} fontSize={17}>Nome: {data.item.name}</Text>
                        </HStack>
                        <HStack  ml={3}>
                            <Text fontWeight={'bold'} >E-mail: {data.item.email}</Text>
                        </HStack>
                        <HStack ml={3}>
                            <Text>Perfil:  {data.item.profile.name}</Text>
                        </HStack>
                        <HStack ml={3} mt={3}>
                            <Text>Descrição:  </Text>
                        </HStack>
                        <HStack ml={3} mb={3}>
                            <Text>{data.item?.profile?.description}</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </TouchableOpacity>
        </Box>
    )
}

