import React from 'react';
import {
    StyleSheet,
    View, Text
} from 'react-native';

export default ({ title }) => (
    <View style={$.container}>
        <Text style={$.text}>{title}</Text>
    </View>
)

const $ = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderBottomWidth: StyleSheet.hairlineWidth * 3,
        borderBottomColor: '#ddd',
    },
    text: {
        color: '#444',
        fontSize: 16,
    }
});
