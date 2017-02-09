import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';

import Slide from './slide';
import List from './list';
const window = Dimensions.get('window');

import shallowCompare from 'react-addons-shallow-compare';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.slideData = [
            { img: require('./img/a1.jpg'), title: '今天天气很好1', id: 1 },
            { img: require('./img/a2.jpg'), title: '今天天气很好2', id: 2 },
            { img: require('./img/a3.jpg'), title: '今天天气很好3', id: 3 },
            { img: require('./img/a4.jpg'), title: '今天天气很好4', id: 4 },
            { img: require('./img/a5.jpg'), title: '今天天气很好5', id: 5 },
        ];
    }

    // 性能优化
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <View style={styles.contanter}>

                <List
                    slideData={this.slideData}
                    />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
    title: {
        position: 'absolute',
        bottom: 20,
        color: '#fff',
        fontSize: 20,
        padding: 8,
        paddingBottom: 0,
    },
});

