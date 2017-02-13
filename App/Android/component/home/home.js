import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';

import Slide from './slide';
import List from './list';
const window = Dimensions.get('window');

//  ## 首页
export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            topStories: this.props.topStories,
        }
    }

    static defaultProps = {
        data: null,
        navigator: null,
        onRefresh: null,
        onTitleChange: null,
    };

    static propTypes = {
        data: PropTypes.object,
        navigator: PropTypes.object,
        onRefresh: PropTypes.func,
        onTitleChange: PropTypes.func,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                data: nextProps.data,
                topStories: nextProps.topStories,
            });
        }
    }

    render() {
        return (
            this.state.data &&
            this.state.topStories.length > 0 &&
            <View style={styles.contanter}>
                <List
                    data={this.state.data}
                    topStories={this.state.topStories}
                    openArticle={(event, id) => {
                        this.props.navigator.push({
                            id: 2,
                            title: '文章',
                            data: { id },
                        })
                    } }
                    onRefresh={this.props.onRefresh}
                    onTitleChange={this.props.onTitleChange}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
});

