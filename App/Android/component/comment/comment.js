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
import CommentList from './comment-list';
import {
    styles,
    longComment,
    shortComment,
} from './style/comment-style';

const window = Dimensions.get('window');

// ## 评论
export default class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ok: false,
            short: false,
            data: {},
        };

        InteractionManager.runAfterInteractions(() => {
            this.request.Comments(this.props.data.id);
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
        Comments: (id) => {
            Promise.all([
                Api.longComments.get(id),
                Api.shortComments.get(id),
            ]).then(results => {
                this.setState({
                    ok: true,
                    data: {
                        long_comments: results[0].comments,
                        short_comments: results[1].comments,
                    },
                })
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
                <CommentList
                    data={this.state.data.long_comments}
                    />
            </View>
    );

    renderShortComment = () => (
        <View>{
            this.state.short &&
            <CommentList
                data={this.state.data.short_comments}
                />
        }</View>
    );

    render() {
        const navData = this.props.data;

        return (
            <View style={styles.container}>
                <Toolbar
                    comments={navData.comments || 0}
                    onBack={event => {
                        this.props.navigator.pop();
                    } }
                    />
                {
                    this.state.ok &&
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        removeClippedSubviews={true}
                        ref={s => this._scroll = s}
                        >

                        <View style={styles.longComment}>
                            <Touch style={longComment.title} activeOpacity={0.8}>
                                <Text>
                                    {navData.long_comments || 0} 条长评
                                </Text>
                            </Touch>
                            {this.renderLongComment()}
                        </View>

                        <View style={styles.shortComment}>
                            <Touch
                                activeOpacity={0.8}
                                style={shortComment.title}
                                onPress={event => {
                                    this.setState({
                                        short: !this.state.short,
                                    }, () => {
                                        setTimeout(() => {
                                            this._scroll.scrollTo({
                                                x: 0,
                                                y: window.height - 55 - 25 - 47,
                                                animated: !true
                                            });
                                        }, 0);
                                    });
                                } }
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
