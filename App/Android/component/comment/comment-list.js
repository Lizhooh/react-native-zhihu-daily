import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity as Touch,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { longComment } from './style/comment-style';

export default class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    getTime = (time) => {
        const fmt = (v) => v < 10 ? '0' + v : v;

        let date = new Date(time * 1000),
            M = fmt(date.getMonth() + 1),
            d = fmt(date.getDate()),
            h = fmt(date.getHours()),
            m = fmt(date.getMinutes());

        return `${M}-${d} ${h}:${m}`;
    };

    render() {
        const L = longComment;

        return (
            this.props.data &&
            <View>{
                this.props.data.map((it, index) => (
                    <View key={`longComment-${index}`} style={L.item}>
                        <View style={L.itemLeft}>
                            <Image
                                style={L.avatar}
                                source={{ uri: it.avatar }}
                                />
                        </View>

                        <View style={L.itemRight}>
                            <View style={L.author}>
                                <Text style={L.authorText}>
                                    {it.author}
                                </Text>

                                <Touch style={L.like}>
                                    <MaterialIcons
                                        name='thumb-up'
                                        color='#ccc'
                                        size={14}
                                        />
                                    <Text style={L.likeText}>
                                        {it.likes}
                                    </Text>
                                </Touch>
                            </View>

                            <View style={L.content}>
                                <Text style={L.contentText}>
                                    {it.content}
                                </Text>
                                {
                                    it.reply_to &&
                                    <View style={L.reply}>
                                        <Text style={L.replyText}>
                                            <Text style={L.replyAuthor}>
                                                {it.reply_to.author}：
                                            </Text>
                                            {it.reply_to.content}
                                        </Text>
                                    </View>
                                }
                            </View>

                            <View style={L.time}>
                                <Text style={L.timeText}>
                                    {this.getTime(it.time)}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))
            }</View>
        );
    }
}