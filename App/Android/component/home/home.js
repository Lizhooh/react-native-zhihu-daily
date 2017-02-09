import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';

import Slide from './slide';
const window = Dimensions.get('window');

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.contanter}>
                <Slide />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
    title: {
        position: 'absolute',
        bottom: 20,
        color: '#fff',
        fontSize: 20,
        padding: 8,
        paddingBottom: 0,
    },
});

