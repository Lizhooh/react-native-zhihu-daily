import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    ScrollView,
    TouchableOpacity as Touch,
    InteractionManager,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { commentActions } from '../redux/actions';
import { Topbar, Refresh, StaticView } from '../components';
import LongList from '../components/comment/long-list';
import ShortList from '../components/comment/short-list';
import { layoutAnimate } from '../common';

const window = Dimensions.get('window');
const LONGVIEWHEIGHT = window.height - (25 + 55 + 45 * 2);

class Comment extends Component {

    constructor(props) {
        super(props);
        layoutAnimate.open();
        this.showsc = false; // 显示短评论？
    }

    renderLongComment = data => {
        const { extra } = this.props.data;
        const { refreshing } = this.props.state;

        if (extra.long_comments === 0) {
            return (
                <View style={$.empty}>
                    <Icon name='blur-on' color='#cfcfcf' size={108} />
                    <Text style={{ color: '#ccc' }}>深度长评虚位以待</Text>
                </View>
            )
        }
        return (
            <View style={$.lview}>
                <LongList
                    data={data}
                    refreshing={refreshing}
                    onMore={this.props.lmore}
                    />
            </View>
        );
    }

    renderShortComment = data => (
        <ShortList data={data} onMore={this.props.smore} />
    )

    async componentDidMount() {
        await InteractionManager.runAfterInteractions();
        this.props.init(this.props.data.id);
    }

    componentWillUnmount() {
        this.props.leave();
    }

    render() {
        const { extra } = this.props.data;
        const { ldata, sdata, id } = this.props.state;

        return (
            <View style={$.container}>
                <StaticView>
                    <Topbar
                        title={`${extra.comments || 0} 条评论`}
                        onBack={this.props.navigator.pop}
                        icons={[{ name: 'mode-edit' }]}
                        />
                </StaticView>

                <View style={$.longComment} ref={r => this.longview = r}>
                    <View style={$.title}>
                        <Text>{extra.long_comments || 0} 条长评</Text>
                    </View>
                    {this.renderLongComment(ldata)}
                </View>

                <View style={$.shortComment}>
                    <StaticView>
                        <Touch style={$.title}
                            onPress={e => {
                                // [优化] 直接操作 native view，减少无必要的 diff
                                this.showsc = !this.showsc;
                                this.longview && this.longview.setNativeProps(
                                    { style: { height: this.showsc ? 0 : 'auto' } }
                                );
                                layoutAnimate.start();
                            } }
                            >
                            <Text style={{ flex: 1 }}>{extra.short_comments || 0} 条短评</Text>
                            <FIcon name="angle-double-down" size={22} color='rgba(1, 1, 1, 0.3)' />
                        </Touch>
                    </StaticView>
                    {this.renderShortComment(sdata)}
                </View>
            </View>
        );
    }
}

export default connect(
    state => ({ state: state.comment }),
    commentActions
)(Comment);

const $ = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    lview: {
        height: LONGVIEWHEIGHT,
        backgroundColor: '#fff',
    },
    empty: {
        height: LONGVIEWHEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        paddingHorizontal: 15,
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
    },
    longComment: {
        overflow: 'hidden',
    },
    shortComment: {

    }
});
