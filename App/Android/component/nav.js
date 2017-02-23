import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Navigator,
    BackAndroid,
    Dimensions,
    ToastAndroid,
} from 'react-native';

import Main from './main/main';
import EditorList from './editor/editor-list';
import Editor from './editor/editor';
import Article from './article/article';
import Comment from './comment/comment';
import About from './about/about';

const window = Dimensions.get('window');

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

        if (route.id === 3 && route.title === '评论') {
            return <Comment navigator={navigator} data={route.data} />;
        }

        if (route.id === 4 && route.title === '收藏') {
            return;
        }

        if (route.id === 5 && route.title === '主编') {
            return <EditorList navigator={navigator} data={route.data} />
        }

        if (route.id === 6 && route.title === '主编资料') {
            return <Editor navigator={navigator} data={route.data} />
        }

        if (route.id === 7 && route.title === '关于') {
            return <About navigator={navigator} data={route.data} />
        }

        if (route.id === 8 && route.title === '登录') {
            return;
        }

        return null;
    };

    configureScene = (route, routeStack) => {
        if ([5, 6].some(i => route.id === i)) {
            return Navigator.SceneConfigs.PushFromRight;
        }
        if ([7].some(i => route.id === i)) {
            return Navigator.SceneConfigs.FloatFromRight;
        }

        return Navigator.SceneConfigs.FloatFromBottomAndroid;
    };

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

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

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
    startImage: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0,
        backgroundColor: '#f66',
        zIndex: 5,
    },
});