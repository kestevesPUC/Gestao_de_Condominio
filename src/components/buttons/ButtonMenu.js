import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ButtonMenu({ ...props }) {

    return (
        <TouchableOpacity style={Styles.button} onPress={props.method}>
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    container: {

    },
    button: {
        backgroundColor: '#DEDEDE',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 15,
        padding: 20
    }
});
