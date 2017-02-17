import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity as Touch,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import shallowCompare from 'react-addons-shallow-compare';
import Slide from './slide';
import Global from '../../Global';
import { styles } from './style/list-style';

export default class List extends Component {

    constructor(props) {
        super(props);

        this.sectionPos = [];
        this.title = '首页';

        this.cacheoffset_y = 0;

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
    }

    static defaultProps = {
        data: null,
        openArticle: () => { },
        onRefresh: () => { },
        onTitleChange: () => { },
        onMore: () => { },
    };

    static propTypes = {
        data: PropTypes.object.isRequired,
        openArticle: PropTypes.func.isRequired,
        onRefresh: PropTypes.func,
        onTitleChange: PropTypes.func.isRequired,
        onMore: PropTypes.func.isRequired,
    };

    getDataSource = () => {
        return this.ds.cloneWithRowsAndSections(this.props.data);
    };

    // 对时间进行格式化
    getSectionName = (_date) => {
        _date = _date.split('-')[0];
        let D = new Date();

        const fmt = (n) => n < 10 ? '0' + n : n;

        let
            _y = _date.slice(0, 4) * 1,
            _m = _date.slice(4, 6) * 1,
            _d = _date.slice(6) * 1,
            _week = '日一二三四五六'.charAt(new Date(_y, _m, _d).getDay()),

            y = D.getFullYear(),
            m = fmt(D.getMonth() + 1),
            d = fmt(D.getDate());

        let date = `${y}${m}${d}`;

        if (_date === date) {
            return '今日热闻';
        }
        else {
            if (_m === -1) return '';

            return `${fmt(_m)}月${fmt(_d)}日 星期${_week}`;
        }
    };

    renderSection = (sectionID, rowID) => {
        if (rowID * 1 === 0) {
            return (
                <View style={styles.section}>
                    <Text style={styles.sectionText}>
                        {this.getSectionName(sectionID)}
                    </Text>
                </View>
            );
        }

        return null;
    }

    renderRow = (data, sectionID, rowID, highlightRow) => (
        <View>
            {this.renderSection(sectionID, rowID)}

            <View style={styles.box} key={`list-${rowID}`}>
                <Touch
                    activeOpacity={0.7}
                    style={styles.touch}
                    onPress={event => this.props.openArticle(event, data.id)}
                    >
                    <View style={styles.left}>
                        <Text style={styles.leftTitle}>{data.title}</Text>
                    </View>
                    {
                        // 右边的小图片
                        !!data.images && <View style={styles.right}>
                            <Image
                                source={{ uri: data.images[0] }}
                                style={styles.rightImg}
                                />
                            {
                                // 多图
                                data.multipic &&
                                <View style={styles.multipic}>
                                    <MaterialIcons
                                        name="filter-none"
                                        size={11}
                                        color="#fff"
                                        />
                                    <Text style={styles.multipicText}>
                                        多图
                                        </Text>
                                </View>
                            }
                        </View>
                    }
                </Touch>
            </View>
        </View>
    );

    renderHeader = () => (
        <View style={{ marginBottom: 10 }}>
            <Slide
                data={this.props.topStories}
                onPress={this.props.openArticle}
                />
        </View>
    );

    renderFooter = () => (
        <View style={{ margin: 10 }}>

        </View>
    );

    get refreshControl() {
        return (
            <RefreshControl
                enabled={true}
                refreshing={false}
                onRefresh={this.props.onRefresh}
                tintColor={Global.themeColor}
                title="Loading..."
                titleColor={Global.themeColor}
                colors={[Global.themeColor]}
                progressBackgroundColor="#fff"
                />
        );
    };

    onScroll = (event) => {
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
            else {
                this.props.onTitleChange(event, this.title);
                return;
            }

            // 最后一个
            if (i === s.length - 1) {
                this.props.onTitleChange(event, this.title);
                return;
            }
        }
    };

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

        for (let i = 2, j = 1, keys = Object.keys(data); j < keys.length; i++ , j++) {
            arr.push({
                name: this.getSectionName(keys[j]),
                position: arr[i - 1].position + 158 + (data[keys[j - 1]].length - 1) * 121,
            });
        }

        this.sectionPos = arr;
    };

    // 性能优化
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        this.setSectionPos();

        return (
            <View style={styles.contanter}>
                <ListView
                    ref={(listview) => this._listview = listview}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={!false}
                    removeClippedSubviews={true}
                    renderRow={this.renderRow}
                    renderHeader={this.renderHeader}
                    renderFooter={this.renderFooter}
                    dataSource={this.getDataSource()}
                    initialListSize={15}
                    pageSize={10}
                    scrollRenderAheadDistance={500}
                    // 下拉刷新
                    refreshControl={this.refreshControl}
                    // 滚动刷新
                    onEndReachedThreshold={1000}
                    onEndReached={this.props.onMore}
                    // 实现滚动时改变 toolbar 标题
                    onScroll={this.onScroll}
                    scrollEventThrottle={1}
                    >
                </ListView>
            </View>
        );
    }
}
