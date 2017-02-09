import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    DrawerLayoutAndroid,
    Dimensions,
    Image,
    Text,
    ToolbarAndroid,
    TouchableOpacity as Touch,
} from 'react-native';

import shallowCompare from 'react-addons-shallow-compare';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Global from '../../Global';
import Menu from '../menu/menu';
import Toolbar from './toolbar';
import Home from '../home/home';

const window = Dimensions.get('window');


// ## 抽屉菜单
export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // -1 是首页, 其他为主题的 id
            activeMainView: {
                id: -1,
                name: '首页',
            },

            // 缓存数据
            data: null,
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
            navigator={this.props.navigator}
            drawer={this._drawer}
            onSelectChanng={(event, id, name) => {
                this._drawer.closeDrawer();

                requestAnimationFrame(() => {
                    this.setState({
                        activeMainView: { id, name }
                    });
                });
            } }
            />
    );

    renderMainView = (data) => {
        // request => update this.state.data

        if (this.state.activeMainView.id === -1) {
            return <Home />
        }
        return null;
    };

    componentDidMount() {
        this._drawer.openDrawer();
    }

    componentWillUnmount() {
        this._drawer.closeDrawer();
    }

    // 性能优化
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <View style={styles.contanter}>
                <DrawerLayoutAndroid
                    keyboardDismissMode='on-drag'
                    drawerWidth={window.width * 0.75}
                    renderNavigationView={this.renderMenu}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    ref={(drawer) => this._drawer = drawer}
                    >

                    <Toolbar
                        isHome={this.state.activeMainView.id === -1}
                        onIconClicked={() => this._drawer.openDrawer()}
                        onActionSelected={null}
                        />

                    <View style={{ flex: 1 }}>
                        {/* 用来覆盖 */}
                        <View style={styles.otherToolbar}>
                            <Text style={styles.otherToolbarText}>{
                                this.state.activeMainView.name
                            }</Text>
                        </View>

                        {
                            // 根据 activeMainView 来渲染主视图
                            this.renderMainView(this.state.activeMainView)
                        }

                    </View>

                </DrawerLayoutAndroid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
    toolbar: {
        height: 55,
        backgroundColor: 'rgba(30, 150, 255, 0.0)',
    },
    otherToolbar: {
        height: 55,
        backgroundColor: Global.themeColor,
        position: 'absolute',
        top: -55,
        left: 0, right: 0,
        zIndex: -1,
        justifyContent: 'center',
    },
    otherToolbarText: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 60,
        fontWeight: '100',
    }
});
