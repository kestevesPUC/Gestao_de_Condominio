import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatStringDateCompleteFromBr } from '../../../helpers/util';

export default function Visitante({ ...props }) {

    const data = props.item;
    const visitante = props.item.item.v;
    const visita = props.item.item;

    return (
        <>

            <TouchableOpacity style={Styles.button} onPress={() => { }} >
                <View style={Styles.row}>
                    <View style={Styles.column}>
                        <Text style={Styles.title}>Nome:</Text>
                        <Text style={Styles.title}>E-mail:</Text>
                        <Text style={Styles.title}>Inicio:</Text>
                        <Text style={Styles.title}>Fim:</Text>
                        <Text style={Styles.title}>Responsável:</Text>
                        <Text style={Styles.title}>Motivo:</Text>
                    </View>
                    <View style={Styles.column}>
                        <Text>{visitante?.user.name}</Text>
                        <Text>{visitante?.user.email}</Text>
                        <Text>{formatStringDateCompleteFromBr(visitante?.date_start)}</Text>
                        <Text>{formatStringDateCompleteFromBr(visitante?.date_end)}</Text>
                        <Text>{visita.r.name}</Text>
                        <Text>{visitante?.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

const Styles = StyleSheet.create({
    title: {
        fontWeight: "bold"
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
        alignItems: 'flex-start',
        margin: 5,
        borderRadius: 15,
        padding: 20
    }
});