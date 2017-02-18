import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity as Touch,
    InteractionManager,
    Dimensions,
    ScrollView,
    Image,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toolbar from './toolbar';
import Api from '../../../Server/api';
import LongCommentList from './long-comment-list';
import {
    styles,
    longComment,
    shortComment,
} from './style/comment-style';


// ## 评论
export default class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ok: false,
            data: {},
        };

        InteractionManager.runAfterInteractions(() => {
            this.request.longComments(this.props.data.id);
        });
    }

    static defaultProps = {
        navigator: null,
        data: {},
    };

    static propTypes = {
        navigator: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
    };

    request = {
        longComments: (id) => {
            Api.longComments.get(id).then(result => {
                this.setState({
                    ok: true,
                    data: {
                        long_comments: result.comments,
                    },
                });
            });
        },
    };

    renderLongComment = () => (
        this.props.data.long_comments * 1 === 0 ?
            <View style={styles.empty}>
                <MaterialIcons
                    name='blur-on'
                    color='#cfcfcf'
                    size={108}
                    />
                <Text style={{ color: '#ccc' }}>
                    深度长评虚位以待
                </Text>
            </View>
            :
            <View>
                <LongCommentList
                    data={this.state.data.long_comments}
                    />
            </View>
    );

    renderShortComment = () => (
        <View></View>
    );

    render() {
        const navData = this.props.data;

        return (
            <View style={styles.container}>
                <Toolbar comments={navData.comments || 0} />
                {
                    this.state.ok &&
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        removeClippedSubviews={true}
                        >

                        <View style={styles.longComment}>
                            <Touch style={longComment.title}>
                                <Text>
                                    {navData.long_comments || 0} 条长评
                                </Text>
                            </Touch>
                            {this.renderLongComment()}
                        </View>

                        <View style={styles.shortComment}>
                            <Touch
                                style={shortComment.title}
                                >
                                <Text style={{ flex: 1 }}>
                                    {navData.short_comments || 0} 条短评
                                </Text>
                                <FontAwesome
                                    name="angle-double-down"
                                    size={22}
                                    color='#bbb'
                                    />
                            </Touch>
                            {this.renderShortComment()}
                        </View>

                    </ScrollView>
                }
            </View>
        );
    }
}
