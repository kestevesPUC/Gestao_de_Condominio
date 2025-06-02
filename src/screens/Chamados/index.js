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