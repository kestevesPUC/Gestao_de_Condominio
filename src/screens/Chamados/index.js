import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import ButtonAdd from '../../components/buttons/ButtonAdd'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { route } from '../../config/route';
import Load from '../../components/Load';
import Chamado from './partials/chamado';
import { formatStringDateFromBr, treatName } from '../../helpers/util';
import { Constants } from '../../helpers/constants';
import { StyleSheet } from 'react-native';

export default function Chamados() {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);
    const [dataBruto, setDataBruto] = useState([]);

    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            getChamados();
        }, [])
    );

    const getChamados = async () => {
        setLoad(true);
        await axios.post(route.called.listar_chamados)
            .then((response) => {
                let result = response?.data;
                let arr = [];

                if (result?.success) {
                    let data = result?.data;
                    setDataBruto(data);


                    data.map(c => {


                        arr.push({
                            id: c.id,
                            title: c.title,
                            solicitante: treatName(c?.applicant?.name),
                            responsavel: treatName(c?.responsible?.name),
                            status: c.status.description,
                            descricao: c.description,
                            abertura: formatStringDateFromBr(c?.created_at),
                            status_id: c?.status?.id,
                            status_description2: c?.status?.description2
                        });
                    });

                    setData(arr);
                }

            })

        setLoad(false);
    }

    const abrirChamado = () => {
        navigation.navigate('AbrirChamado')
    }
    return (
        <>
            {
                load ? <Load /> :
                    <>
                        <Header />
                        <View style={Styles.row}>
                            <View style={Styles.column}>
                                <Text style={{ fontSize: 20, padding: 3, fontWeight: "bold" }}>Chamados</Text>
                            </View>
                        </View>
                        <FlatList
                            keyExtractor={(e) => e.id}
                            data={data}
                            renderItem={
                                ({ item }) => <Chamado data={item} getChamados={getChamados} dataBruto={dataBruto} />
                            }
                        />
                        <ButtonAdd func={abrirChamado} />
                    </>
            }

        </>
    )
}

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginTop: 5
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