import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
} from 'react-native';
import { getFotmatTime } from '../../functions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from '../../config';

export default ({ data: item }) => (
    <View key={`comment-${item.id}`} style={L.item}>
        <View style={L.itemLeft}>
            <Image style={L.avatar} source={{ uri: item.avatar }} />
        </View>

        <View style={L.itemRight}>
            <View style={L.author}>
                <Text style={L.authorText}>{item.author}</Text>

                <Touch style={L.like}>
                    <Icon name='thumb-up' color='#ccc' size={14} />
                    <Text style={L.likeText}>{item.likes}</Text>
                </Touch>
            </View>

            <View style={L.content}>
                <Text style={L.contentText}>{item.content}</Text>
                {item.reply_to &&
                    <View style={L.reply}>
                        <Text style={L.replyText}>
                            {
                                item.reply_to.status === 0 &&
                                <Text style={L.replyAuthor}>{item.reply_to.author}：</Text>
                            }
                            {
                                item.reply_to.content || item.reply_to.error_msg
                            }
                        </Text>
                    </View>
                }
            </View>

            <View style={L.time}>
                <Text style={L.timeText}>{getFotmatTime(item.time)}</Text>
            </View>
        </View>
    </View>
);

const L = StyleSheet.create({
    title: {
        padding: 15,
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        height: 45,
    },
    item: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    itemLeft: {
        marginTop: 5,
        width: 50,
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    itemRight: {
        padding: 5,
        flex: 1,
    },
    author: {
        paddingBottom: 5,
        flexDirection: 'row',
    },
    authorText: {
        color: '#333',
        fontWeight: '600',
        flex: 1,
    },
    like: {
        flexDirection: 'row',
    },
    likeText: {
        color: "#bbb",
        fontSize: 12,
        marginLeft: 2,
    },
    content: {
    },
    contentText: {
        color: "#444",
        lineHeight: 23,
    },
    reply: {
        borderLeftColor: color,
        borderLeftWidth: 2,
        marginVertical: 3,
        marginLeft: 0,
        paddingLeft: 6,
    },
    replyAuthor: {
        color: '#333',
        fontWeight: '600',
    },
    replyText: {
        color: '#888',
        lineHeight: 23,
        textAlignVertical: 'center',
        includeFontPadding: false,
    },
    time: {
        marginTop: 10,
    },
    timeText: {
        color: '#bfbfbf',
        fontSize: 12,
    }
});
