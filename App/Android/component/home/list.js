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

        this.sectionPos = [{ name: '首页', position: 0 }];
        this.sectionIndex = 0;
        this.title = '首页';

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
    };

    static propTypes = {
        data: PropTypes.object.isRequired,
        openArticle: PropTypes.func.isRequired,
        onRefresh: PropTypes.func,
        onTitleChange: PropTypes.func.isRequired,
    };

    getDataSource = () => {
        return this.ds.cloneWithRowsAndSections(this.props.data);
    };

    // 对时间进行格式化
    getSectionName = (_date) => {
        // 20170125
        let D = new Date();

        let
            _y = _date.slice(0, 4) * 1,
            _m = _date.slice(4, 6) * 1 - 1,
            _d = _date.slice(6) * 1,
            _week = '日一二三四五六'.charAt(new Date(_y, _m, _d).getDay()),

            y = D.getFullYear(),
            m = D.getMonth() + 1 < 10 ? '0' + (D.getMonth() + 1) : D.getMonth() + 1,
            d = D.getDate() < 10 ? '0' + D.getDate() : D.getDate();

        let date = `${y}${m}${d}`;

        if (_date === date) {
            return '今日热闻';
        }
        else {
            if (_m === -1) return '';

            return `${_m}月${_d}日 星期${_week}`;
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
        <View
            onLayout={event => {
                if (rowID * 1 === 0) {
                    // 注意：会重复触发
                    const name = this.getSectionName(sectionID);
                    const position = event.nativeEvent.layout.y;

                    const has = this.sectionPos
                        .filter(it => it.name === name && it.position === position)
                        .length !== 0;

                    !has && this.sectionPos.push({ name, position });
                }
            } }
            >
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
        const Y = event.nativeEvent.contentOffset.y;

        if (Y < 0) return;

        const s = this.sectionPos;
        for (const i in s) {
            if (Y >= s[i].position) {

            }
            else {
                if (this.title !== s[i - 1].name) {
                    this.props.onTitleChange(event, s[i - 1].name);
                    this.title = s[i - 1].name;
                    return;
                }
                return;
            }
        }

        if (this.title !== s[s.length - 1].name) {
            this.props.onTitleChange(event, s[s.length - 1].name);
            this.title = s[s.length - 1].name;
            return;
        }
    };

    // 性能优化
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <View style={styles.contanter}>
                <ListView
                    ref={(listview) => this._listview = listview}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
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
                    onEndReached={null}
                    // 实现滚动时改变 toolbar 标题
                    onScroll={this.onScroll}
                    scrollEventThrottle={1}
                    >
                </ListView>
            </View>
        );
    }
}
