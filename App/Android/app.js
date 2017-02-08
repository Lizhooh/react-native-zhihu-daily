import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Nav from './component/nav';

export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Nav />
            </View>
        );
    }
}