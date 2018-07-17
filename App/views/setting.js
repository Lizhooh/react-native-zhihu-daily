import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';
import { Topbar, Make, SelectBox } from '../components';

export default class Setting extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={$.container}>
                <Topbar title='设置' onBack={this.props.navigator.pop} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ padding: 15 }}
                    overScrollMode='never'
                    >

                    <Make title='常规' />
                    <SelectBox text='自动离线下载' subText='仅 Wi-Fi 下可用，自动下载最新内容' />
                    <SelectBox text='无图模式' subText='2G/3G 网络下不下载图片' />
                    <SelectBox text='大字号' />

                    <Make title='其他' />
                    <SelectBox text='推送消息' isChecked={true} />
                    <SelectBox text='点评分享到微博' />
                    <SelectBox text='清除缓存' showCheck={false} />

                    <Make title='反馈' />
                    <SelectBox text='意见反馈' showCheck={false} />

                </ScrollView>
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
