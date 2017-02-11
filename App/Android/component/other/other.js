import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';

import List from './list';
const window = Dimensions.get('window');

// ## 除首页外的主题
export default class Other extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
        };
    }

    static defaultProps = {
        data: null,
        navigator: null,
        onRefresh: null,
    };

    static propTypes = {
        data: PropTypes.object,
        navigator: PropTypes.object,
        onRefresh: PropTypes.func,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({ data: nextProps.data });
        }
    }

    render() {
        return (
            this.state.data &&
            <View style={styles.contanter}>
                <List
                    data={this.state.data}
                    openEditors={(event, list) => {
                        this.props.navigator.push({
                            id: 5,
                            title: '主编',
                            data: list,
                        });
                    } }
                    openArticle={(event, id) => {
                        this.props.navigator.push({
                            id: 2,
                            title: '文章',
                            data: { id },
                        })
                    } }
                    onRefresh={this.props.onRefresh}
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
