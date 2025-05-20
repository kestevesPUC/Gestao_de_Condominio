import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Load from '../../../components/Load'
import Header from '../../../components/Header'
import { StyleSheet } from 'react-native';
import { Constants } from '../../../helpers/constants';
import { Input } from 'native-base';
import { CriarPerfil } from '../../../services/Methods/Administracao';

export default function addPerfil() {
    const [isLoad, setIsLoad] = useState(false);
    const [name, setName] = useState(false);
    const [description, setDescription] = useState(false);

    const click = async () => {
        setIsLoad(true);
        const result = await CriarPerfil(name, description);
        setIsLoad(false);

        if(result?.success) {
            
        }
    }

    return (
        <>
            {

                isLoad ? <Load /> :
                    <>
                        <Header />
                        <View style={styles.view}>
                            <View >
                                <Text>Nome do perfil</Text>
                                <Input value={name} onChangeText={(text) => setName(text)} />
                            </View>
                            <View >
                                <Text>Descrição do perfil</Text>
                                <Input value={description} onChangeText={(text) => setDescription(text)} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={click}>
                            <Text style={styles.textButton}>Salvar</Text>
                        </TouchableOpacity>
                    </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },
    vInput: {
        marginTop: 5
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
    textButton: {
        color: '#FFF',
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',

    }
});