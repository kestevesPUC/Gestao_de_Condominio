import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Constants } from '../../helpers/constants';
import { Image, Input } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const user = 'admin';
    const password = '123456';
    const [inptUser, setInptUser] = useState();
    const [inptPass, setInptPass] = useState();

    const navigation = useNavigation();

    const Login = () => {
        if(user == String(inptUser).toLocaleLowerCase() && password === inptPass) {
            navigation.navigate('Moradores');
        } else {
            Alert.alert("Erro!","Usuário ou senha incorreta!");
        }
    }
    
  return (
    <>
        <View style={styles.container}>
            <View>
                <Image  source={require('../../../assets/logo.png')}/>
                <View style={styles.viewInput}>
                    <Text style={styles.label}  >User</Text>
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