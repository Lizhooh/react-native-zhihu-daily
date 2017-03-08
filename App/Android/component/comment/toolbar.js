import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity as Touch,
} from 'react-native';

import { Global, MaterialIcons, Ionicons } from '../common';

// ## 评论工具栏
export default ({comments, onBack}) => (
    <View style={styles.container}>
        <View style={styles.left}>
            <Touch
                style={{ padding: 10 }}
                activeOpacity={0.8}
                onPress={onBack}
                >
                <MaterialIcons
                    name='arrow-back'
                    color='#fff'
                    size={26}
                    />
            </Touch>

            <Text style={styles.text}>
                {comments} 条评论
            </Text>
        </View>

        <View style={styles.right}>
            <Touch
                style={{ padding: 10 }}
                activeOpacity={0.8}
                >
                <MaterialIcons
                    name='mode-edit'
                    color='#fff'
                    size={24}
                    />
            </Touch>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: 55,
        backgroundColor: Global.themeColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 20,
        top: -1,
    },
})