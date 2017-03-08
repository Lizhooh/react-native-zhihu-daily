import React from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity as Touch,
    Dimensions,
    ToastAndroid,
} from 'react-native';

import { Global, MaterialIcons } from '../common';
import { styles } from './style/list-style';

const window = Dimensions.get('window');

export default ({data, openArticle, onMore}) => {

    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    const getDataSource = () => {
        return ds.cloneWithRows(data.stories);
    };

    const renderRow = (data, sectionID, rowID, highlightRow) => (
        <View style={styles.box} key={`list-${rowID}`}>
            <Touch
                activeOpacity={0.7}
                style={styles.touch}
                onPress={event => openArticle(event, data.id)}
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

    const renderHeader = () => (
        <View style={{ marginBottom: 10 }}>

        </View>
    );

    // 列表尾
    const renderFooter = () => (
        <View style={{ margin: 10 }}>

        </View>
    );

    return (
        <View style={styles.contanter}>
            <ListView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={!false}
                removeClippedSubviews={true}
                renderRow={renderRow}
                renderHeader={renderHeader}
                renderFooter={renderFooter}
                dataSource={getDataSource()}
                initialListSize={15}
                pageSize={10}
                scrollRenderAheadDistance={500}
                // 滚动刷新
                onEndReachedThreshold={1000}
                onEndReached={onMore}
                >
            </ListView>
        </View>
    );
}

