import React, { Component } from 'react';
import {
    StyleSheet, View,
    NetInfo,
    ToastAndroid as Toast,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import orientation from 'react-native-orientation';
import { color } from './config';
import Main from './main';

// views
import About from './views/about';
import Article from './views/article';
import Editor from './views/editor';
import EditorList from './views/editor-list';
import Section from './views/section';
import Setting from './views/setting';
import Appstart from './views/app-start';
import Comment from './views/comment';


// 导航相关
export default class MyNavigatior extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: true,
            nav: false,
        }

        this.views = {
            'Main': Main,
            'About': About,
            'Article': Article,
            'Editor': Editor,
            'EditorList': EditorList,
            'Section': Section,
            'Setting': Setting,
            'Comment': Comment,
        };
    }

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
                // 平滑速度
                Navigator.SceneConfigs.PushFromRight.defaultTransitionVelocity = 12;
                Navigator.SceneConfigs.PushFromRight.springFriction = 25;
                Navigator.SceneConfigs.PushFromRight.springTension = 160;
                return Navigator.SceneConfigs.PushFromRight;
        }
    };

    // 大导航
    renderScene = (route, navigator) => {
        this.navigator = navigator;
        const Views = this.views[route.name];
        return <Views data={route.data} navigator={navigator} />
    };

    netInfoChange = () => {
        if (reach === 'NONE') {
            Toast.show('当前网络不可用，请检查你的网络设置', Toast.LONG);
        }
    }

    async componentDidMount() {
        orientation.lockToPortrait();
        NetInfo.addEventListener('change', this.netInfoChange);
        await new Promise(rs => setTimeout(rs, 300));
        this.setState({ nav: true });
        await new Promise(rs => setTimeout(rs, 1200));
        this.setState({ start: false });
    }

    render() {
        const { start, startImageOpacity, nav } = this.state;

        return (
            <View style={$.container}>
                {nav && <Navigator
                    sceneStyle={{ paddingTop: 25, backgroundColor: color }}
                    initialRoute={{ name: 'Main', data: null }}
                    renderScene={this.renderScene}
                    configureScene={this.configureScene}
                    />
                }
                {start && <Appstart />}
            </View>
        );
    }
}

const $ = StyleSheet.create({
    container: {
        flex: 1,
    },
    full: {
        height: 25,
        backgroundColor: color
    }
})
