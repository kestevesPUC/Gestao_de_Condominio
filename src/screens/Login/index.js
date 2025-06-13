import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { Constants } from '../../helpers/constants';
import { Image, Input } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../hooks/DataProvider';
import { LoginUser } from '../../services/Methods/Auth';

export default function Login() {
    const [inptUser, setInptUser] = useState('kesteves.dev@gmail.com');
    const [inptPass, setInptPass] = useState('123456');
    const { setUsuario } = useContext(DataContext);

    const navigation = useNavigation();

    const Login = async() => {
        const result = await LoginUser(inptUser, inptPass);
        if(result?.success) {
            setUsuario(result.data);
            navigation.navigate('Menu');
        } else {
            Alert.alert("Erro!","Usuário ou senha incorreta!");
        }
    }
    
  return (
    <>
        <View style={styles.container}>
            <View>
                <Image width={500} h={500} source={require('../../../assets/logo2.png')}/>
                <View style={styles.viewInput}>
                    <Text style={styles.label}  >E-mail</Text>
                    <Input bgColor={'#DADADA'} value={inptUser} onChangeText={(text) => setInptUser(text)}/>
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.label}>Password</Text>
                    <Input bgColor={'#DADADA'} value={inptPass}  type='password' onChangeText={(text) => setInptPass(text)}/>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={Login}>
                    <Text style={ styles.textButton}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  Constants.dPrimaryColor,
        
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constants.dSecundaryColor,
        borderRadius: 22,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15
    },
    input: {
        
    },
    textButton: {
        fontSize: 20,
        padding: 5,
        color: "#FFF",
        fontWeight: 'bold'
    },
    logo: {
        height: '60%'
    },
    viewInput: {
        marginLeft: 5,
        marginRight: 5,
    },
    label: {
        color: '#FFF',
        marginTop: 3
    }
});