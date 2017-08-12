import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
} from 'react-native';
import ViewPager from '../lib/view-pager/ViewPager';

// 轮播图，幻灯片
export default class Swiper extends Component {

    constructor(props) {
        super(props);

        const ds = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });

        this.state = {
            dataSource: ds.cloneWithPages(this.props.data),
        };
    }

    renderPage = (data, position) => (
        <View collapsable={true}>
            <Image
                style={{ width: '100%', height: '100%' }}
                source={{ uri: data.image }}
                resizeMode="cover"
                />
            <Touch
                activeOpacity={0.7}
                style={$.shade}
                onPress={event => this.props.onPress(event, data.id)}
                >
                <Text style={$.title}>
                    {data.title}
                </Text>
            </Touch>
        </View>
    );

    render() {
        const { height = 220, width = '100%', data = [], onPress = () => { } } = this.props;
        return (
            <View style={{ height: height, width: width }}>{
                data.length > 1 ?
                    <ViewPager
                        dataSource={this.state.dataSource}
                        renderPage={this.renderPage}
                        isLoop={false}
                        autoPlay={true}
                        time={6000}
                        />
                    :
                    <View collapsable={true}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: data[0].image }}
                            resizeMode="cover"
                            />
                        <Touch
                            style={styles.shade}
                            onPress={event => onPress(event, data.id)}
                            >
                            <Text style={styles.title}>{data[0].title}</Text>
                        </Touch>
                    </View>
            }</View>
        );
    }
}

const $ = StyleSheet.create({
    contanter: {
        flex: 1,
    },
    shade: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0,
        backgroundColor: 'rgba(1, 1, 1, 0.4)',
    },
    title: {
        position: 'absolute',
        bottom: 3,
        color: '#fff',
        fontSize: 22,
        padding: 10,
        paddingBottom: 18,
    },
});

