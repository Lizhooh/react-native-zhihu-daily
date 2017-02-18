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

const window = Dimensions.get('window');

// ## 评论
export default class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ok: false,
            data: {},
        };

        InteractionManager.runAfterInteractions(() => {
            this.setState({ ok: true });
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


    renderLongCommentList = (comments) => {

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
            <View>{
                this.renderLongCommentList(this.state.data.comments)
            }</View>
    );

    renderShortComment = () => (
        <View></View>
    );

    render() {
        const navData = this.props.data;

        console.log(navData);

        return (
            <View style={styles.container}>
                <Toolbar comments={navData.comments || 0} />

                {
                    this.state.ok &&
                    <ScrollView
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    longComment: {
        minHeight: window.height - 55 - 25 - 46,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    shortComment: {
        minHeight: 45,
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const longComment = StyleSheet.create({
    title: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
    },
});

const shortComment = StyleSheet.create({
    title: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 45,
    }
});