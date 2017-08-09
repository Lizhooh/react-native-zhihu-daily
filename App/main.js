import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text,
    TouchableOpacity as Touch,
    DrawerLayoutAndroid,
    Dimensions,
    ToastAndroid as Toast,
    BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import Menu from './views/menu';
const window = Dimensions.get('window');

export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    onBackAndroid = (event) => {

        if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
            this.navigator.pop();
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

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    render() {
        return (
            <DrawerLayoutAndroid
                ref={r => this.drawer = r}
                onDrawerClose={e => this.drawer.state.open = false}
                onDrawerOpen={e => this.drawer.state.open = true}
                drawerWidth={window.width * 0.7}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <Menu navigator={this.navigator} />}
                >
                <View>
                    <Text>hhhh</Text>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}