import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Chamado({ ...props }) {
    
    const data = props.data
    const navigation = useNavigation();

    const clickChamado = () => {
        navigation.navigate("detalhesChamado", props.data);
    }

    return (
        <TouchableOpacity style={Styles.button} onPress={clickChamado} >
            <View style={Styles.row}>
                <View style={Styles.column}>
                    <Text style={Styles.title}>Solicitação:</Text>
                    <Text style={Styles.title}>Titulo:</Text>
                    <Text style={Styles.title}>Solicitante:</Text>
                    <Text style={Styles.title}>Status:</Text>
                    <Text style={Styles.title}>Abertura:</Text>
                    {
                        data?.responsavel ? <Text style={Styles.title}>Responsável:</Text> : null
                    }
                </View>
                <View style={Styles.column}>
                    <Text>{data?.id}</Text>
                    <Text>{data?.title}</Text>
                    <Text>{data?.solicitante}</Text>
                    <Text>{data?.status_description2}</Text>
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