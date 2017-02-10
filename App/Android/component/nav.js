import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Navigator,
    BackAndroid,
    ToastAndroid,
} from 'react-native';

import Main from './main/main';
import EditorList from './editor/editor-list';
import Editor from './editor/editor';
import Article from './article/article';

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

        if (route.id === 1 && route.title === '主要') {
            return <Main navigator={navigator} />;
        }

        if (route.id === 2 && route.title === '文章') {
            return <Article navigator={navigator} data={route.data} />
        }

        if (route.id === 5 && route.title === '主编') {
            return <EditorList navigator={navigator} data={route.data} />
        }

        if (route.id === 6 && route.title === '主编资料') {
            return <Editor navigator={navigator} data={route.data} />
        }

        return null;
    };

    configureScene = (route, routeStack) => {
        return Navigator.SceneConfigs.PushFromRight;
    };

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

    render() {
        return (
            <View style={styles.contanter} collapsable={true}>
                <Navigator
                    initialRoute={{
                        id: 1,
                        title: '主要',
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