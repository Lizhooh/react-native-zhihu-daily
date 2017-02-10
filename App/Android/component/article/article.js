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
import Global from '../../Global';
import Toolbar from './toolbar';
import Api from '../../../Server/api';
import WebViewAuto from './webview-auto-height';

const window = Dimensions.get('window');

export default class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            toolbarOpacity: 1,

            article_data: null,
            extra_data: {},
        };

        const id = this.props.data.id;

        // 等待动画完成后才 request
        InteractionManager.runAfterInteractions(() => {
            this.request.story(id);
            this.request.storyExtra(id);
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
        const { article_data } = this.state;
        return (
            article_data &&
            <WebViewAuto
                style={styles.webview}
                css={article_data.css}
                body={article_data.body}
                />
        );
    }

    // 文章头部的图片
    get renderHeader() {
        const { article_data } = this.state;

        return (
            article_data &&
            article_data.image &&
            <View style={styles.header}>
                <Image
                    style={{ width: window.width, height: 220 }}
                    source={{ uri: article_data.image }}
                    />
            </View>
        );
    }

    scrollViewOnScroll = (event) => {
        // 根据滚动条的变化，Toolbar 的透明度会产生变化
        const { contentOffset: offset } = event.nativeEvent;
        const len = 200;

        if (offset.y - this._y > 0) {
            if (offset.y <= len) {
                this.setState({
                    toolbarOpacity: 1 - offset.y / len,
                });
                this._y = offset.y;
            }
            // 方向向下
            else {
                if (this.state.toolbarOpacity > 0) {
                    this.setState({ toolbarOpacity: 0 });
                }
                this._y = offset.y;
            }
        }
        else if (offset.y - this._y < -50) {
            if (this.state.toolbarOpacity < 1) {
                this.setState({ toolbarOpacity: 1 });
            }
            // 缓存上次的值，用于计算方向
            this._y = offset.y;
        }
    }

    render() {
        const { article_data, extra_data } = this.state;

        return (
            <View style={styles.contanier}>

                <ScrollView
                    style={styles.body}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this.scrollViewOnScroll}
                    >
                    {this.renderHeader}
                    {this.renderBody}
                </ScrollView>

                <View style={{ flex: 0 }}>
                    <Toolbar
                        style={[styles.toolbar, { opacity: this.state.toolbarOpacity }]}
                        onBack={this.back}
                        data={extra_data}
                        />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // 实现浮动层
    toolbar: {
        position: 'absolute',
        top: -window.height + 25,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    body: {
        flex: 1,
        paddingTop: 50,
    },
    header: {
        height: 220,
        width: window.width,
        backgroundColor: 'rgba(1, 1, 1, 0.05)',
    },
    image: {
        height: 220,
        width: window.width,
    },
    webview: {
    }
});