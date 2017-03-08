import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';

import Slide from './slide';
import List from './list';
const window = Dimensions.get('window');

//  ## 首页
export default ({data, topStories, navigator, onRefresh, onTitleChange, onMore}) => (
    data &&
    topStories.length > 0 &&
    <View style={styles.contanter}>
        <List
            data={data}
            topStories={topStories}
            openArticle={(event, id) => {
                navigator.push({
                    id: 2,
                    title: '文章',
                    data: { id },
                })
            } }
            onRefresh={onRefresh}
            onTitleChange={onTitleChange}
            onMore={onMore}
            />
    </View>
)

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
});

