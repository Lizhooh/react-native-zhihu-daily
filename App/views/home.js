import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    SectionList,
    TouchableOpacity as Touch,
    ActivityIndicator,
} from 'react-native';

import { Refresh } from '../components';
import { color } from '../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
        <View style={styles.box}>
            <Touch
                activeOpacity={0.7}
                style={styles.touch}
                onPress={e => this.props.onPress(item.id)}
                >
                <View style={styles.left}>
                    <Text style={styles.leftTitle}>{item.title}</Text>
                </View>
                {!!item.images &&
                    <View style={styles.right}>
                        <Image
                            source={{ uri: item.images[0] }}
                            style={styles.rightImg}
                            />
                        {item.multipic &&
                            <View style={styles.multipic}>
                                <Icon name="filter-none" size={11} color="#fff" />
                                <Text style={styles.multipicText}>多图</Text>
                            </View>
                        }
                    </View>
                }
            </Touch>
        </View>
    );

    renderSectionHeader = ({ section }) => (
        <View style={styles.section}>
            <Text style={styles.sectionText}>
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
                dot={<View style={styles.dot} />}
                activeDot={<View style={[styles.dot, { backgroundColor: '#fff' }]} />}
                >
                {hot.map((item, index) => (
                    <View key={`hot-${index}-${item.id}`} >
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: item.image }}
                            />
                        <Touch style={styles.shade}
                            activeOpacity={0.7}
                            // onPress={event => onPress(event, data.id)}
                            >
                            <Text style={styles.title}>{item.title}</Text>
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
            <View style={styles.contanter}>
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

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    box: {
        backgroundColor: '#ddd',
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
        paddingRight: 10,
        borderRadius: 3,
        minHeight: 80,
    },
    left: {
        flex: 1,
        paddingRight: 5,
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
    multipic: {
        position: 'absolute',
        bottom: 0, right: 0,
        backgroundColor: 'rgba(1, 1, 1, 0.6)',
        flexDirection: 'row',
        padding: 3,
        alignItems: 'center',
    },
    multipicText: {
        fontSize: 11,
        color: '#fff',
        marginLeft: 3,
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 1,
        textShadowColor: 'rgba(1, 1, 1, 0.6)',
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
