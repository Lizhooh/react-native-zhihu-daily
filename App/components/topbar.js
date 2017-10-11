import React from 'react';
import {
    StyleSheet,
    View, Text,
    TouchableOpacity as Touch
} from 'react-native';
import { color } from '../config';
import Icon from 'react-native-vector-icons/MaterialIcons';

// 顶端栏
export default ({ title, onBack, icons = [], style, myref }) => (
    <View style={[$.toolbar, style]} ref={myref}>
        <Touch
            style={{ padding: 10 }}
            activeOpacity={1}
            onPress={onBack} >
            <Icon name="arrow-back" color="#fff" size={28} style={$.textshadow} />
        </Touch>
        <View style={$.title}>
            <Text style={[$.titleText, $.textshadow]}>{title}</Text>
        </View>
        <View style={$.right}>{
            icons.map((it, index) => (
                <Touch
                    key={`right-icon-${index}`}
                    style={$.icon}
                    activeOpacity={0.7}
                    onPress={it.onPress}
                    >
                    <Icon name={it.name} size={22} color="#fff" style={$.textshadow} />
                    {it.text !== null && <Text style={[$.text, $.textshadow]}>{it.text}</Text>}
                </Touch>
            ))
        }</View>
    </View>
);

const $ = StyleSheet.create({
    toolbar: {
        height: 55,
        backgroundColor: color,
        alignItems: 'center',
        paddingHorizontal: 4,
        flexDirection: 'row',
    },
    title: {
        paddingHorizontal: 8,
    },
    titleText: {
        color: '#fff',
        fontSize: 20,
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    icon: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textshadow: {
        textShadowColor: 'rgba(1, 1, 1, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 6,
    },
    text: {
        color: '#fff',
        marginLeft: 3,
        includeFontPadding: false,
        textAlignVertical: 'center',
        fontSize: 14,
        fontWeight: '500',
    }
});
