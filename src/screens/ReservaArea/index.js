import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Constants } from '../../helpers/constants';
import Header from '../../components/Header';
import { TextInput } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { GetAreas, GetReservas, ReservarArea } from '../../services/Methods/Administracao';
import Select from '../../components/Form/Select';
import { formatStringDateCompleteFromBr, treatDateForUsa } from '../../helpers/util';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from '../../hooks/DataProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Reserva from './partials/Reserva';

export default function Reservas() {
    const [reservas, setReservas] = useState([]);

    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            init();
        }, [])
    );

    const init = async () => {
        const result = await GetReservas();
        setReservas(result);
    }
    return (
        <>
            <Header />

            <View style={Styles.row}>
                <View style={Styles.column}>
                    <Text style={{ fontSize: 20, padding: 3, fontWeight: "bold" }}>Reservas</Text>
                </View>
            </View>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={reservas}
                renderItem={(item) =>
                    <Reserva item={item} />
                }
            />

            <View style={Styles.viewButton}>
                <TouchableOpacity style={Styles.button} onPress={() => navigation.navigate("AddArea")}>
                    <Ionicons name='add' size={30} color={"#FFF"} />
                </TouchableOpacity>
            </View>

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
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        elevation: 8,

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
