import { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    DrawerLayoutAndroid,
    Dimensions,
    Image,
} from 'react-native';

const window = Dimensions.get(window);

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

    render() {
        return (
            <View>
                <DrawerLayoutAndroid
                    keyboardDismissMode='on-drag'
                    drawerWidth={window.width * 0.75}
                    renderNavigationView={this.renderMenu}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    ref={(drawer) => this._drawer = drawer}
                    >

                </DrawerLayoutAndroid>
            </View>
        );
    }
}