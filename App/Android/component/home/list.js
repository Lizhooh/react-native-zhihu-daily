import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity as Touch,
    ActivityIndicator,
} from 'react-native';

import shallowCompare from 'react-addons-shallow-compare';
import Slide from './slide';
import Global from '../../Global';
import { styles } from './style/style';

export default class List extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        data: null,
        openArticle: () => { },
    };

    static propTypes = {
        data: PropTypes.object.isRequired,
        openArticle: PropTypes.func.isRequired,
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
                    !!data.images && <View style={styles.right}>
                        <Image
                            source={{ uri: data.images[0] }}
                            style={styles.rightImg}
                            />
                    </View>
                }
            </Touch>
        </View>
    );

    getDataSource = () => {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        return ds.cloneWithRows(this.props.data.stories);
    };

    renderHeader = () => (
        <View style={{ marginBottom: 20 }}>
            <Slide
                data={this.props.data.top_stories}
                onPress={this.props.openArticle}
                />
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
