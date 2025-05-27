import React, {  useContext, useState } from 'react'
import { 
  Platform,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Box, StatusBar, Image, HStack, Text} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Constants } from '../../helpers/constants';
import { DataContext } from '../../hooks/DataProvider';
import { treatName } from '../../helpers/util';


const dPadding = 8;
const StatusBarHeigth = StatusBar.currentHeigth ? statusbar.currentHeigth : 24;
const size = 20;

export default function Header() {
  const { usuario } = useContext(DataContext);
  const navigation = useNavigation();
    const [visible, setVisible] = useState(false);

    

    const toggleDropdown = () => {
      setVisible(!visible);
    };
  
    const renderDropdown = () => {
      if (visible) {
        return (
            <Box style={styles.dropdown} w={100}  alignItems={'center'} borderBottomColor={'gray.300'}>
                <HStack>
                    <TouchableOpacity style={styles.dropdownButton}>
                        <Text>Informações</Text>
                    </TouchableOpacity>
                </HStack>
                <HStack>
                    <TouchableOpacity style={styles.dropdownButton} onPress={ () => { 
                        toggleDropdown();
                        navigation.navigate('Login')
                    }}>
                      <HStack mt={1}>
                        {/* <MaterialCommunityIcons name="logout" size={20} color="#000"  /> */}
                        <Text>Sair</Text>
                      </HStack>
                    </TouchableOpacity>
                </HStack>
            </Box>
        );
      }
    };
  return (
        <Box style={styles.container} >
            <Box style={styles.content} mr={5}>
                <Text style={styles.username} pt={Platform.OS == 'android' ? 5 : 10} pb={Platform.OS == 'android' ? 5 : 10}>{treatName(usuario.name)}</Text>
                <TouchableOpacity activeOpacity={0.6} style={styles.buttonUser} onPress={toggleDropdown} >
                <Image key={size} size={size} resizeMode="cover" source={{
                    uri: ''
                    }} alt={""} style={styles.buttonUser}/>
                    {renderDropdown()}
                </TouchableOpacity>
            </Box>
        </Box>
        
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: Constants.dPrimaryColor,
      paddingTop: StatusBarHeigth,
      flexDirection: 'row',
      paddingStart: dPadding,
      paddingEnd: dPadding,
      paddingBottom: dPadding,
      borderBottomEndRadius: 8,
      borderBottomStartRadius: 8,
      zIndex: 1,
    //   borderBottomEndRadius: 21,
    //   borderBottomLeftRadius: 21,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    username: {
        fontSize: 25,
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 15
    },
    buttonUser: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22
    },
      dropdown: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#fff',
        top: 50,
        right: -15,
        opacity: 0.9
      },
      dropdownButton: {
        borderBottomWidth: 0.5,
        flex: 1,
        alignItems: 'center',
        height: 30
      }
  });