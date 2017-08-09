import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Main from './main';

// 导航相关
export default class MyNavigatior extends Component {

    views = {
        'Main': Main,
    };

    // 导航动画
    configureScene = (route, navigator) => {
        switch (route.animated) {
            case 'top':
                return Navigator.SceneConfigs.FloatFromBottomAndroid;
            case 'bottom':
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
            case 'left':
                return Navigator.SceneConfigs.PushFromLeft;
            case 'right':
                return Navigator.SceneConfigs.FloatFromRight;
            default:
                return Navigator.SceneConfigs.PushFromRight;
        }
    };

    // 大导航
    renderScene = (route, navigator) => {
        this.navigator = navigator;
        const Views = this.views[route.name];
        return <Views data={route.data} navigator={navigator} />
    };

    render() {
        return (
            <View style={$.container}>
                <Navigator
                    initialRoute={{ name: 'Main', data: null }}
                    renderScene={this.renderScene}
                    configureScene={this.configureScene}
                    />
            </View>
        );
    }
}

const $ = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})
