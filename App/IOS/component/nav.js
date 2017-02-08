import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Navigator,
    BackAndroid,
    ToastAndroid,
} from 'react-native';

// ## 路由
export default class Nav extends Component {

    constructor(props) {
        super(props);
    }

    renderScene = (route, navigator) => {
        this._navigator = navigator;

        // 路由表
        const router = {

        };

        return;
    };

    configureScene = (route, routeStack) => {
        return Navigator.SceneConfigs.PushFromRight;
    };

    render() {
        return (
            <View style={styles.contanter}>
                <Navigator
                    initialRoute={{
                        id: '',
                        title: '',
                        data: {},
                    }}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
});