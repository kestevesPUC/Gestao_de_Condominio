import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { formatStringDateCompleteFromBr } from '../../../helpers/util';

export default function Item({ ...props }) {

    const data = props.item;


    const clickComunicado = async () => {

    }

    return (
        <TouchableOpacity style={Styles.button} onPress={clickComunicado} >
            <View style={Styles.row}>
                <View style={Styles.column}>
                    <Text style={Styles.title}>Titulo:</Text>
                    <Text style={Styles.title}>Data do comunicado:</Text>
                    <Text style={Styles.title}>Mensagem:</Text>
                    <Text style={Styles.title}></Text>

                </View>
                <View style={Styles.column}>
                    <Text>{data?.title}</Text>
                    <Text>{formatStringDateCompleteFromBr(data?.data)}</Text>
                    <Text>{data?.description}</Text>
                </View>


            </View>
            <View style={Styles.row}>
                <Image source={{ uri: `data:image/jpeg;base64,${data.photo}` }} style={{ width: 200, height: 200, marginTop: 10 }} />
            </View>
        </TouchableOpacity>
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