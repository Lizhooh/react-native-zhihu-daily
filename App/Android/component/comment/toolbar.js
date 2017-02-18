import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity as Touch,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Global from '../../Global';

// ## 评论工具栏
export default class Toolbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.left}>
                    <Touch>
                        <MaterialIcons
                            name='arrow-back'
                            color='#fff'
                            size={26}
                            />
                    </Touch>

                    <Text style={styles.text}>{
                        this.props.comments} 条评论
                    </Text>
                </View>

                <View style={styles.right}>
                    <Touch>
                        <MaterialIcons
                            name='mode-edit'
                            color='#fff'
                            size={24}
                            />
                    </Touch>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        backgroundColor: Global.themeColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 20,
        top: -1,
    },
})