import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Navigator,
    BackAndroid,
    ToastAndroid,
} from 'react-native';

import Main from './main/main';

// ## 路由
export default class Nav extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = (event) => {

        if (this._navigator && this._navigator.getCurrentRoutes().length > 1) {
            this._navigator.pop();
            // 导航回退
            return true;
        }

        if (this._lastBackPressed && this._lastBackPressed + 1000 >= Date.now()) {
            // 一秒内按两次，退出程序
            return false;
        }

        this._lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

        return true;
    };

    renderScene = (route, navigator) => {
        this._navigator = navigator;

        // 路由表
        const router = {

        };

        return <Main navigator={navigator} />;
    };

    configureScene = (route, routeStack) => {
        return Navigator.SceneConfigs.PushFromRight;
    };

    render() {
        return (
            <View style={styles.contanter} collapsable={true}>
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