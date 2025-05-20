import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

export default function Select({ ...props }) {    

    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{props?.title}</Text>
            <Picker
                selectedValue={props?.value}
                onValueChange={(itemValue, itemIndex) => props?.func(itemValue)}
                style={styles.picker}
            >
                {
                    props?.arr?.map(v => (
                        <Picker.Item label={v.label} value={v.value} />
                    ))
                }

            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginBottom: 8,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: '#DEDEDE',
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
    }

});