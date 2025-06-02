import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import Load from '../../components/Load'
import { useFocusEffect } from '@react-navigation/native';
import { ListarComunicados } from '../../services/Methods/Comunicados';
import ComunicadoItem, { } from './partials/ComunicadoItem'


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
        
        setData(result)
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