import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    ScrollView,
    TouchableOpacity as Touch,
    ActivityIndicator,
} from 'react-native';

import shallowCompare from 'react-addons-shallow-compare';
import Slide from './slide';
import Global from '../../Global';

const data = [
    { img: require('./img/a1.jpg'), title: '今天天气很好1', id: 1 },
    { img: require('./img/a2.jpg'), title: '今天天气很好2', id: 2 },
    { img: '', title: '今天天气很好3', id: 3 },
    { img: require('./img/a4.jpg'), title: '今天天气很好4', id: 4 },
    { img: require('./img/a5.jpg'), title: '今天天气很好5', id: 5 },
    { img: require('./img/a1.jpg'), title: '今天天气很好1', id: 1 },
    { img: require('./img/a2.jpg'), title: '今天天气很好2', id: 2 },
    { img: '', title: '今天天气很好3', id: 3 },
    { img: require('./img/a4.jpg'), title: '今天天气很好4', id: 4 },
    { img: require('./img/a5.jpg'), title: '今天天气很好5', id: 5 },
];

export default class List extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        slideData: null,
    };

    static propTypes = {
        slideData: PropTypes.array.isRequired,
    };

    renderRow = (data, sectionID, rowID, highlightRow) => (
        <View style={styles.box} key={`list-${rowID}`}>
            <Touch
                activeOpacity={0.7}
                style={styles.touch}
                onPress={null}
                >
                <View style={styles.left}>
                    <Text style={styles.leftTitle}>{data.title}</Text>
                </View>
                {
                    !!data.img && <View style={styles.right}>
                        <Image source={data.img} style={styles.rightImg} />
                    </View>
                }
            </Touch>
        </View>
    );

    getDataSource = () => {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        return ds.cloneWithRows(data);
    };

    renderHeader = () => (
        <View style={{ marginBottom: 20 }}>
            <Slide data={this.props.slideData} />
        </View>
    );

    renderFooter = () => (
        <View style={{ margin: 10 }}>
            <ActivityIndicator
                animating={true}
                color={Global.themeColor}
                size={'large'}
                />
        </View>
    );


    // 性能优化
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <View style={styles.contanter}>
                <ListView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    renderRow={this.renderRow}
                    renderHeader={this.renderHeader}
                    renderFooter={this.renderFooter}
                    dataSource={this.getDataSource()}
                    initialListSize={10}
                    pageSize={1}
                    scrollRenderAheadDistance={100}
                    // 滚动刷新
                    onEndReachedThreshold={500}
                    onEndReached={() => {

                    } }
                    >
                </ListView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    box: {
        backgroundColor: '#ccc',
        margin: 10,
        marginHorizontal: 15,
        borderRadius: 3,
        paddingBottom: 1,
    },
    touch: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 3,
        minHeight: 80,
    },
    left: {
        flex: 1,
    },
    leftTitle: {
        fontSize: 18,
        color: '#333',
    },
    right: {
        width: 100,
        height: 80,
    },
    rightImg: {
        width: 100,
        height: 80,
        borderRadius: 2,
    },
});

