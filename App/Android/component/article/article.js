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
import Global from '../../Global';
import Toolbar from './toolbar';
import Api from '../../../Server/api';
import WebViewAuto from './webview-auto-height';
import Header from './header';
import { styles } from './style/article-style';

const window = Dimensions.get('window');

// 文章
export default class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            toolbarOpacity: 1,
            modal: {
                visible: false,
                imageSrc: '',
            },

            article_data: null,
            extra_data: {},
        };

        const id = this.props.data.id;

        // 等待动画完成后才 request
        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                this.request.story(id);
                this.request.storyExtra(id);
            }, 0);
        });

        this._y = 0;
    }

    static defaultProps = {
        data: null,
        navigator: null,
    };

    static propTypes = {
        data: PropTypes.object,
        navigator: PropTypes.object,
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
                />
        );
    };

    // 文章头部
    get renderHeader() {
        const { article_data: data } = this.state;
        return data && <Header data={data} />
    };

    // 根据滚动条的变化，Toolbar 的透明度会产生变化
    scrollViewOnScroll = event => {
        const { contentOffset: offset } = event.nativeEvent;
        const len = 200;

        // 方向向下
        if (offset.y - this._y > 0) {
            if (offset.y <= len) {
                this.setState({
                    toolbarOpacity: 1 - offset.y / len,
                });
                this._y = offset.y;
            }
            else if (offset.y - this._y > 0) {
                if (this.state.toolbarOpacity > 0) {
                    this.setState({ toolbarOpacity: 0 });
                }
                this._y = offset.y;
            }
        }
        // 方向向上
        else if (offset.y - this._y < -80) {
            if (this.state.toolbarOpacity < 1) {
                this.setState({ toolbarOpacity: 1 });
            }
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
                </ScrollView>

                {/* 实现浮动效果，必须把要浮动的组件放在后面 */}
                <View style={{ flex: 0 }}>
                    <Toolbar
                        style={[styles.toolbar, { opacity: this.state.toolbarOpacity }]}
                        opacity={this.state.toolbarOpacity}
                        onBack={this.back}
                        data={extra_data}
                        />
                </View>

            </View>
        );
    }
}

