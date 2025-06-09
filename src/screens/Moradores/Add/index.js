import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Button } from 'react-native'
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
import * as ImagePicker from 'expo-image-picker';

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
    const [tiposUsuario, setTiposUsuario] = useState([]);


    const [photo, setPhoto] = useState('');


    // useFocusEffect(
    //     React.useCallback(() => {
    //         recuperaTipoUsuario();
    //     }, [])
    // );

    // const recuperaTipoUsuario = async () => {
    //     setIsLoad(true);
    //     let result = await RecuperaTipoUsuario();
    //     let data = result?.data;
    //     let arr = [{
    //         label: "Selecione um perfil",
    //         value: 0
    //     }];

    //     data?.map(e => {
    //         arr?.push({
    //             label: e?.name,
    //             value: e?.id
    //         });
    //     })
    //     setTiposUsuario(arr);
    //     setIsLoad(false);
    // }

    const click = async () => {
        if (confirmPassword != password) {
            alert('Senhas divergentes!');
            return;
        }
        let result = await AddUsuario(name, password, 2, bloco, apto, email, photo.base64);

        if (result.success) {
            alert("Sucesso!", result.message);
        } else {
            alert("Erro!", result.message);
        }


    }

    useEffect(() => {
        verificarPermissao();
    }, []);

    const verificarPermissao = async () => {
        const { status, canAskAgain } = await ImagePicker.getMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            if (!canAskAgain) {
                Alert.alert(
                    'Permissão necessária',
                    'Você negou a permissão de galeria. Vá nas configurações do app para ativar.',
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Abrir configurações', onPress: () => Linking.openSettings() }
                    ]
                );
            } else {
                const { status: novoStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (novoStatus !== 'granted') {
                    Alert.alert('Permissão negada', 'Sem permissão não é possível acessar a galeria.');
                }
            }
        }
    };

    const selecionarImagem = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            setPhoto({
                uri: asset.uri,
                base64: asset.base64,
            });
        }
    };
    return (
        <>
            {

                isLoad ? <Load /> :
                    <>
                        <Header />
                        <View style={styles.view}>
                            <View style={{ marginTop: 5, justifyContent: "center", alignItems: "center" }}>

                                {photo ?
                                    <>
                                        <TouchableOpacity onPress={selecionarImagem} >
                                            <Image source={{ uri: photo.uri }} style={{ width: 200, height: 200, marginTop: 10 }} />
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <>
                                        <Button title="Selecionar a Imagem do veículo" onPress={selecionarImagem} />
                                    </>
                                }
                            </View>
                            <View >
                                <Text>Nome Completo</Text>
                                <Input value={name} onChangeText={(text) => setName(text)} />
                            </View>
                            <View style={styles.vInput}>
                                <Text>E-Mail</Text>
                                <Input value={email} keyboardType="email-address" onChangeText={(text) => setEmail(text)} />
                            </View>
                            <View style={styles.vInput}>
                                <Text>Bloco</Text>
                                <Input value={bloco} keyboardType="numeric" type='number' onChangeText={(text) => setBloco(text)} />
                            </View>
                            <View style={styles.vInput}>
                                <Text>Apartamento</Text>
                                <Input value={apto} keyboardType="numeric" type='number' onChangeText={(text) => setApto(text)} />
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