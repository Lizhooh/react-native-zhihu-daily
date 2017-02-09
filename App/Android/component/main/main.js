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
import Other from './../other/other';
import Api from '../../../Server/api';

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
            menu_data: null,
            home_data: null,
            other_data: null,
        };

        this.requestAnimationFrame = requestAnimationFrame;
        this.request.themes();
        this.request.latest();
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
            data={this.state.menu_data}
            navigator={this.props.navigator}
            onSelectChanng={(event, id, name) => {
                this._drawer.closeDrawer();

                if (id === this.state.activeMainView.id) return;

                this.requestAnimationFrame(() => {
                    this.request.theme(id);
                });

                this.setState({
                    activeMainView: { id, name }
                });
            } }
            />
    );

    renderMainView = (data) => {
        // request => update this.state.data

        if (this.state.activeMainView.id === -1) {
            return <Home data={this.state.home_data} navigator={this.props.navigator} />
        }
        else if (this.state.activeMainView.id > 0) {
            return <Other data={this.state.other_data} navigator={this.props.navigator} />
        }

        return null;
    };

    // 网络请求
    request = {
        themes: () => {
            Api.themes.get().then((result) => {
                this.setState({ menu_data: result });
            });
        },
        latest: () => {
            Api.latest.get().then((result) => {
                this.setState({ home_data: result });
            });
        },
        theme: (id) => {
            Api.theme.get(id).then((result) => {
                this.setState({ other_data: result });
            });
        }
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

    get title() {
        return this.state.activeMainView.name;
    };

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
                                this.title
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
