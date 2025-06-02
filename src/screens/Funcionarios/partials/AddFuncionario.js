import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { Input } from 'native-base';
import { Constants } from '../../../helpers/constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ajax } from '../../../services/ajax';
import Load from '../../../components/Load';
import axios from 'axios';
import { route } from '../../../config/route';
import Select from '../../../components/Form/Select';
import { AddUsuario, RecuperaTipoUsuario } from '../../../services/Methods/User';

export default function AddFuncionario() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bloco, setBloco] = useState('');
    const [apto, setApto] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [foto, setFoto] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [tiposUsuario, setTiposUsuario] = useState([]);
    const [perfil, setPerfil] = useState(0);


    useFocusEffect(
        React.useCallback(() => {
            recuperaTipoUsuario();
        }, [])
    );

    const recuperaTipoUsuario = async () => {
        setIsLoad(true);
        let result = await RecuperaTipoUsuario();
        let data = result?.data;
        let arr = [{
            label: "Selecione um perfil",
            value: 0
        }];

        data?.map(e => {
            arr?.push({
                label: e?.name,
                value: e?.id
            });
        })
        setTiposUsuario(arr);
        setIsLoad(false);
    }

    const click = async () => {
        if (confirmPassword != password) {
            alert('Senhas divergentes!');
            return;
        } else if (perfil == 0) {
            alert('Selecione um perfil');
            return;
        }
        let result = await AddUsuario(name, password, perfil, bloco, apto, email);

        if (result.success) {
            alert("Sucesso!", result.message);
        } else {
            alert("Erro!", result.message);
        }


    }
    return (
        <>
            {

                isLoad ? <Load /> :
                    <>
                        <Header />
                        <View style={styles.view}>
                            <View >
                                <Text>Nome Completo</Text>
                                <Input value={name} onChangeText={(text) => setName(text)} />
                            </View>
                            <View style={styles.vInput}>
                                <Text>E-Mail</Text>
                                <Input value={email} keyboardType="email-address" onChangeText={(text) => setEmail(text)} />
                            </View>
                            <View style={styles.vInput}>
                                <Select arr={tiposUsuario} value={perfil} func={setPerfil} title="Perfil" />
                            </View>
                            <View style={styles.vInput}>
                                <Text>Senha</Text>
                                <Input type='password' value={password} onChangeText={(text) => setPassword(text)} />
                            </View>
                            <View style={styles.vInput}>
                                <Text>Confirmar Senha</Text>
                                <Input type='password' value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} />
                            </View>

                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => click()}>
                            <Text style={styles.textButton}>Salvar</Text>
                        </TouchableOpacity>
                    </>
            }
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