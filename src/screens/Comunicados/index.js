import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import Load from '../../components/Load'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ListarComunicados } from '../../services/Methods/Statements'
import Item from './partials/Item';
import { StyleSheet } from 'react-native';
import { Constants } from '../../helpers/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Comunicados() {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);


    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            init();
        }, [])
    );

    const addComunicado = async () => {
        navigation.navigate("addComunicado")
    }
    const init = async () => {
        setLoad(true);
        const result = await ListarComunicados();

        setData(result);
        setLoad(false);
    }

    return (
        <>
            {
                load ? <Load /> :
                    <>
                        <Header />
                        <Text style={{ fontSize: 20, padding: 3, fontWeight: "bold" }}>Comunicados:</Text>
                        <FlatList
                            keyExtractor={(item) => item.id.toString()}
                            data={data}
                            showsHorizontalScrollIndicator={true}
                            renderItem={({ item }) => (
                                console.log(item),

                                <Item item={item} />
                            )}
                        />

                        <View style={Styles.viewButton}>
                            <TouchableOpacity style={Styles.button} onPress={addComunicado}>
                                <Ionicons name='add' size={30} color={"#FFF"} />
                            </TouchableOpacity>
                        </View>
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
