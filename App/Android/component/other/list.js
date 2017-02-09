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
} from 'react-native';

import shallowCompare from 'react-addons-shallow-compare';
import Global from '../../Global';
import { styles, pice, editor } from './style/style';

const window = Dimensions.get('window');

export default class List extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        data: null,
        openEditor: () => { },
    };

    static propTypes = {
        data: PropTypes.array.isRequired,
        openEditor: PropTypes.func.isRequired,
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
                onPress={null}
                >
                <View style={styles.left}>
                    <Text style={styles.leftTitle}>{data.title}</Text>
                </View>
                {
                    !!data.images && <View style={styles.right}>
                        <Image source={{ uri: data.images[0] }} style={styles.rightImg} />
                    </View>
                }
            </Touch>
        </View>
    );

    // 列表头
    renderHeader = () => (
        <View style={{ marginBottom: 10 }}>
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

            <View style={editor.contanter}>
                <Text style={editor.text}>主编</Text>
                <View style={editor.list}>{
                    this.props.data.editors &&
                    this.props.data.editors.map((it, index) => (
                        <Touch
                            style={editor.user}
                            activeOpacity={0.8}
                            onPress={(event) => {
                                this.props.openEditor(event, this.props.data.editors)
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

    componentWillReceiveProps(nextProps) {
        this._listview &&
            this._listview.scrollTo({ x: 0, y: 0, animated: true });
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
                    initialListSize={10}
                    pageSize={1}
                    scrollRenderAheadDistance={300}
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

