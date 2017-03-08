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
    Modal,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toolbar from './toolbar';
import { Api, Global } from '../common';
import WebViewAuto from './webview-auto-height';
import Header from './header';
import { styles } from './style/article-style';

const window = Dimensions.get('window');

// ## 文章
export default class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            toolbarOpacity: 1,
            modal: {
                visible: false,
                imageSrc: '',
            },

            section: false,

            article_data: null,
            extra_data: {},
        };

        const id = this.props.data.id;

        // 缓存值
        this._start = 0;
        this._y = 0;

        // 等待动画完成后才 request
        InteractionManager.runAfterInteractions(() => {
            this.request.story(id);
            this.request.storyExtra(id);
        });
    }

    static defaultProps = {
        data: null,
        navigator: null,
    };

    static propTypes = {
        data: PropTypes.object,
        navigator: PropTypes.object.isRequired,
    };

    back = () => {
        this.props.navigator.pop();
    };

    request = {
        story: (id) => {
            Api.story.get(id).then((result) => {
                this.setState({ article_data: result });
            });
        },
        storyExtra: (id) => {
            Api.storyExtra.get(id).then((result) => {
                this.setState({ extra_data: result });
            });
        },
    };

    // 渲染文章主体
    get renderBody() {
        const { article_data: data } = this.state;
        return (
            data &&
            <WebViewAuto
                style={styles.webview}
                css={data.style}
                body={data.body}
                url={data.share_url}
                onImagePress={event => {
                    this.setState({
                        modal: {
                            visible: true,
                            imageSrc: event.nativeEvent.data,
                        }
                    });
                } }
                onLoad={event => {
                    setTimeout(_ => {
                        this.setState({ section: true });
                    }, 1000);
                } }
                />
        );
    };

    // 文章头部
    get renderHeader() {
        const { article_data: data } = this.state;
        return data && <Header data={data} />
    };

    get renderFooter() {
        const _ = this.state;
        if (!(_.article_data && _.section && _.article_data.section)) return;
        const section = _.article_data.section;

        return (
            <Touch
                style={styles.footer}
                activeOpacity={0.7}
                onPress={event => {
                    this.props.navigator.push({
                        id: 9,
                        title: '合集',
                        data: {
                            title: section.name,
                            id: section.id,
                        },
                    });
                } }
                >
                <Image source={{ uri: section.thumbnail }} style={styles.footerImage} />
                <View style={styles.footerContent}>
                    <Text style={{ color: '#444' }}>
                        本文来自：{section.name} · 合集
                    </Text>
                </View>
                <MaterialIcons
                    name='chevron-right'
                    color='#444'
                    size={20}
                    />
            </Touch>
        );
    }

    // 根据滚动条的变化，Toolbar 的透明度会产生变化
    scrollViewOnScroll = event => {
        const { contentOffset: offset } = event.nativeEvent;
        const len = 200;

        // 方向向下
        if (offset.y - this._y > 0) {
            this.setState({
                toolbarOpacity: 1 - (offset.y - this._start) / len,
            });
            this._y = offset.y;
        }
        // 方向向上
        else if (offset.y - this._y < -80) {
            if (this.state.toolbarOpacity < 1) {
                this.setState({ toolbarOpacity: 1 });
            }
            // 设置开始值
            this._start = offset.y;
            // 缓存上次的值，用于计算方向
            this._y = offset.y;
        }
    }

    render() {
        const { extra_data } = this.state;

        return (
            <View style={styles.contanier}>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modal.visible}
                    onRequestClose={event => { } }
                    >
                    <Touch
                        style={styles.modal}
                        activeOpacity={1}
                        onPress={event => {
                            this.setState({
                                modal: {
                                    visible: false,
                                }
                            });
                        } }
                        >
                        <Image
                            source={{ uri: this.state.modal.imageSrc }}
                            style={{ width: window.width, height: window.height }}
                            resizeMode="contain"
                            />
                    </Touch>
                </Modal>

                <ScrollView
                    style={styles.body}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this.scrollViewOnScroll}
                    >
                    {this.renderHeader}
                    {this.renderBody}
                    {this.renderFooter}
                </ScrollView>

                {/* 实现浮动效果，必须把要浮动的组件放在后面 */}
                <View style={{ flex: 0 }}>
                    <Toolbar
                        style={[styles.toolbar, { opacity: this.state.toolbarOpacity }]}
                        opacity={this.state.toolbarOpacity}
                        onBack={this.back}
                        data={extra_data}
                        openCommnet={event => {
                            this.props.navigator.push({
                                id: 3,
                                title: '评论',
                                data: {
                                    id: this.props.data.id,
                                    comments: extra_data.comments,
                                    long_comments: extra_data.long_comments,
                                    short_comments: extra_data.short_comments,
                                }
                            });
                        } }
                        />
                </View>

            </View>
        );
    }
}

