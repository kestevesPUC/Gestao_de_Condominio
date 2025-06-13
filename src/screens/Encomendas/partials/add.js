import { View, Text, Alert, StyleSheet, TouchableOpacity, Button, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import * as ImagePicker from 'expo-image-picker';
import { Constants } from '../../../helpers/constants';
import { Salvar } from '../../../services/Methods/Encomendas';
import { useNavigation } from '@react-navigation/native';

export default function add() {
    const [photo, setPhoto] = useState('');
    const navigation = useNavigation();

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

    const click = async () => {
        const result = await Salvar(photo.base64);
        console.log(result);

        if (result.success) {
            Alert.alert("Sucesso!", result.message);
            navigation.goBack();
        } else {

            Alert.alert("Erro!", result.message)
        }
    }

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
            <Header />

            <View style={Styles.row}>
                <View style={Styles.column}>
                    <Text style={{ fontSize: 20, padding: 3, fontWeight: "bold" }}>Cadastrar encomenda:</Text>
                </View>
            </View>
            <FlatList
                data={[1]}
                renderItem={(item) =>

                    <View style={{ padding: 7 }}>
                        <View style={{ marginTop: 5, justifyContent: "center", alignItems: "center" }}>

                            {photo ?
                                <>
                                    <TouchableOpacity onPress={selecionarImagem} >
                                        <Image source={{ uri: photo.uri }} style={{ width: 200, height: 200, marginTop: 10 }} />
                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <Button title="Selecionar a Imagem da encomenda" onPress={selecionarImagem} />
                                </>
                            }
                        </View>
                    </View>
                }
            />


            <TouchableOpacity style={Styles.button} onPress={click}>
                <Text style={Styles.textButton}>Salvar</Text>
            </TouchableOpacity >

        </>
    )
}

const Styles = StyleSheet.create({
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