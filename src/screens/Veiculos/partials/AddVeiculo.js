import { View, Text, StyleSheet, TouchableOpacity, Alert, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { FlatList, Input } from 'native-base';
import { Constants } from '../../../helpers/constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ajax } from '../../../services/ajax';
import Load from '../../../components/Load';
import axios from 'axios';
import { route } from '../../../config/route';
import Select from '../../../components/Form/Select';
import { AddUsuario, RecuperaTipoUsuario } from '../../../services/Methods/User';
import { CadastrarVeiculo, RecuperaInfoVeiculo } from '../../../services/Methods/Veiculo';
import * as ImagePicker from 'expo-image-picker';

export default function AddVeiculo() {
    const navigation = useNavigation();
    const [placa, setPlaca] = useState('');
    const [vaga, setVaga] = useState('');
    const [photo, setPhoto] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [listTypes, setListTypes] = useState([]);
    const [listBrands, setListBrands] = useState([]);
    const [listColors, setListColors] = useState([]);
    const [listModels, setListModels] = useState([]);

    const [user, setUser] = useState();
    const [ano, setAno] = useState();
    const [type, setType] = useState(0);
    const [brand, setBrand] = useState(0);
    const [color, setColor] = useState(0);
    const [model, setModel] = useState(0);


    useFocusEffect(
        React.useCallback(() => {
            init()
        }, [])
    );

    useEffect(() => {
        verificarPermissao();
    }, []);

    const init = async () => {
        setIsLoad(true);
        let result = await RecuperaInfoVeiculo();

        let data = result?.data;
        let users = [{
            label: "Selecione o proprietário",
            value: 0
        }];


        let types = [{
            label: "Selecione o tipo do veículo",
            value: 0
        }];
        let brands = [{
            label: "Selecione a marca",
            value: 0
        }];
        let models = [{
            label: "Selecione o modelo",
            value: 0
        }];
        let colors = [{
            label: "Selecione a cor",
            value: 0
        }];

        data?.users.map(e => {
            users?.push({
                label: e?.name,
                value: e?.id
            });
        })
        data?.types.map(e => {
            types?.push({
                label: e?.description,
                value: e?.id
            });
        })
        data?.brands.map(e => {
            brands?.push({
                label: e?.name,
                value: e?.id
            });
        })
        data?.colors.map(e => {
            colors?.push({
                label: e?.name,
                value: e?.id
            });
        })
        data?.models.map(e => {
            models?.push({
                label: e?.name,
                value: e?.id
            });
        })

        setListUsers(users);
        setListTypes(types);
        setListBrands(brands);
        setListColors(colors);
        setListModels(models);

        setIsLoad(false);
    }

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
        if (user == 0 || ano == null || type == 0 || brand == 0 || color == 0 || color == 0 || model == 0 || placa == "" || vaga == "") {
            Alert.alert("Erro!", "Um ou mais campos obrigatórios não foram preenchidos.");
        }
        const data = {
            user: user,
            ano: ano,
            type: type,
            brand: brand,
            color: color,
            model: model,
            placa: placa,
            vaga: vaga,
            photo: photo.base64
        }

        const result = await CadastrarVeiculo(data);

        if (result?.success) {
            Alert.alert("Sucesso!", result.message);
            navigation.goBack();
        } else {

            Alert.alert("Erro!", result.message);
        }


    }
    return (
        <>
            {

                isLoad ? <Load /> :
                    <>
                        <Header />
                        <FlatList
                            keyExtractor={(item) => item.toString()}
                            data={[1]}
                            renderItem={(item) =>
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
                                                <Button title="Selecionar a Imagem do Veículo" onPress={selecionarImagem} />
                                            </>
                                        }
                                    </View>
                                    <View style={styles.vInput}>
                                        <Select arr={listUsers} value={user} func={setUser} title="Proprietário" />
                                    </View>
                                    <View style={styles.vInput}>
                                        <Select arr={listTypes} value={type} func={setType} title="Tipo" />
                                    </View>
                                    <View style={styles.vInput}>
                                        <Select arr={listBrands} value={brand} func={setBrand} title="Marca" />
                                    </View>
                                    <View style={styles.vInput}>
                                        <Select arr={listModels} value={model} func={setModel} title="Modelo" />
                                    </View>
                                    <View style={styles.vInput}>
                                        <Select arr={listColors} value={color} func={setColor} title="Cor" />
                                    </View>
                                    <View >
                                        <Text>Placa</Text>
                                        <Input value={placa} onChangeText={(text) => setPlaca(text)} />
                                    </View>
                                    <View >
                                        <Text>Ano Fabricação</Text>
                                        <Input type='numeric' value={ano} onChangeText={(text) => setAno(text)} />
                                    </View>
                                    <View >
                                        <Text>Vaga</Text>
                                        <Input type='numeric' value={vaga} onChangeText={(text) => setVaga(text)} />
                                    </View>

                                </View>
                            }
                        />
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