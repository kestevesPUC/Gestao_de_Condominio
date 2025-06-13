import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../../../components/Header'
import { Constants } from '../../../helpers/constants';
import axios from 'axios';
import { route } from '../../../config/route';
import { DataContext } from '../../../hooks/DataProvider';
import { useNavigation } from '@react-navigation/native';

export default function AbrirChamado() {
    const { usuario } = useContext(DataContext)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigation = useNavigation();


    const clickAbrirChamado = async () => {
        const result = await axios.post(route.called.create, {
            title: title,
            description: description,
            applicantId: usuario.id
        })
            .then((response) => {
                let result = response.data;
                if (result.success) {

                    Alert.alert("Sucesso!", result.message);
                    navigation.goBack();
                } else {

                    Alert.alert("Erro!", result.message)
                }
            });
    }
    return (
        <>
            <Header />
            <>
                <View style={Styles.container}>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Text style={Styles.title} >Abrir Chamado</Text>
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Text style={Styles.label}>Titulo:</Text>
                            <TextInput onChangeText={(e) => setTitle(e)} style={Styles.input}></TextInput>
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <Text style={Styles.label}>Descrição:</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={(e) => setDescription(e)}
                                placeholder=" Digite sua mensagem..."
                                style={Styles.textArea}
                            />
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <TouchableOpacity style={Styles.button} onPress={clickAbrirChamado}>
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