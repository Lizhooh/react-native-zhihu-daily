import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';

import Toolbar from './toolbar';
import { Global } from '../common';
import avatar from './img/avatar.png';

export default ({navigator}) => (
    <View style={styles.container}>
        <Toolbar title="关于" onBack={() => navigator.pop()} />
        <ScrollView
            style={styles.body}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            >
            <View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.subtitle}>简要：</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>
                            基于 React Native 实现的《橙色·知乎日报》App，
                            除了敏感的功能（登录，分享等）外，
                            实现了与官方的《知乎日报》保持着一致的 UI 体验。
                            数据来自于知乎日报，数据版权知乎日报所有。
                        </Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.subtitle}>开源：</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={{ color: '#555' }}>此项目开源在 Github 上，仅限于个人兴趣与学习。</Text>
                        <Text style={styles.link}>https://github.com/lizhooh/react-native-zhihu-daily</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.subtitle}>开发：</Text>
                    </View>

                    <View>
                        <View style={styles.content}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={avatar} style={styles.avatar} />
                                <Text style={{ color: '#555' }}>  Lizhooh</Text>
                            </View>
                            <Text style={styles.contentText}>
                                计算机科学专业，前端开发工程师，研究方向：
                                HTML5，CSS3，Javascript，Java，Vue，
                                React，React Native，Node.js，MongoDB，
                                移动开发，Web开发，数据分析，等前沿技术。
                            </Text>
                            <Text style={styles.contentText}>
                                个人技术博客：
                                <Text style={styles.link}>http://blog.lizhooh.top</Text>
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
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
        borderLeftColor: Global.themeColor,
        borderLeftWidth: 2,
        marginLeft: 6,
        paddingLeft: 5,
        marginVertical: 5,

    },
    contentText: {
        lineHeight: 23,
        color: '#555',
    },
    link: {
        color: Global.themeColor,
        fontWeight: '300',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 30,
    }
});