import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ComunicadoItem(props) {

    console.log(props);
    
  return (
    <TouchableOpacity style={Styles.button} onPress={clickChamado} >
            <View style={Styles.row}>
                <View style={Styles.column}>
                    <Text style={Styles.title}>Solicitação:</Text>
                    <Text style={Styles.title}>Titulo:</Text>
                    <Text style={Styles.title}>Solicitante:</Text>
                    <Text style={Styles.title}>Status:</Text>
                    <Text style={Styles.title}>Abertura:</Text>
                    
                </View>
                {/* <View style={Styles.column}>
                    <Text>{data?.id}</Text>
                    <Text>{data?.title}</Text>
                    <Text>{data?.solicitante}</Text>
                    <Text>{data?.status_description2}</Text>
                    <Text>{data?.abertura}</Text>
                    
                </View> */}
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