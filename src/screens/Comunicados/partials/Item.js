import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { formatStringDateCompleteFromBr } from '../../../helpers/util';

export default function Item({ ...props }) {

    const data = props.item;


    const clickComunicado = async () => {

    }

    return (
        <TouchableOpacity style={Styles.button} onPress={clickComunicado} >
            <View style={Styles.linha}>
                <Text style={Styles.title}>Título: </Text>
                <Text style={Styles.content}>{data?.title}</Text>
            </View>

            <View style={Styles.linha}>
                <Text style={Styles.title}>Data do comunicado: </Text>
                <Text style={Styles.content}>{formatStringDateCompleteFromBr(data?.data)}</Text>
            </View>

            <View style={Styles.linha}>
                <Text style={Styles.title}>Mensagem: </Text>
                <Text style={Styles.content}>{data?.description}</Text>
            </View>

            <View style={Styles.linha}>
                <Image source={{ uri: `data:image/jpeg;base64,${data.photo}` }} style={{ width: 200, height: 200, marginTop: 10 }} />
            </View>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    title: {
        fontWeight: "bold"
    },
    linha: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        marginRight: 20
    },
    description: {
        flexShrink: 1,
        flexWrap: 'wrap', // opcional
        fontSize: 14,
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