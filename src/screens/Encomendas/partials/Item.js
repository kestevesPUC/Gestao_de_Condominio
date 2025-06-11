import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { formatStringDateCompleteFromBr, formatStringDateTimeCompleteFromBr } from '../../../helpers/util';
import { Image } from 'native-base';
import { AlterarEncomenda } from '../../../services/Methods/Encomendas';

export default function Item({ ...props }) {

    const data = props.item.item;
    

    const click = async () => {
        Alert.alert(
            'Confirmar',
            'Usuário retirou a encomenda?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {

                        const result = await AlterarEncomenda(data.id);
                        
                        if (result.success) {
                            Alert.alert("Sucesso!", result.message);
                            await props.init();
                        } else {
                            Alert.alert("Erro!", result.message);
                        }
                    },
                },
            ],
            { cancelable: false }
        );

    }

    return (
        <>

            <TouchableOpacity style={Styles.button} onPress={click} >
                <View style={Styles.row}>
                    <View style={Styles.column}>
                        <Text style={Styles.title}>Data recebimento:</Text>
                        <Text style={Styles.title}>Imagem:</Text>
                    </View>
                    <View style={Styles.column}>

                        <Text>{formatStringDateTimeCompleteFromBr(data?.data)}</Text>

                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                    <View style={Styles.column}>
                        <Image source={{ uri: `data:image/jpeg;base64,${data.photo}` }} style={{ width: 200, height: 200, marginTop: 10 }} />
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