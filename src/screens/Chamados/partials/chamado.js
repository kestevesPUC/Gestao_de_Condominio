import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Chamado({ ...props }) {
    console.log(props);

    const data = props.data


    return (
        <TouchableOpacity style={Styles.button} >
            <View style={Styles.row}>
                <View style={Styles.column}>
                    <Text style={Styles.title}>Titulo:</Text>
                    <Text style={Styles.title}>Solicitante:</Text>
                    <Text style={Styles.title}>Status:</Text>
                    <Text style={Styles.title}>Abertura:</Text>
                    {
                        data?.responsavel ? <Text style={Styles.title}>Responsável:</Text> : null
                    }
                </View>
                <View style={Styles.column}>
                    <Text>{data?.title}</Text>
                    <Text>{data?.solicitante}</Text>
                    <Text>{data?.status}</Text>
                    <Text>{data?.abertura}</Text>
                    {
                        data?.responsavel ? <Text>{data?.responsavel}</Text> : null 
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    title:{
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