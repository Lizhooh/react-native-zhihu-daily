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
import Icon from 'react-native-vector-icons/MaterialIcons';

import { color } from './config';
import { Toolbar } from './components';
const window = Dimensions.get('window');

import * as api from './api';

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
        this.props.init();
    }

    render() {
        const { navigator, updateTitle } = this.props;
        const { latest, title, refresh, render } = this.props.state;

        return (
            <DrawerLayoutAndroid
                ref={r => this.drawer = r}
                onDrawerClose={e => this.drawer.state.open = false}
                onDrawerOpen={e => this.drawer.state.open = true}
                drawerWidth={window.width * 0.7}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <Menu navigator={navigator} />}
                >
                <Toolbar
                    title={title}
                    isHome={true}
                    onIconClicked={() => this.drawer.openDrawer()}
                    onActionSelected={position => {
                        position === 3 && navigator.push({ name: 'About' });
                    } }
                    />
                <View style={{ flex: 1 }}>
                    {/* 用来覆盖 Toolbar */}
                    <View style={$.otherToolbar}>
                        <Text style={$.otherToolbarText}>{title}</Text>
                    </View>
                    <Home
                        data={latest.data}
                        hot={latest.hot}
                        onTitleChange={updateTitle}
                        refresh={refresh}
                        render={render}
                        onPress={id => navigator.push({ name: 'Article', data: id, animated: 'top' })}
                        />
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
        fontSize: 22,
        marginLeft: 60,
        fontWeight: '100',
        includeFontPadding: false,
        textAlignVertical: 'center',
    }
});
