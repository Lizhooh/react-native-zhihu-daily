import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text,
    ToolbarAndroid,
    TouchableOpacity as Touch,
} from 'react-native';
import { color } from '../config';
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * 工具栏
 */
export default ({ title, isHome, onActionSelected, onIconClicked }) => {

    const actions = () => {
        return isHome === true ?
            // 首页
            [
                { "title": "消息", "iconName": "notifications", "show": "always", "iconSize": 25, "iconColor": "#fff" },
                { "title": "夜间模式", "show": "never" },
                { "title": "设置选项", "show": "never" },
                { "title": "关于", "show": "never" },
            ]
            // 其他
            :
            [
                { "title": "消息", "iconName": "add-circle-outline", "show": "always", "iconSize": 25, "iconColor": "#fff" },
            ];
    };

    return (
        <Icon.ToolbarAndroid
            style={$.toolbar}
            titleColor='#fff'
            navIconName='menu'
            iconSize={28}
            iconColor='#fff'
            overflowIconName='more-vert'
            actions={actions()}
            onActionSelected={onActionSelected}
            onIconClicked={onIconClicked}
            />
    );
};

const $ = StyleSheet.create({
    toolbar: {
        height: 55,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    }
});
