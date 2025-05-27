import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../../../components/Header'
import { Constants } from '../../../helpers/constants';
import axios from 'axios';
import { route } from '../../../config/route';
import { useFocusEffect } from '@react-navigation/native';
import Load from '../../../components/Load';
import { FlatList } from 'native-base';
import { formatStringDateFromBr } from '../../../helpers/util';
import { DataContext } from '../../../hooks/DataProvider';

export default function DetalhesChamado({ ...props }) {
    const chamado = props.route.params;
    const { usuario } = useContext(DataContext)
    const [historico, setHistorico] = useState();
    const [isLoad, setIsLoad] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getHistorico();
        }, [])
    );

    const clickIniciar = async () => {
        const result = await axios.post(route.called.iniciar, {
            id: chamado.id,
            responsible: usuario.id
        }).then((response) => {
            let data = response.data;

            if(data.success) {
                Alert.alert("Sucesso!", data.message);
                props.route.params.getChamados();
            } else {
                Alert.alert("Erro!", data.message);
            }
        });
    }

    const getHistorico = async () => {
        setIsLoad(true);
        const result = axios.post(route.called.ocurrences, {
            id: chamado.id
        })
            .then((response) => {
                setHistorico(response.data)

            });
        setIsLoad(false);
    }

    return (
        <>
            {
                isLoad ? <Load /> :
                    <>
                        <Header />
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
                            <View style={Styles.row}>
                                <View style={Styles.column}>
                                    <Text style={Styles.label}>Status: {chamado.status}</Text>
                                </View>
                            </View>


                        </View>
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
                                            <Text>{item.message}</Text>
                                        </View>
                                        <View>
                                            <Text>{formatStringDateFromBr(item.created_at)}</Text>
                                        </View>
                                    </View>



                                }
                            />
                        </>
                        {
                            chamado.status.toLowerCase() == "aguardando" ?
                                <TouchableOpacity style={Styles.button} onPress={clickIniciar}>
                                    <Text style={Styles.textButton}>Iniciar atendimento</Text>
                                </TouchableOpacity> : null
                        }
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
    column: {
        flexDirection: 'column',
        width: '100%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
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
    textArea: {
        borderColor: "#DEDEDE",
        borderWidth: 2,
        width: '100%',
        borderRadius: 8,
        textAlignVertical: 'top',
    },
    input: {
        borderColor: "#DEDEDE",
        borderWidth: 2,
        width: '100%',
        borderRadius: 8
    },
});