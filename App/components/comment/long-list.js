import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    Dimensions,
    ListView,
    ToastAndroid as Toast,
} from 'react-native';
import Box from './box';
import { Refresh } from '../index';

const window = Dimensions.get('window');
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

let loadmore = false;

export default ({ data, refreshing, onMore }) => (
    <ListView
        style={$.container}
        // showsVerticalScrollIndicator={false}
        // showsHorizontalScrollIndicator={false}
        dataSource={ds.cloneWithRows(data)}
        renderRow={(item) => <Box data={item} />}
        overScrollMode='never'
        initialListSize={5}
        refreshControl={
            <Refresh refreshing={refreshing} />
        }
        scrollRenderAheadDistance={300}
        enableEmptySections={true}
        onEndReachedThreshold={300}
        onEndReached={e => {
            if (loadmore !== true && !data.empty()) {
                loadmore = true;
                onMore().then(res => {
                    loadmore = false;
                    res.empty()  && data.length > 10 && Toast.show('没有更多了', Toast.LONG);
                });
            }
        } }
        />
);

const $ = StyleSheet.create({
    container: {
        height: window.height - (25 + 55 + 45 * 2),
    }
})

