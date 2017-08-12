import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    ScrollView,
} from 'react-native';

import { Topbar } from '../components';
import { color } from '../config';

export default ({ navigator }) => (
    <View style={$.container}>
        <Topbar title="关于" onBack={() => navigator.pop()} />
        <ScrollView
            style={$.body}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            >
            <View style={$.row}>
                <Text style={$.subtitle}>简要：</Text>
                <View style={$.content}>
                    <Text style={$.contentText}>
                        基于 React Native 实现的《橙色·知乎日报》App，
                            除了敏感的功能（登录，分享等）外，
                            实现了与官方的《知乎日报》保持着一致的 UI 体验。
                            数据来自于知乎日报，数据版权知乎日报所有。
                        </Text>
                </View>
            </View>

            <View style={$.row}>
                <Text style={$.subtitle}>开源：</Text>
                <View style={$.content}>
                    <Text style={{ color: '#555' }}>此项目开源在 Github 上，仅限于个人兴趣与学习。</Text>
                    <Text style={$.link}>https://github.com/lizhooh/react-native-zhihu-daily</Text>
                </View>
            </View>

            <View style={$.row}>
                <Text style={$.subtitle}>开发：</Text>
                <View>
                    <View style={$.content}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../resource/avatar.png')} style={$.avatar} />
                            <Text style={{ color: '#555' }}>  Lizhooh</Text>
                        </View>
                        <Text style={$.contentText}>
                            计算机科学专业，前端开发工程师，专注于研究：{'\n'}
                            Web 前端，Nodejs 后端开发，混合式移动应用开发，Javascript 全栈式开发，数据挖掘与可视化，深度学习 等前沿技术。
                            </Text>
                        <Text style={$.contentText}>
                            个人技术博客：
                                <Text style={$.link}>http://me.lizhooh.com</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
);

const $ = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
    },
    row: {
        marginVertical: 20,
    },
    subtitle: {
        color: '#222',
        marginVertical: 5,
        fontSize: 16,
    },
    content: {
        borderLeftColor: color,
        borderLeftWidth: 2,
        marginLeft: 6,
        paddingLeft: 5,
        marginVertical: 5,
        justifyContent: 'center',
    },
    contentText: {
        lineHeight: 23,
        color: '#555',
        textAlignVertical: 'center',
    },
    link: {
        color: color,
        fontWeight: '300',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 30,
    }
});
