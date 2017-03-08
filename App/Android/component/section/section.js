import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    InteractionManager,
    ToastAndroid,
} from 'react-native';

import List from './list';
import { Api } from '../common';
import Toolbar from './toolbar';
const window = Dimensions.get('window');

// ## 合集
export default class Section extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            lastTime: 0,
        };

        InteractionManager.runAfterInteractions(_ => {
            this.request.section(this.props.data.id);
        });
    }

    static defaultProps = {
        data: null,
        navigator: null,
        onRefresh: null,
        onMore: null,
    };

    static propTypes = {
        data: PropTypes.object,
        navigator: PropTypes.object.isRequired,
        onRefresh: PropTypes.func,
        onMore: PropTypes.func,
    };

    request = {
        section: (id) => {
            Api.section.get(id).then(result => {
                this.setState({ data: result });
            });
        },
        sectionMore: (id, lastTime) => {
            Api.sectionMore.get(id, lastTime).then(result => {
                let data = this.state.data;
                data = {
                    ...result,
                    stories: data.stories.concat(result.stories),
                };
                this.setState({ data: data, lastTime: 0 });
            })
        },
    };

    onMore = (event) => {
        const lastTime = this.state.data.timestamp;

        if (lastTime !== this.state.lastTime) {
            this.request.sectionMore(this.props.data.id, lastTime);
            this.state.lastTime = lastTime;
        }
    };

    render() {
        const nav = this.props.navigator;
        const data = this.props.data;

        return (
            <View style={styles.contanter}>
                <Toolbar title={data.title} onBack={event => nav.pop()} />

                {
                    this.state.data &&
                    <View style={{ flex: 1 }}>
                        <List
                            data={this.state.data}
                            openArticle={(event, id) => {
                                this.props.navigator.push({
                                    id: 2,
                                    title: '文章',
                                    data: { id },
                                });
                            } }
                            onMore={this.onMore}
                            />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
