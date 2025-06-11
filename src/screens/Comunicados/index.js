import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import Load from '../../components/Load'
import { useFocusEffect } from '@react-navigation/native';
import { ComunicadoItem } from './partials/ComunicadoItem';
import { ListarComunicados } from '../../services/Methods/Statements'


export default function Comunicados() {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            init();
        }, [])
    );

    const init = async () => {
        setLoad(true);
        const result = await ListarComunicados();
        console.log(result);
        
        setData(result);
        setLoad(false);
    }

    return (
        <>
            {
                load ? <Load /> :
                    <>
                        <Header />
                        <FlatList
                            keyExtractor={(item) => item.id.toString()}
                            data={data}
                            showsHorizontalScrollIndicator={true}
                            renderItem={(item) => (
                                <ComunicadoItem item={item} />
                            )}
                        />
                    </>
            }
        </>
    )
}