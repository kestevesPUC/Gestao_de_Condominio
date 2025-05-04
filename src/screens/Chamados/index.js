import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import ButtonAdd from '../../components/buttons/ButtonAdd'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { route } from '../../config/route';
import Load from '../../components/Load';
import Chamado from './partials/chamado';
import { formatStringDateFromBr } from '../../helpers/util';

export default function Chamados() {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getChamados();
        }, [])
    );

    const getChamados = async () => {
        setLoad(true);
        await axios.post(route.called.listar_chamados)
            .then((response) => {
                let result = response.data;
                let arr = [];

                if (result?.success) {
                    let data = result?.data;

                    data.map(c => {
                        arr.push({
                            id: c.id,
                            title: c.title,
                            solicitante: "Kaio",
                            responsavel: "Nelson",
                            status: "Aguardando",
                            descricao: c.description,
                            abertura: formatStringDateFromBr(c?.created_at)
                        });
                    });

                    setData(arr);
                }

            })

        setLoad(false);
    }

    const abrirChamado = () => {

    }
    return (
        <>
            {
                load ? <Load /> :
                    <>
                        <Header />
                        <FlatList
                            data={data}
                            renderItem={
                                ({ item }) => <Chamado data={item} />
                            } 
                        />
                        <ButtonAdd func={abrirChamado} />
                    </>
            }

        </>
    )
}