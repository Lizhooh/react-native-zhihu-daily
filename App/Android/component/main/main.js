import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    DrawerLayoutAndroid,
    Dimensions,
    Image,
    Text,
    TouchableOpacity as Touch,
} from 'react-native';

const window = Dimensions.get('window');

import Menu from '../menu/menu';

// ## 抽屉菜单
export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeMainView: { // -1 是首页, 其他为主题的 id
                id: -1,
                name: '首页',
            },
        };
    }

    static defaultProps = {
        navigator: null,
    };

    static propTypes = {
        navigator: PropTypes.object.isRequired,
    };

    renderMenu = () => (
        // 菜单视图
        <Menu
            onSelectChanng={(event, id, name) => {
                // ok
                this.setState({ activeMainView: { id, name } });
            } }
            />
    );

    renderMainView = (data) => {

    };

    componentDidMount() {
        this._drawer.openDrawer();
    }

    componentWillUnmount() {
        this._drawer.closeDrawer();
    }

    render() {
        return (
            <View style={styles.contanter}>
                <DrawerLayoutAndroid
                    keyboardDismissMode='on-drag'
                    drawerWidth={window.width * 0.8}
                    renderNavigationView={this.renderMenu}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    ref={(drawer) => this._drawer = drawer}
                    >

                    <View>{
                        // 根据 activeMainView 来渲染视图
                        this.renderMainView(this.state.activeMainView)
                    }</View>

                </DrawerLayoutAndroid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
});