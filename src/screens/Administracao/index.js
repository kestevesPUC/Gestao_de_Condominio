import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Load from '../../components/Load';
import Header from '../../components/Header';
import ButtonAdd from '../../components/buttons/ButtonAdd';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ListarPerfis } from '../../services/Methods/Administracao';
import { FlatList } from 'native-base';

export default function Administracao() {
    const navigation = useNavigation();
    const [load, setLoad] = useState(false);
    const [perfis, setPerfis] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getPerfis();
        }, [])
    );

    const getPerfis = async () => {
        setLoad(true);

        const result = await ListarPerfis();
        
        if (result?.success) {
            setPerfis(result?.data)
        }

        setLoad(false);
    }

    return (
        <>
            {
                load ? <Load /> :
                    <>
                        <Header />
                        <Text style={Styles.title}>Perfis de Usuário</Text>
                        <FlatList
                            data={perfis}
                            renderItem={
                                ({ item }) => (
                                    <TouchableOpacity style={Styles.button} >
                                        <Text style={Styles.text} >{item?.name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        />
                        <ButtonAdd func={() => navigation.navigate("addPerfil")} />
                    </>
            }

        </>
    )
}


const Styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        margin: 5,
        borderRadius: 15,
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        marginRight: 20
    },
    button: {
        flex: 1,
        backgroundColor: '#DEDEDE',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 15,
        padding: 20
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
    }

});