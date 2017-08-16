import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text,
    TouchableOpacity as Touch,
    DrawerLayoutAndroid,
    Dimensions,
    ToastAndroid as Toast,
    BackHandler,
    ToolbarAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { mainActions } from './redux/actions';
import Menu from './views/menu';
import Home from './views/home';
import Theme from './views/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { color } from './config';
import { Toolbar } from './components';
import * as api from './api';
const window = Dimensions.get('window');

class Main extends Component {

    onBackAndroid = (event) => {

        if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
            this.props.navigator.pop();
            return true;
        }

        if (this.drawer.state.open === true) {
            this.drawer.closeDrawer();
            return true;
        }

        if (this._lastBackPressed && this._lastBackPressed + 1000 >= Date.now()) {
            return false;
        }

        this._lastBackPressed = Date.now();
        Toast.show('再按一次退出应用', Toast.SHORT);

        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        const { state, latestInit, themeInit } = this.props;
        this.props.init(state.id, state.title);
    }

    renderMenu = () => (
        <Menu navigator={navigator} onSelectChanng={(id, title) => {
            this.props.init(id, title);
            setTimeout(() => {
                this.drawer.closeDrawer();
            }, 100);
        } } />
    )

    openArticle = (id) => {
        this.props.navigator.push({ name: 'Article', data: id, animated: 'top' });
    }

    render() {
        const { navigator, updateTitle, more, refresh } = this.props;
        const { latest, title, refreshing, render, id, theme } = this.props.state;

        return (
            <DrawerLayoutAndroid
                ref={r => this.drawer = r}
                onDrawerClose={e => this.drawer.state.open = false}
                onDrawerOpen={e => this.drawer.state.open = true}
                drawerWidth={window.width * 0.7}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={this.renderMenu}
                >
                <Toolbar
                    title={title}
                    isHome={id === -1}
                    onIconClicked={() => this.drawer.openDrawer()}
                    onActionSelected={position => {
                        position === 2 && navigator.push({ name: 'Setting' });
                        position === 3 && navigator.push({ name: 'About' });
                    } }
                    />
                <View style={{ flex: 1 }}>
                    {/* 用来覆盖 Toolbar */}
                    <View style={$.otherToolbar}>
                        <Text style={$.otherToolbarText}>{title}</Text>
                    </View>
                    {id === -1 ?
                        <Home
                            data={latest.data}
                            hot={latest.hot}
                            onTitleChange={updateTitle}
                            refresh={refreshing}
                            onRefresh={refresh}
                            render={render}
                            onPress={this.openArticle}
                            onMore={e => !latest.data.empty() && more(latest.data.last().title)
                                .then(res => res.stories.empty() && Toast.show('没有更多了', Toast.LONG))}
                            />
                        :
                        <Theme
                            data={theme.data}
                            source={theme.source}
                            refresh={refreshing}
                            onRefresh={refresh}
                            onPress={this.openArticle}
                            onMore={e => !theme.data.empty() && more(theme.data.last().id)
                                .then(res => res.stories.empty() && Toast.show('没有更多了', Toast.LONG))}
                            openEditor={list => navigator.push({ data: list, name: 'EditorList' })}
                            />
                    }
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

export default connect(
    state => ({ state: state.main }),
    mainActions
)(Main);

const $ = StyleSheet.create({
    contanter: {
        flex: 1,
        backgroundColor: color,
    },
    full: {
        flex: 1,
    },
    otherToolbar: {
        height: 55,
        backgroundColor: color,
        position: 'absolute',
        top: -55,
        left: 0, right: 0,
        zIndex: -1,
        justifyContent: 'center',
    },
    otherToolbarText: {
        color: '#fff',
        fontSize: 21,
        marginLeft: 60,
        fontWeight: '400',
        includeFontPadding: false,
        textAlignVertical: 'center',
    }
});
