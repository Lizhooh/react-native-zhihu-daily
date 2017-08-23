import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text,
    TouchableOpacity as Touch
} from 'react-native';
import { color } from '../config';
import Checkbox from './checkbox';


export default ({ text, subText, showCheck = true, isChecked = false  }) => (
    <View style={{ backgroundColor: '#ddd' }}>
        <Touch style={$.container} activeOpacity={0.7}>
            <View style={$.textview}>
                {text && <Text style={$.bigtext}>{text}</Text>}
                {subText && <Text style={$.samlltext}>{subText}</Text>}
            </View>

            {showCheck && <Checkbox initCheck={isChecked} color={color} />}
        </Touch>
    </View>
);


const $ = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    textview: {
        flex: 1,
    },
    bigtext: {
        fontSize: 16,
        color: '#555',
    },
    samlltext: {
        fontSize: 14,
    }
});
