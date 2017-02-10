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
            article_data: null,
            extra_data: {},
        };

        const id = this.props.data.id;

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

    get renderBody() {
        const { article_data } = this.state;
        return (
            article_data &&
            <WebViewAuto
                css={article_data.css}
                body={article_data.body}
                />
        );
    }

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

    render() {
        const { article_data, extra_data } = this.state;

        return (
            <View style={styles.contanier}>

                <ScrollView
                    style={styles.body}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    >
                    {this.renderHeader}
                    {this.renderBody}
                </ScrollView>

                <View style={{ flex: 0 }}>
                    <Toolbar
                        style={styles.toolbar}
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
});