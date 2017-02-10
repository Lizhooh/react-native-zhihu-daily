import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    WebView,
    Platform,
    InteractionManager,
} from 'react-native';

import Toolbar from './toolbar';

// ## 主编资料
export default class Editor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: '',
        };
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

    getUrl = () => {
        const id = this.props.data.id;
        const p = Platform.OS === 'ios' ? 'ios' : 'android';
        InteractionManager.runAfterInteractions(() => {
            this.setState({ url: `http://news-at.zhihu.com/api/4/editor/${id}/profile-page/${p}` });
        });
    };

    componentDidMount() {
        this.getUrl();
    }

    render() {
        return (
            <View style={styles.contaner}>
                <Toolbar title="主编资料" onBack={this.back} />
                <WebView source={{ uri: this.state.url }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
