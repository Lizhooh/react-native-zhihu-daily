import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Global from '../../Global';

export default class Editor extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        title: null,
        onBack: null,
    };

    static propTypes = {
        title: PropTypes.string,
        onBack: PropTypes.func,
    };

    render() {
        return (
            <View style={styles.toolbar}>
                <Touch
                    style={{ padding: 10 }}
                    activeOpacity={1}
                    onPress={this.props.onBack}
                    >
                    <MaterialIcons
                        name="arrow-back"
                        color="#fff"
                        size={26}
                        />
                </Touch>

                <View style={styles.title}>
                    <Text style={styles.titleText}>{
                        this.props.title
                    }</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 55,
        backgroundColor: Global.themeColor,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    title: {
        paddingHorizontal: 10,
    },
    titleText: {
        color: '#fff',
        fontSize: 20,
    },
});
