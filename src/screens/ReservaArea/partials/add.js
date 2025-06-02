import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Constants } from '../../../helpers/constants';
import Header from '../../../components/Header';
import { TextInput } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { GetAreas, ReservarArea } from '../../../services/Methods/Administracao';
import Select from '../../../components/Form/Select';
import { formatStringDateCompleteFromBr, treatDateForUsa } from '../../../helpers/util';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from '../../../hooks/DataProvider';

export default function AddArea() {
    const { usuario } = useContext(DataContext);
    const [areas, setAreas] = useState([]);
    const [area, setArea] = useState(0);
    const [dataInit, setDataInit] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showF, setShowF] = useState(false);

    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            init();
        }, [])
    );

    const init = async () => {
        const result = await GetAreas();
        let arr = [{
            label: "Selecione a área",
            value: 0
        }];

        result.map(e => {
            arr.push({
                label: e?.name,
                value: e?.id,
            });
        })

        setAreas(arr);

    }


    const handleChange = (event, selectedDate) => {
        console.log(selectedDate);

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

        const data = {
            dataInit: treatDateForUsa(dataInit),
            dataFim: treatDateForUsa(dataFim),
            area: area,
            responsavel: usuario.id
        };
       
        console.log(data);

        const result = await ReservarArea(data);        

        if (result?.success) {
            Alert.alert("Sucesso!", result.message);
            navigation.goBack();
        } else {

            Alert.alert("Erro!", result.message);
        }

    }
    return (
        <>
            <Header />

            <View style={Styles.row}>
                <View style={Styles.column}>
                    <Text style={{ fontSize: 20, padding: 3, fontWeight: "bold" }}>Reservar área do condomínio:</Text>
                </View>
            </View>
            <FlatList
                data={[1]}
                renderItem={(item) =>

                    <View style={{ padding: 7 }}>
                        <View style={Styles.vInput}>
                            <Select arr={areas} value={area} func={setArea} title="Área" />
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


            <TouchableOpacity style={Styles.button} onPress={click}>
                <Text style={Styles.textButton}>Salvar</Text>
            </TouchableOpacity >

        </>
    )
}

const Styles = StyleSheet.create({
    buttons: {
        borderRadius: 22,
        size: 44,
        backgroundColor: '#DADADA',
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
    label: {
        marginTop: 3
    },
    viewButton: {
        alignItems: 'flex-end',
    },
    title: {
        fontWeight: "bold"
    },
    row: {
        flexDirection: 'row',
        padding: 5
    },
    column: {
        flexDirection: 'column',
        marginRight: 20
    },
    vInput: {
        marginTop: 5
    },
});
