import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity as Touch,
    Dimensions,
    ToastAndroid,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Global from '../../Global';
import { styles } from './style/list-style';

const window = Dimensions.get('window');

export default class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRefreshing: false,
        };

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

    }

    static defaultProps = {
        data: null,
        openArticle: () => { },
        onMore: () => { },
    };

    static propTypes = {
        data: PropTypes.object.isRequired,
        openArticle: PropTypes.func,
        onMore: PropTypes.func,
    };

    getDataSource = () => {
        return this.ds.cloneWithRows(this.props.data.stories);
    };

    renderRow = (data, sectionID, rowID, highlightRow) => (
        <View style={styles.box} key={`list-${rowID}`}>
            <Touch
                activeOpacity={0.7}
                style={styles.touch}
                onPress={event => this.props.openArticle(event, data.id)}
                >
                <View style={styles.left}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.date}>{data.display_date}</Text>
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

    renderHeader = () => (
        <View style={{ marginBottom: 10 }}>

        </View>
    );

    // 列表尾
    renderFooter = () => (
        <View style={{ margin: 10 }}>

        </View>
    );

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
                    // 滚动刷新
                    onEndReachedThreshold={1000}
                    onEndReached={this.props.onMore}
                    >
                </ListView>
            </View>
        );
    }
}

