import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Nav from './component/nav';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.contanter}>
                <Nav style={styles.contanter} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
});