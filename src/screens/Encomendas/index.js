import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Constants } from '../../helpers/constants';
import Item from './partials/Item';
import { ListarEncomendas } from '../../services/Methods/Encomendas';
import Load from '../../components/Load';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Encomendas() {
    const [load, setLoad] = useState(false)
    const [encomendas, setEncomendas] = useState(false)

    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            init();
        }, [])
    );


    const init = async () => {
        setLoad(true);
        const result = await ListarEncomendas();
        setEncomendas(result);
        setLoad(false);
    }

    const addEncomenda = async () => {
        navigation.navigate("addEncomenda")
    }

    return (
        <>
            {
                load ? <Load /> :
                    <>
                        <Header />
                        <>
                            <View style={Styles.row}>
                                <View style={Styles.column}>
                                    <Text style={{ fontSize: 20, padding: 3, fontWeight: "bold" }}>Lista de encomendas</Text>
                                </View>
                            </View>

                            <FlatList
                                keyExtractor={(item) => item.id.toString()}
                                data={encomendas}
                                renderItem={(item) =>
                                    <Item item={item} init={init} />
                                }
                            />


                            <View style={Styles.viewButton}>
                                <TouchableOpacity style={Styles.button} onPress={addEncomenda}>
                                    <Ionicons name='add' size={30} color={"#FFF"} />
                                </TouchableOpacity>
                            </View>
                        </>
                    </>
            }

        </>
    )
}


const Styles = StyleSheet.create({
    buttons: {
        borderRadius: 22,
        size: 44,
        backgroundColor: '#DADADA',
    },
    button: {
        backgroundColor: Constants.dPrimaryColor,
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        elevation: 8,

    },
    textButton: {
        color: '#FFF',
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',

    },
    label: {
        marginTop: 3
    },
    viewButton: {
        alignItems: 'flex-end',
    },
    title: {
        fontWeight: "bold"
    },
    row: {
        flexDirection: 'row',
        padding: 5
    },
    column: {
        flexDirection: 'column',
        marginRight: 20
    },
    vInput: {
        marginTop: 5
    },

});
