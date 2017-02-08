import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import Slide from './slide';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.contanter}>
                <Slide style={styles.slide} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
    slide: {
        height: 200,
    }
});

