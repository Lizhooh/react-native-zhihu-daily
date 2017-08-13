import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    SectionList,
    TouchableOpacity as Touch,
    ActivityIndicator,
} from 'react-native';

import { Refresh, Box } from '../components';
import { color } from '../config';
import { getSectionName } from '../functions';

import Swiper from 'react-native-swiper';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.sectionPos = [];
        this.title = this.titlecache = '首页';

        this.cacheoffset_y = 0;

    }

    onScroll = event => {
        const offset_y = event.nativeEvent.contentOffset.y;
        // 防止频繁触发
        if (offset_y < 0) return;
        if (Math.abs(this.cacheoffset_y - offset_y) < 50) return;

        this.cacheoffset_y = offset_y;

        const s = this.sectionPos;
        for (let i = 0; i < s.length; i++) {
            if (offset_y >= s[i].position) {
                this.title = s[i].name;
            }
            else if (this.titlecache !== this.title) {
                console.log(this.title);
                this.props.onTitleChange(this.title);
                this.titlecache = this.title;
                return;
            }

            // 最后一个
            if (i === s.length - 1 && this.titlecache !== this.title) {
                console.log(this.title);
                this.props.onTitleChange(this.title);
                this.titlecache = this.title;
                return;
            }
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.render === false) return false;
        return true;
    }

    // 计算 section 的位置
    setSectionPos = () => {
        const data = this.props.data;

        if (Object.keys(data).length + 1 === this.sectionPos.length) return;

        let arr = [
            { name: '首页', position: 0 },
            { name: '今日热闻', position: 230 },
        ];

        // 今日热闻：158, 230,
        // 每个文章盒子： 121, 230 + 158 + (index - 1) * 121

        for (let i = 2, j = 1; j < data.length; i++ , j++) {
            arr.push({
                name: getSectionName(data[j].title),
                position: arr[i - 1].position + 158 + (data[j - 1].data.length - 1) * 121,
            });
        }

        this.sectionPos = arr;
    };

    renderItem = ({ item, index }) => (
        <Box item={item} index={index} onPress={this.props.onPress} />
    );

    renderSectionHeader = ({ section }) => (
        <View style={$.section}>
            <Text style={$.sectionText}>
                {getSectionName(section.title)}
            </Text>
        </View>
    );

    renderHeader = hot => (
        hot.length > 0 &&
        <View style={{ backgroundColor: '#fff', marginBottom: 10 }}>
            <Swiper
                height={220}
                horizontal={true}
                loop={true}
                autoplayTimeout={5}
                autoplay={true}
                paginationStyle={{
                    transform: [{ translateY: 9 }]
                }}
                dot={<View style={$.dot} />}
                activeDot={<View style={[$.dot, { backgroundColor: '#fff' }]} />}
                >
                {hot.map((item, index) => (
                    <View key={`hot-${index}-${item.id}`} >
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: item.image }}
                            />
                        <Touch style={$.shade}
                            activeOpacity={0.7}
                            onPress={event => this.props.onPress(item.id)}
                            >
                            <Text style={$.title}>{item.title}</Text>
                        </Touch>
                    </View>
                ))}
            </Swiper>
        </View>
    )

    render() {
        this.setSectionPos();
        const { data, refresh, hot } = this.props;

        return (
            <View style={$.contanter}>
                <SectionList
                    // legacyImplementation={true}
                    overScrollMode='never'
                    onScroll={this.onScroll}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderItem}
                    initialNumToRender={15}
                    refreshControl={
                        <Refresh onRefresh={null} refreshing={refresh || false} />
                    }
                    // removeClippedSubviews={false}
                    // renderHeader={() => this.renderHeader(hot)}
                    ListHeaderComponent={this.renderHeader(hot)}
                    renderSectionHeader={this.renderSectionHeader}
                    keyExtractor={item => item.id}
                    sections={data}
                    />
                <View style={{ height: 10 }}></View>
            </View>
        );
    }
}

const $ = StyleSheet.create({
    contanter: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sectionText: {
        color: '#666',
    },
    dot: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 6, height: 6,
        borderRadius: 6,
        marginHorizontal: 3,
    },
    shade: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0,
        backgroundColor: 'rgba(1, 1, 1, 0.4)',
    },
    title: {
        position: 'absolute',
        bottom: 14,
        color: '#fff',
        fontSize: 22,
        padding: 10,
        paddingBottom: 18,
    },
});
