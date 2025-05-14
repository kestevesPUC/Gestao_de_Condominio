import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../../components/Header'
import { Constants } from '../../../helpers/constants';

export default function AbrirChamado() {
    return (
        <>
            <Header />
            <>
                <View style={Styles.container}>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Text style={Styles.title}>Abrir Chamado</Text>
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Text style={Styles.label}>Titulo:</Text>
                            <TextInput style={Styles.input}></TextInput>
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Text style={Styles.label}>Descrição:</Text>
                            <TextInput
                                multiline={true} 
                                numberOfLines={10}
                                
                                placeholder=" Digite sua mensagem..."
                                style={Styles.textArea}
                            />
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <TouchableOpacity style={Styles.button}>
                                <Text style={Styles.textButton}>Abrir Chamado</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        </>
    )
}

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginTop: 5
    },
    column: {
        flexDirection: 'column',
        width: '100%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    label: {

    },
    textButton: {
        color: "#FFF",
        padding: 10,
        fontSize: 15
    },
    button: {
        backgroundColor: Constants.dPrimaryColor,
        borderRadius: 22,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
        
    },
    textArea: {
        borderColor: "#DEDEDE",
        borderWidth: 2,
        width: '100%',
        borderRadius: 8,
        textAlignVertical: 'top',
    },
    input: {
        borderColor: "#DEDEDE",
        borderWidth: 2,
        width: '100%',
        borderRadius: 8

    },
});