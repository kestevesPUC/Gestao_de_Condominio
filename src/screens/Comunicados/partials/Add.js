import { View, Text, FlatList, Image, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { Input } from 'native-base'
import { StyleSheet } from 'react-native';
import { Constants } from '../../../helpers/constants';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CriarComunicado } from '../../../services/Methods/Statements';
import { useNavigation } from '@react-navigation/native';

export default function AddComuinicado() {
    const [titulo, setTitulo] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [photo, setPhoto] = useState("");

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

    const click = async () => {
        const result = await CriarComunicado(titulo, mensagem, photo.base64);

        if (result.success) {
            Alert.alert("Sucesso!", result.message);
            navigation.goBack();
        } else {
            Alert.alert("Erro!", result.message);
        }
    }



    return (
        <>
            <Header />
            <View style={Styles.row}>
                <View style={Styles.column}>
                    <Text style={{ fontSize: 20, padding: 3, fontWeight: "bold" }}>Cadastrar Comunicado</Text>
                </View>
            </View>
            <FlatList
                data={[1]}
                renderItem={(item) =>
                    <View style={Styles.view}>
                        <View style={Styles.view}>
                            <Text>Título</Text>
                            <Input value={titulo} onChangeText={(text) => setTitulo(text)} />
                        </View>
                        <View style={Styles.view}>
                            <Text>Mensagem</Text>
                            <Input value={mensagem} onChangeText={(text) => setMensagem(text)} />
                        </View>
                        {photo ?
                            <>
                                <TouchableOpacity onPress={selecionarImagem} >
                                    <Image source={{ uri: photo.uri }} style={{ width: 200, height: 200, marginTop: 10 }} />
                                </TouchableOpacity>
                            </>
                            :
                            <>
                                <Button title="Adicione uma imagem" onPress={selecionarImagem} />
                            </>
                        }

                    </View>
                }
            />
            <TouchableOpacity style={Styles.button} onPress={() => click()}>
                <Text style={Styles.textButton}>Salvar</Text>
            </TouchableOpacity>
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

    },
    textArea: {
        borderColor: "#DEDEDE",
        borderWidth: 2,
        width: '100%',
        borderRadius: 8,
        textAlignVertical: 'top',
    },
    viewButton: {
        alignItems: 'flex-end',
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