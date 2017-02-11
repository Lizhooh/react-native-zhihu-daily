import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ToolbarAndroid,
    TouchableOpacity as Touch,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Global from '../../Global';


export default class Toolbar extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        isHome: true,
        onActionSelected: null,
        onIconClicked: null,
    };

    static propTypes = {
        isHome: PropTypes.bool,
        onActionSelected: PropTypes.func,
        onIconClicked: PropTypes.func,
    };

    actions = () => {
        return this.props.isHome === true ?
            // 首页
            [
                { "title": "消息", "iconName": "notifications", "show": "always", "iconSize": 25, "iconColor": "#fff" },
                { "title": "夜间模式", "show": "never" },
                { "title": "设置选项", "show": "never" },
            ]
            // 其他
            :
            [
                { "title": "消息", "iconName": "add-circle-outline", "show": "always", "iconSize": 25, "iconColor": "#fff" },
            ];
    };

    render() {
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

                // overflowIconName='md-more'
                overflowIconName='more-vert'

                /**
                 * 功能组
                 */
                actions={this.actions()}
                /**
                 * 功能组菜单图标
                 */
                onActionSelected={this.props.onActionSelected}
                onIconClicked={this.props.onIconClicked}
                />
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 55,
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
    }
});