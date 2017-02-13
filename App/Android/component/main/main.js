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
import Menu from '../menu/menu';
import Toolbar from './toolbar';
import Home from '../home/home';
import Other from './../other/other';
import Api from '../../../Server/api';
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
                    date1: [],
                    date2: [],
                    date3: [],
                }*/
                laststoryid: 0,
                nomore: false,
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
            data={this.state.menu.data}
            navigator={this.props.navigator}
            onSelectChanng={(event, id, name) => {
                this._drawer.closeDrawer();

                if (id === this.state.activeMain.id) return;

                this._timer = setTimeout(() => {
                    id === - 1 ?
                        this.request.themes() :
                        this.request.theme(id);
                }, 0);

                this.setState({
                    activeMain: { id, name }
                });
            } }
            />
    );

    renderMainView = (data) => (
        this.state.activeMain.id === -1 ?
            <Home
                data={this.state.home.data}
                topStories={this.state.home.topStories}
                navigator={this.props.navigator}
                onTitleChange={(event, title) => {
                    if (title === undefined) return;

                    let home = this.state.home;
                    home.title = title;
                    this.setState({ home: home });
                } }
                onRefresh={event => {
                    this.request.latest();
                } }
                onMore={event => {

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

                    if (other.laststoryid !== lastid && !other.nomore) {
                        this.request.themeMore(themeid, lastid);
                        other.laststoryid = lastid;
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
                let home = {
                    title: '首页',
                    data: {},
                    topStories: result.top_stories || [],
                };
                home.data[result.date] = result.stories;

                this.setState({ home: home });
            });
        },
        theme: (id) => {
            Api.theme.get(id).then((result) => {
                this.setState({ other: { data: result } });
            });
        },
        themeMore: (themeid, storyid) => {
            Api.themeMore.get(themeid, storyid).then((result) => {
                // 没有更多了
                if (result.stories.length === 0) {
                    this.setState({ other: { nomore: true } });
                    return;
                }

                const interim = this.state.other.data;
                interim.stories = interim.stories.concat(result.stories);

                let other = this.state.other;
                other.data = interim;

                this.setState({
                    other: other,
                });
            });
        },
    };

    componentDidMount() {
        this._drawer.openDrawer();
    }

    componentWillUnmount() {
        this._drawer.closeDrawer();
        this._timer && clearTimeout(this._timer);
    }

    // 性能优化
    // shouldComponentUpdate(nextProps, nextState) {
    //     return shallowCompare(this, nextProps, nextState);
    // }

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
                        onActionSelected={null}
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
                            this.renderMainView(this.state.activeMain)
                        }

                    </View>

                </DrawerLayoutAndroid>
            </View>
        );
    }
}
