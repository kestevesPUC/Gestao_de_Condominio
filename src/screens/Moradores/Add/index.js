import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../components/Header'
import { Input } from 'native-base';
import { Constants } from '../../../helpers/constants';
import { useNavigation } from '@react-navigation/native';
import { Ajax } from '../../../services/ajax';
import Load from '../../../components/Load';

export default function Add() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bloco, setBloco] = useState('');
    const [apto, setApto] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [foto, setFoto] = useState('');
    const [isLoad, setIsLoad] = useState(false);

    const ajax = new Ajax();

    const click = async () => {
        if(confirmPassword != password) {
            alert('Senhas divergentes!');
            return;
        }
        let result = {};

        result = await ajax.post(`http://localhost/api/create-user`, {
            "name": name,
            "email": email,
            "token": 123456,
            "password": password
        });

        console.log(result);
        

        if(result.success) {
            alert( result.message);
        } else {
            
            alert( result.message);
        }


        // navigation.navigate('Moradores' ,  {
        //     data: {
        //         id: 10,
        //         fullName: name,
        //         bloco: bloco,
        //         apartamento: apto, 
        //         avatarUrl: foto}

        // });
    }
    return (
        <>
            <Header />
            <View style={styles.view}>
                <View >
                    <Text>Nome Completo</Text>
                    <Input value={name} onChangeText={(text) => setName(text)} />
                </View>
                <View style={styles.vInput}>
                    <Text>E-Mail</Text>
                    <Input value={email} onChangeText={(text) => setEmail(text)} />
                </View>
                <View style={styles.vInput}>
                    <Text>Senha</Text>
                    <Input type='password' value={password} onChangeText={(text) => setPassword(text)} />
                </View>
                <View style={styles.vInput}>
                    <Text>Confirmar Senha</Text>
                    <Input type='password' value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} />
                </View>
                {/* <View style={styles.vInput}>
                <Text>Foto</Text>
                <Input value={foto} onChange={(text) => setFoto(text)} />
            </View> */}
            </View>
            <TouchableOpacity style={styles.button} onPress={() => click()}>
                <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },
    vInput: {
        marginTop: 5
    },
    button: {
        backgroundColor: Constants.dPrimaryColor,
        borderRadius: 22,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5

    },
    textButton: {
        color: '#FFF',
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',

    }
});