import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image, Modal,
    TouchableOpacity as Touch,
    InteractionManager,
    ScrollView,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { articleActions } from '../redux/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Topbar, Refresh } from '../components';
import { color } from '../config';
import WebViewAuto from '../components/article/webview-auto-height';
import Header from '../components/article/header';
import * as api from '../api';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll/src';

// ## 文章
class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            section: false,
        };

        // 缓存值
        this.topbar = {
            start: 0,
            end: 0,
            y: 0,
            opacity: 1,
            opacity2: 1,
            S: 300,
        };

        // 缓存值
        this._start = 0;
        this._y = 0;
    }

    // 渲染文章主体
    renderBody = data => (
        data && <WebViewAuto
            style={styles.webview}
            css={data.style}
            body={data.body}
            url={data.share_url}
            onImagePress={event =>
                this.setState({
                    modal: {
                        visible: true,
                        imageSrc: event.nativeEvent.data,
                    }
                })
            }
            onLoad={event =>
                setTimeout(_ => {
                    this.setState({ section: true });
                }, 1200)
            }
            />
    );

    // 文章头部
    renderHeader = data => {
        return <Header data={data} />
    };

    // 文章尾部
    renderFooter = data => {
        if (!(data && data.section && this.state.section)) return;
        const section = data.section;
        return (
            <Touch
                style={styles.footer}
                activeOpacity={0.7}
                onPress={event => {
                    this.props.navigator.push({
                        name: 'Section',
                        data: { id: section.id, name: section.name },
                        animated: 'top',
                    });
                } }
                >
                <Image source={{ uri: section.thumbnail }} style={styles.footerImage} />
                <View style={styles.footerContent}>
                    <Text style={{ color: '#444' }}>
                        本文来自：{section.name} · 合集
                    </Text>
                </View>
                <Icon name='chevron-right' color='#444' size={20} />
            </Touch>
        );
    }

    async componentDidMount() {
        await InteractionManager.runAfterInteractions();
        this.props.init(this.props.data);
    }

    componentWillUnmount() {
        this.props.leave();
    }

    // 根据滚动条的变化，Toolbar 的透明度会产生变化
    onScroll = event => {
        const { contentOffset: { y } } = event.nativeEvent;
        const topbar = this.topbar;
        const opacity = this.state.opacity;

        if (y < 100) {
            if (this.topbar.opacity2 < 1) {
                this.mytopbar.setNativeProps({ style: { opacity: 1 } });
            }
            topbar.opacity = 1;
            this.topbar.opacity2 = 1;
            this.topbar.start = 100;
            return;
        }
        // 方向向下
        else if (y - topbar.y > 50) {
            if (this.topbar.opacity2 > 0) {
                this.mytopbar.setNativeProps({ style: { opacity: topbar.opacity - (y - topbar.start) / topbar.S } });
                this.topbar.opacity2 = topbar.opacity - (y - topbar.start) / topbar.S;
            }
            topbar.end = topbar.y;
            topbar.y = y;
        }
        // 方向向上
        else if (y - topbar.y < -50) {
            if (this.topbar.opacity2 < 1) {
                this.mytopbar.setNativeProps({ style: { opacity: (topbar.end - y) / topbar.S } });
                topbar.opacity = (topbar.end - y) / topbar.S;
                this.topbar.opacity2 = (topbar.end - y) / topbar.S;
            }
            topbar.start = y;
            topbar.y = y;
        }
    }

    render() {
        let { data, id } = this.props.state;

        return (
            <View style={styles.contanier}>
                <ScrollView
                    overScrollMode='never'
                    style={styles.body}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this.onScroll}
                    >
                    {this.renderHeader(data)}
                    {this.renderBody(data)}
                    {this.renderFooter(data)}
                </ScrollView>

                {/* 实现浮动效果，必须把要浮动的组件放在后面 */}
                <View style={{ flex: 0 }}>
                    <Topbar
                        myref={r => this.mytopbar = r}
                        style={[styles.toolbar]}
                        onBack={this.props.navigator.pop}
                        />
                </View>
            </View>
        );
    }
}

export default connect(
    state => ({ state: state.article }),
    articleActions
)(Article);

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // 实现浮动层
    toolbar: {
        position: 'absolute',
        top: -Dimensions.get('window').height + 25,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(1, 1, 1, 0.5)',
    },
    footer: {
        margin: 20,
        marginBottom: 30,
        padding: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(1, 1, 1, 0.04)',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 2,
        paddingRight: 5,
    },
    footerImage: {
        width: 50,
        height: 50,
    },
    footerContent: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        flex: 1,
    },
});
