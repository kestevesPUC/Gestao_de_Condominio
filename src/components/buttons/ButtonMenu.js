import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ButtonMenu({...props}) {
    
  return (
    <View style={Styles.container}>
        <TouchableOpacity style={Styles.button} onPress={props.method}>
            <Text>{props.title}</Text>
        </TouchableOpacity>
    </View>
  )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#DEDEDE',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 15,
    },
    button: {
        padding: 20
    }
});
