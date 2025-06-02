import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { formatStringDateCompleteFromBr } from '../../../helpers/util';

export default function Reserva({ ...props }) {
    
    const data = props.item.item;
    
    return (
        <>

            <TouchableOpacity style={Styles.button} onPress={() => { }} >
                <View style={Styles.row}>
                    <View style={Styles.column}>
                        <Text style={Styles.title}>Solicitante:</Text>
                        <Text style={Styles.title}>Área:</Text>
                        <Text style={Styles.title}>Inicio:</Text>
                        <Text style={Styles.title}>Fim:</Text>
                    </View>
                    <View style={Styles.column}>
                        <Text>{data?.user.name}</Text>
                        <Text>{data?.area.name}</Text>
                        <Text>{formatStringDateCompleteFromBr(data?.date_start)}</Text>
                        <Text>{formatStringDateCompleteFromBr(data?.date_end)}</Text>
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