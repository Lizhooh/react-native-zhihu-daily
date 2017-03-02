import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';

import List from './list';
const window = Dimensions.get('window');

// ## 除首页外的主题
export default ({data, navigator, onRefresh, onMore}) => (
    data &&
    <View style={styles.contanter}>
        <List
            data={data}
            openEditors={(event, list) => {
                navigator.push({
                    id: 5,
                    title: '主编',
                    data: list,
                });
            } }
            openArticle={(event, id) => {
                navigator.push({
                    id: 2,
                    title: '文章',
                    data: { id },
                })
            } }
            onRefresh={onRefresh}
            onMore={onMore}
            />
    </View>
);

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
});
