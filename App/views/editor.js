import React from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Platform,
} from 'react-native';
import { Topbar } from '../components';

// ## 主编资料
export default ({data, navigator}) => {

    const getUrl = () => {
        const p = Platform.OS === 'ios' ? 'ios' : 'android';
        return `http://news-at.zhihu.com/api/4/editor/${data}/profile-page/${p}`;
    };

    return (
        <View style={styles.contanier}>
            <Topbar title="主编资料" onBack={() => navigator.pop()} />
            <WebView source={{ uri: getUrl() }} />
        </View>
    );
};

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
