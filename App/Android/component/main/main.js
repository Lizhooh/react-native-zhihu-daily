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

import Menu from '../menu/menu';
import Toolbar from './toolbar';
import Home from '../home/home';
import Other from './../other/other';
import { Api, Ionicons } from '../common';
import { styles } from './style/main-style';

const window = Dimensions.get('window');

// ## 抽屉菜单
export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // -1 是首页, 其他为主题的 id
            activeMain: {
                id: -1,
                name: '首页',
            },

            // 缓存数据
            menu: {
                data: null
            },
            home: {
                data: null,
                /*{
                    date1-0: [],
                    date2-1: [],
                    date3-2: [],
                }*/
                nomore: false,
                lastdate: 0,
                title: '首页',
            },
            other: {
                data: null,
                /*{
                    date: '',
                    stories: [],
                }*/
                laststoryid: 0,
                nomore: false,
            },
        };

        this._last = {
            lastdate: 0,
            laststoryid: 0,
        };

        Promise.all([
            this.request.themes(),
            this.request.latest(),
            this.request.theme(13),
        ]);
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
            data={this.state.menu.data}
            navigator={this.props.navigator}
            onSelectChanng={(event, id, name) => {
                this._drawer.closeDrawer();

                if (id === this.state.activeMain.id) return;

                this._timer = setTimeout(() => {
                    id === - 1 ?
                        this.request.latest() :
                        this.request.theme(id);
                }, 0);

                if (id === -1) this.state.home.title = '首页';

                this.setState({
                    activeMain: { id, name }
                });
            } }
            />
    );

    renderMainView = () => (
        this.state.activeMain.id === -1 ?
            <Home
                data={this.state.home.data}
                topStories={this.state.home.topStories}
                navigator={this.props.navigator}
                onTitleChange={(event, title) => {
                    if (title === undefined || this.state.home.title === title) return;

                    let home = this.state.home;
                    home.title = title;
                    this.setState({ home: home });
                } }
                onRefresh={event => {
                    this.request.latest();
                } }
                onMore={event => {
                    // 加载更多
                    const home = this.state.home;
                    const lastdate = Object.keys(home.data).sort((a, b) => b - a).pop();

                    if (lastdate != this._last.lastdate && !home.nomore) {
                        this.request.homeMore(lastdate.split('-')[0]);
                        this._last.lastdate = lastdate; // 防止重复加载
                    }
                } }
                />
            :
            <Other
                data={this.state.other.data}
                navigator={this.props.navigator}
                onRefresh={event => {
                    const id = this.state.activeMain.id;
                    id > 0 && this.request.theme(id);
                } }
                onMore={event => {
                    // 加载更多
                    if (!this.state.other.data) return;

                    const other = this.state.other;
                    const stories = other.data.stories;
                    const lastid = stories[stories.length - 1].id;
                    const themeid = this.state.activeMain.id;

                    if (this._last.laststoryid !== lastid && !other.nomore) {
                        this.request.themeMore(themeid, lastid);
                        this._last.laststoryid = lastid; // 防止重复加载
                    }
                } }
                />
    );

    // 网络请求
    request = {
        themes: () => {
            Api.themes.get().then((result) => {
                this.setState({ menu: { data: result } });
            });
        },
        latest: () => {
            Api.latest.get().then((result) => {
                let home = this.state.home;
                home.topStories = result.top_stories || [];
                home.data = {};
                home.data[result.date + '-0'] = result.stories;
                this._last.lastdate = 0;
                this.setState({ home: home });
            });
        },
        theme: (id) => {
            Api.theme.get(id).then((result) => {
                let other = this.state.other;
                other.data = result;
                this._last.laststoryid = 0;
                this.setState({ other: other });
            });
        },
        themeMore: (themeid, storyid) => {
            Api.themeMore.get(themeid, storyid).then((result) => {
                let other = this.state.other;
                if (result.stories.length === 0) {
                    other.nomore = true;
                    this.setState({ other: other });
                    return;
                }
                const interim = other.data;
                interim.stories = interim.stories.concat(result.stories);
                other.data = interim;
                this._last.laststoryid = 0;
                this.setState({ other: other });
            });
        },
        homeMore: (lastDate) => {
            Api.homeMore.get(lastDate).then((result) => {
                let home = this.state.home;
                if (result.stories.length === 0) {
                    home.nomore = true;
                    this.setState({ home: home });
                    return;
                }
                const index = Object.keys(home.data).length;
                home.data[result.date + `-${index}`] = result.stories;
                this._last.lastdate = 0;
                this.setState({ home: home });
            });
        },
    };

    componentDidMount() {
        // this._drawer.openDrawer();
    }

    componentWillUnmount() {
        this._drawer.closeDrawer();
        this._timer && clearTimeout(this._timer);
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
                        isHome={this.state.activeMain.id === -1}
                        onIconClicked={() => this._drawer.openDrawer()}
                        onActionSelected={position => {
                            if (position === 3) {
                                this.props.navigator.push({
                                    id: 7,
                                    title: '关于',
                                    data: {},
                                });
                            }
                        } }
                        />

                    <View style={{ flex: 1 }}>
                        {/* 用来覆盖 Toolbar */}
                        <View style={styles.otherToolbar}>
                            <Text style={styles.otherToolbarText}>{
                                this.state.activeMain.id === -1 ?
                                    this.state.home.title :
                                    this.state.activeMain.name
                            }</Text>
                        </View>

                        {
                            // 根据 activeMain 来渲染主视图
                            this.renderMainView()
                        }

                    </View>

                </DrawerLayoutAndroid>
            </View>
        );
    }
}
