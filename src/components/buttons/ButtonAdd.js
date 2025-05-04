import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Constants } from '../../helpers/constants';

export default function ButtonAdd({...props}) {    
    return (
        <View style={styles.viewButton}>
            <TouchableOpacity style={styles.button} onPress={props?.func}>
                <Ionicons name='add' size={30} color={"#FFF"} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
    viewButton: {
        alignItems: 'flex-end',
    }
});