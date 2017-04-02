import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ToolbarAndroid,
    TouchableOpacity as Touch,
} from 'react-native';

import { Global, MaterialIcons } from '../common';


export default ({ isHome, onActionSelected, onIconClicked }) => {

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
        <MaterialIcons.ToolbarAndroid
            style={styles.toolbar}
            title={''}
            titleColor='#fff'
            /**
             * 导航图标
             */
            navIconName='menu'
            iconSize={26}
            iconColor='#fff'

            overflowIconName='more-vert'

            /**
             * 功能组
             */
            actions={actions()}
            /**
             * 功能组菜单图标
             */
            onActionSelected={onActionSelected}
            onIconClicked={onIconClicked}
            />
    );
};

const styles = StyleSheet.create({
    toolbar: {
        height: 55,
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
    }
});