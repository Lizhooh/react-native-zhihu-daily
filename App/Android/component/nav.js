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
import Section from './section/section';

import { Global } from './common';

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

        if (route.id === 9 && route.title === '合集') {
            return <Section navigator={navigator} data={route.data} />
        }

        return null;
    };

    configureScene = (route, routeStack) => {
        if ([5, 6, 7].some(i => route.id === i)) {
            return Navigator.SceneConfigs.PushFromRight;
        }

        return Navigator.SceneConfigs.FloatFromBottomAndroid;
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
        paddingTop: 25,
        backgroundColor: Global.themeColor,
    },
    startImage: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0,
        backgroundColor: '#f66',
        zIndex: 5,
    },
});