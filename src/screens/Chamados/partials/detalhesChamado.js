import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../../../components/Header'
import { Constants } from '../../../helpers/constants';
import axios from 'axios';
import { route } from '../../../config/route';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Load from '../../../components/Load';
import { FlatList } from 'native-base';
import { formatStringDateFromBr } from '../../../helpers/util';
import { DataContext } from '../../../hooks/DataProvider';
import Select from '../../../components/Form/Select';

export default function DetalhesChamado({ ...props }) {
    const chamado = props.route.params;

    const { usuario } = useContext(DataContext)
    const [historico, setHistorico] = useState();
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState([]);
    const [statusSelected, setStatusSelected] = useState(chamado.status_id);
    const [isLoad, setIsLoad] = useState(false);
    const [tela, setTela] = useState(1);
    const [statusChamado, setStatusChamado] = useState(chamado.status_id)

    const navigation = useNavigation();
    useFocusEffect(
        React.useCallback(() => {
            initial();
        }, [])
    );

    const initial = async () => {
        setIsLoad(true);
        await getHistorico();
        await getStatus();
        setIsLoad(false);
    }

    const clickIniciar = async () => {
        const result = await axios.post(route.called.iniciar, {
            id: chamado.id,
            responsible: usuario.id
        }).then((response) => {
            let data = response.data;

            if (data.success) {
                Alert.alert("Sucesso!", data.message);
                setStatusChamado(2)
                props.route.params.getChamados();
            } else {
                Alert.alert("Erro!", data.message);
            }
        });
    }

    const clickAtualizar = async () => {
        await axios.post(route.called.atualizar, {
            id: chamado.id,
            message: description,
            user: usuario.id,
            status: statusSelected
        }).then((response) => {
            let data = response.data;

            if(data.success) {
                Alert.alert("Sucesso!", data.message);
                navigation.goBack();
            } else {
                Alert.alert("Erro!", data.message);
            }
        });
    }

    const getHistorico = async () => {
        await axios.post(route.called.ocurrences, {
            id: chamado.id
        })
            .then((response) => {
                setHistorico(response.data)

            });
    }

    const getStatus = async () => {
        await axios.post(route.called.status)
            .then((response) => {
                let data = response.data;
                let arr = [{
                    label: "Selecione um Status",
                    value: 0
                }];

                data?.map(s => {
                    arr?.push({
                        label: s.description,
                        value: s.id
                    });
                });

                setStatus(arr)
            });
    }

    return (
        <>
            {
                isLoad ? <Load /> :
                    <>
                        <Header />
                        {
                            tela == 1 ?
                                <View style={Styles.container}>
                                    <View style={Styles.row}>
                                        <View style={Styles.column}>
                                            <Text style={Styles.title} >Chamdo: {chamado.id}</Text>
                                        </View>
                                    </View>
                                    <View style={Styles.row}>
                                        <View style={Styles.column}>
                                            <Text style={Styles.label}>Titulo: {chamado.title}</Text>
                                        </View>
                                    </View>
                                    <View style={Styles.row}>
                                        <View style={Styles.column}>
                                            <Text style={Styles.label}>Descrição: {chamado.description}</Text>
                                        </View>
                                    </View>
                                    <View style={Styles.row}>
                                        <View style={Styles.column}>
                                            <Text style={Styles.label}>Data: {chamado.abertura}</Text>
                                        </View>
                                    </View>
                                    <View style={Styles.vInput}>
                                        
                                        {
                                            statusChamado != 3  && statusChamado != 1 ?
                                            <Select arr={status} value={statusSelected} func={setStatusSelected} title="" />
                                            : <Text style={Styles.label}>Status: {chamado.status_description2}</Text>
                                        }
                                    </View>


                                    <>
                                        {
                                            statusChamado != 3 && statusChamado != 1 ?
                                                <View style={Styles.row3}>
                                                    <View style={Styles.column}>
                                                        <Text style={Styles.label}>Observação:</Text>
                                                        <TextInput
                                                            multiline={true}
                                                            numberOfLines={10}
                                                            onChangeText={(e) => setDescription(e)}
                                                            placeholder=" Digite sua mensagem..."
                                                            style={Styles.textArea}
                                                        />
                                                    </View>
                                                </View> : null
                                        }
                                    </>
                                </View> :

                                tela == 2 ?
                                    <>
                                        <View style={Styles.row2}>
                                            <View style={Styles.column}>
                                                <Text style={Styles.title} >Histórico</Text>
                                            </View>
                                        </View>
                                        <FlatList
                                            keyExtractor={(e) => e.id}
                                            data={historico}
                                            renderItem={({ item, index }) =>
                                                <View style={Styles.row2}>
                                                    <View>
                                                        <Text>{++index}</Text>
                                                    </View>
                                                    <View>
                                                        <Text>{item.status.description2}</Text>
                                                    </View>
                                                    <View>
                                                        <Text>{item.message}</Text>
                                                    </View>
                                                    <View>
                                                        <Text>{formatStringDateFromBr(item.created_at)}</Text>
                                                    </View>
                                                </View>
                                            }
                                        />
                                    </> : null
                        }
                        <>
                            {
                                statusChamado == 1 ?
                                    <TouchableOpacity style={Styles.button} onPress={clickIniciar}>
                                        <Text style={Styles.textButton}>Iniciar atendimento</Text>
                                    </TouchableOpacity> :
                                    <>
                                        {
                                            tela == 1 && statusChamado != 3 ?
                                                <TouchableOpacity style={Styles.button} onPress={clickAtualizar}>
                                                    <Text style={Styles.textButton}>Atualizar</Text>
                                                </TouchableOpacity> : null
                                        }

                                        <TouchableOpacity style={Styles.button2} onPress={() => setTela((tela == 1 ? 2 : 1))}>
                                            {
                                                tela == 1 ? <Text style={Styles.textButton}>Histórico</Text> :
                                                    <Text style={Styles.textButton}>Voltar</Text>
                                            }
                                        </TouchableOpacity>
                                    </>
                            }
                        </>
                    </>
            }
        </>
    )
}


const Styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between'
    },
    row2: {
        padding: 10,
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between'
    },
    row3: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    column: {
        flexDirection: 'column',
        width: '100%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    vInput: {
        marginTop: 5
    },
    label: {

    },
    textButton: {
        color: "#FFF",
        padding: 10,
        fontSize: 15
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
    button2: {
        backgroundColor: Constants.dGray,
        borderRadius: 22,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5

    },
    input: {
        borderColor: "#DEDEDE",
        borderWidth: 2,
        width: '100%',
        borderRadius: 8
    },
    textArea: {
        borderColor: "#DEDEDE",
        borderWidth: 2,
        width: '100%',
        borderRadius: 8,
        textAlignVertical: 'top',
    },
});