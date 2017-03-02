import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity as Touch,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Global from '../../Global';

// ## 文章工具栏
export default ({opacity = 1, data = {}, onBack, openCommnet, style}) => {

    // 大于 1000 时，显示 k
    const setFormat = (value) => {
        if (value > 1000 && (value += '')) {
            value = value.substr(0, value.length - 2);
            return (value / 10).toFixed(1) + 'k';
        }
        return value;
    };

    const rightIcon = [
        { name: 'share', onPress: null, num: null },
        { name: 'star', onPress: null, num: null },
        {
            name: 'comment',
            onPress: openCommnet,
            num: setFormat(data.comments)
        }, {
            name: 'thumb-up',
            onPress: null,
            num: setFormat(data.popularity)
        },
    ];

    return (
        <View style={[styles.contanier, style]}>
            <View style={styles.left}>
                <Touch
                    style={left.icon}
                    activeOpacity={0.8}
                    onPress={onBack}
                    >
                    <MaterialIcons
                        name="arrow-back"
                        size={26}
                        color="#fff"
                        />
                </Touch>
            </View>

            <View style={styles.right}>{
                rightIcon.map((it, index) => (
                    <Touch
                        key={`right-icon-${index}`}
                        style={right.icon}
                        activeOpacity={0.8}
                        onPress={it.onPress}
                        >
                        <MaterialIcons
                            name={it.name}
                            size={26}
                            color="#fff"
                            />
                        {
                            it.num !== null &&
                            <Text style={right.num}>{it.num}</Text>
                        }
                    </Touch>
                ))
            }</View>

        </View>
    );
}

const styles = StyleSheet.create({
    contanier: {
        height: 55,
        backgroundColor: Global.themeColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    left: {
        flexDirection: 'row',
        flex: 1,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const left = StyleSheet.create({
    icon: {
        marginHorizontal: 2,
        padding: 10,
    },
});

const right = StyleSheet.create({
    icon: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    num: {
        color: '#fff',
        marginLeft: 3,
    }
});