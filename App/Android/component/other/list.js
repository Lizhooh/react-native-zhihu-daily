import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity as Touch,
    ActivityIndicator,
    Dimensions,
    RefreshControl,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import shallowCompare from 'react-addons-shallow-compare';
import Global from '../../Global';
import { styles, pice, editor } from './style/list-style';

const window = Dimensions.get('window');

export default class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRefreshing: false,
        };
    }

    static defaultProps = {
        data: null,
        openEditor: () => { },
        openArticle: () => { },
        onRefresh: () => { },
        onMore: () => { },
    };

    static propTypes = {
        data: PropTypes.object.isRequired,
        openEditor: PropTypes.func.isRequired,
        openArticle: PropTypes.func,
        onRefresh: PropTypes.func,
        onMore: PropTypes.func,
    };

    getDataSource = () => {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        return ds.cloneWithRows(this.props.data.stories);
    };

    renderRow = (data, sectionID, rowID, highlightRow) => (
        <View style={styles.box} key={`list-${rowID}`}>
            <Touch
                activeOpacity={0.7}
                style={styles.touch}
                onPress={(event) => this.props.openArticle(event, data.id)}
                >
                <View style={styles.left}>
                    <Text style={styles.leftTitle}>{data.title}</Text>
                </View>
                {
                    !!data.images &&
                    <View style={styles.right}>
                        <Image
                            style={styles.rightImg}
                            source={{ uri: data.images[0] }}
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
    );

    // 列表头
    renderHeader = () => (
        <View style={{ marginBottom: 10 }}>
            {/* 背景图 */}
            <Touch
                style={pice.contanter}
                activeOpacity={0.9}
                onPress={null}
                >
                <Image
                    style={pice.contanter}
                    source={{ uri: this.props.data.background }}
                    />

                <View style={pice.box}>
                    <Text style={pice.text}>{
                        this.props.data.description
                    }</Text>
                </View>
            </Touch>

            {/* 主编 */}
            <View style={editor.contanter}>
                <Text style={editor.text}>主编</Text>
                <View style={editor.list}>{
                    this.props.data.editors &&
                    this.props.data.editors.map((it, index) => (
                        <Touch
                            key={`editors-${index}`}
                            style={editor.user}
                            activeOpacity={0.8}
                            onPress={(event) => {
                                this.props.openEditors(event, this.props.data.editors)
                            } }
                            >
                            <Image
                                style={editor.avatar}
                                source={{ uri: it.avatar }}
                                />
                        </Touch>
                    ))
                }</View>
            </View>
        </View>
    );

    // 列表尾
    renderFooter = () => (
        <View style={{ margin: 10 }}>

        </View>
    );

    get refreshControl() {
        return (
            <RefreshControl
                enabled={true}
                refreshing={this.state.isRefreshing}
                onRefresh={this.props.onRefresh}
                tintColor={Global.themeColor}
                title="Loading..."
                titleColor={Global.themeColor}
                colors={[Global.themeColor]}
                progressBackgroundColor="#fff"
                />
        );
    }

    // 性能优化
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.data.name !== nextProps.data.name) {
            this._listview &&
            this._listview.scrollTo({ x: 0, y: 0, animated: true });
        }
    }

    render() {
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
                    >
                </ListView>
            </View>
        );
    }
}

