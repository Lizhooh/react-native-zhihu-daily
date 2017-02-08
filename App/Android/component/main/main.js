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

// ## 抽屉菜单
export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        navigator: null,
    };

    static propTypes = {
        navigator: PropTypes.object.isRequired,
    };

    renderMenu = () => (
        <View>
            <Text>AAAA</Text>
        </View>
    );

    render() {
        return (
            <View style={styles.contanter}>
                <DrawerLayoutAndroid
                    keyboardDismissMode='on-drag'
                    drawerWidth={window.width * 0.65}
                    renderNavigationView={this.renderMenu}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    ref={(drawer) => this._drawer = drawer}
                    >

                    <Touch
                        onPress={() => this._drawer.openDrawer()}
                        >
                        <Text>open</Text>
                    </Touch>

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