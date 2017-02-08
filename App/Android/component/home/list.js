import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

export default class List extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.contanter}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
});

