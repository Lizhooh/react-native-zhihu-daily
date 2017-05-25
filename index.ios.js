/**
 * zhihu daily for react-native
 * https://github.com/Lizhooh/react-native-zhihu-daily
 * © 2017 Lizhooh
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ fontSize: 32 }}>不支持 IOS</Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('zhihuDaily', () => App);
