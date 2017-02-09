import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity as Touch,
    Dimensions,
} from 'react-native';

import ViewPager from 'react-native-viewpager';

const data = [
    { img: require('./img/a1.jpg'), title: '今天天气很好1', id: 1 },
    // { img: require('./img/a2.jpg'), title: '今天天气很好2', id: 2 },
    // { img: require('./img/a3.jpg'), title: '今天天气很好3', id: 3 },
    // { img: require('./img/a4.jpg'), title: '今天天气很好4', id: 4 },
    // { img: require('./img/a5.jpg'), title: '今天天气很好5', id: 5 },
];

const window = Dimensions.get('window');


// 轮播图，幻灯片
export default class Slide extends Component {

    constructor(props) {
        super(props);

        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });

        this.state = {
            dataSource: dataSource.cloneWithPages(data),
        };
    }

    static defaultProps = {
        height: 220,
        width: window.width,
    };

    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
    };

    renderPage = (data, position) => (
        <View>
            <Image
                style={{ width: window.width, height: 220 }}
                source={data.img}
                resizeMode="cover"
                />
            <View style={styles.shade}>
                <Text style={styles.title}>
                    {data.title}
                </Text>
            </View>
        </View>
    );

    render() {
        return (
            <View style={{ height: this.props.height, width: this.props.width }}>{
                data.length > 1 ?
                    <ViewPager
                        dataSource={this.state.dataSource}
                        renderPage={this.renderPage}
                        isLoop={true}
                        autoPlay={true}
                        time={7000}
                        />
                    :
                    <View collapsable={true}>
                        <Image
                            style={{ width: window.width, height: 220 }}
                            source={data[0].img}
                            resizeMode="cover"
                            />
                        <View style={styles.shade}>
                            <Text style={styles.title}>
                                {data[0].title}
                            </Text>
                        </View>
                    </View>
            }</View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
    shade: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0,
        backgroundColor: 'rgba(1, 1, 1, 0.2)',
    },
    title: {
        position: 'absolute',
        bottom: 0,
        color: '#fff',
        fontSize: 20,
        padding: 8,
        paddingBottom: 18,
    },
});

