import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch
} from 'react-native';

import { Global, MaterialIcons } from '../common';

export default ({title, onBack}) => (
    <View style={styles.toolbar}>
        <Touch
            style={{ padding: 10 }}
            activeOpacity={1}
            onPress={onBack}
            >
            <MaterialIcons
                name="arrow-back"
                color="#fff"
                size={26}
                />
        </Touch>

        <View style={styles.title}>
            <Text style={styles.titleText}>{
                title
            }</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    toolbar: {
        height: 55,
        backgroundColor: Global.themeColor,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    title: {
        paddingHorizontal: 10,
    },
    titleText: {
        color: '#fff',
        fontSize: 20,
    },
});
