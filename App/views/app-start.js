import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    ImageBackground,
} from 'react-native';

export default () => (
    <ImageBackground
        style={$.container}
        source={require('../resource/bg.jpg')}
        >
        <View style={$.view}>
            <Image source={require('../resource/logo.png')} style={$.logo} />
            <Text style={$.text}>知乎日报</Text>
        </View>
    </ImageBackground>
)

const $ = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        justifyContent: 'flex-end',
        padding: 30,
        opacity: 1,
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 40,
        height: 40,
    },
    text: {
        color: '#fff',
        textShadowColor: 'rgba(1, 1, 1, 0.5)',
        textShadowOffset: { width: 2, height: 3 },
        textShadowRadius: 12,
        fontSize: 32,
        marginLeft: 15
    }
})
