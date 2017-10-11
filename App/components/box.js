import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// home, theme 列表项
export default ({ item, onPress }) => (
    <View style={$.box} key={item.id}>
        <Touch
            activeOpacity={0.7}
            style={$.touch}
            onPress={e => onPress && onPress(item.id)}
            >
            <View style={$.left}>
                <Text style={$.leftTitle}>{item.title}</Text>
            </View>
            {!!item.images &&
                <View style={$.right}>
                    <Image
                        source={{ uri: item.images[0] }}
                        style={$.rightImg}
                        />
                    {item.multipic &&
                        <View style={$.multipic}>
                            <Icon name="filter-none" size={11} color="#fff" />
                            <Text style={$.multipicText}>多图</Text>
                        </View>
                    }
                </View>
            }
        </Touch>
    </View>
);

const $ = StyleSheet.create({
    box: {
        backgroundColor: '#ddd',
        margin: 10,
        marginHorizontal: 15,
        borderRadius: 3,
        paddingBottom: 1,
        minHeight: 70,
    },
    touch: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 15,
        paddingRight: 10,
        borderRadius: 3,
        minHeight: 80,
    },
    left: {
        flex: 1,
        paddingRight: 5,
    },
    leftTitle: {
        fontSize: 16,
        color: '#333',
    },
    right: {
        width: 100,
        height: 80,
    },
    rightImg: {
        width: 100,
        height: 80,
        borderRadius: 2,
        backgroundColor: 'rgba(1, 1, 1, 0.3)',
    },
    multipic: {
        position: 'absolute',
        bottom: 0, right: 0,
        backgroundColor: 'rgba(1, 1, 1, 0.6)',
        flexDirection: 'row',
        padding: 3,
        alignItems: 'center',
    },
    multipicText: {
        fontSize: 11,
        color: '#fff',
        marginLeft: 3,
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 1,
        textShadowColor: 'rgba(1, 1, 1, 0.6)',
    },
});


