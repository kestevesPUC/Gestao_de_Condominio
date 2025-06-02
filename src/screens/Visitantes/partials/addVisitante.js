import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../../../components/Header'
import Select from '../../../components/Form/Select'
import { Constants } from '../../../helpers/constants'
import { FlatList, Input } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { formatStringDateCompleteFromBr, treatDateForUsa } from '../../../helpers/util'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RegistrarVisitante } from '../../../services/Methods/User'
import { DataContext } from '../../../hooks/DataProvider'
import { useNavigation } from '@react-navigation/native'
import { getVisitante } from '../../../services/Methods/Visitor'

export default function CadastrarVisitante() {
    const navigation = useNavigation();

    const { usuario } = useContext(DataContext)
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');

    const [dataInit, setDataInit] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showF, setShowF] = useState(false);
    const [motivo, setMotivo] = useState("");


    const handleChange = (event, selectedDate) => {
        const currentDate = selectedDate || dataInit;
        setShow(false);
        setDataInit(currentDate);

    };
    const handleChangeF = (event, selectedDate) => {
        const currentDate = selectedDate || dataFim;
        setShowF(false);
        setDataFim(currentDate);

    };

    const click = async () => {
        console.log(dataInit);

        const data = {
            cpf: cpf,
            name: name,
            email: email,
            dataInit: treatDateForUsa(dataInit),
            dataFim: treatDateForUsa(dataFim),
            motivo: motivo,
            responsavel: usuario.id
        };
        console.log(data);

        const result = await RegistrarVisitante(data);

        if (result?.success) {
            Alert.alert("Sucesso!", result.message);
            navigation.goBack();
        } else {

            Alert.alert("Erro!", result.message);
        }

    }

    const changeCpf = async (value) => {
        setCpf(value)
        if (value.length > 10) {
            let result = await getVisitante(value);
            setName(result.name);
            setEmail(result.email);
        }
    }

    return (
        <>
            <Header />
            <FlatList
                data={[1]}
                renderItem={(item) =>
                    <View style={Styles.view}>
                        <View style={Styles.view}>
                            <Text>CPF</Text>
                            <Input value={cpf} onChangeText={(text) => changeCpf(text)} />
                        </View>
                        <View style={Styles.view}>
                            <Text>Nome Completo</Text>
                            <Input value={name} onChangeText={(text) => setName(text)} />
                        </View>
                        <View style={Styles.view}>
                            <Text>E-mail</Text>
                            <Input value={email} onChangeText={(text) => setEmail(text)} />
                        </View>
                        <View style={Styles.view}>
                            <Text>Data Inicio</Text>
                            <TouchableOpacity
                                onPress={() => setShow(true)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    padding: 10,
                                    gap: 8,
                                }}
                            >
                                <MaterialIcons name="calendar-today" size={24} color="#333" />
                                <Text>{formatStringDateCompleteFromBr(dataInit)}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.view}>
                            <Text>Data Fim</Text>
                            <TouchableOpacity
                                onPress={() => setShowF(true)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    padding: 10,
                                    gap: 8,
                                }}
                            >
                                <MaterialIcons name="calendar-today" size={24} color="#333" />
                                <Text>{formatStringDateCompleteFromBr(dataFim)}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.view}>
                            <Text style={Styles.label}>Motivo:</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={(e) => setMotivo(e)}
                                placeholder=" Digite sua mensagem..."
                                style={Styles.textArea}
                            />
                        </View>

                        {show && (
                            <DateTimePicker
                                value={dataInit}
                                mode="date"
                                display="default"
                                onChange={handleChange}
                            />
                        )}
                        {showF && (
                            <DateTimePicker
                                value={dataFim}
                                mode="date"
                                display="default"
                                onChange={handleChangeF}
                            />
                        )}
                    </View>
                }
            />
            <TouchableOpacity style={Styles.button} onPress={() => click()}>
                <Text style={Styles.textButton}>Salvar</Text>
            </TouchableOpacity>
        </>
    )
}

const Styles = StyleSheet.create({
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

    },
    textArea: {
        borderColor: "#DEDEDE",
        borderWidth: 2,
        width: '100%',
        borderRadius: 8,
        textAlignVertical: 'top',
    },
    viewButton: {
        alignItems: 'flex-end',
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