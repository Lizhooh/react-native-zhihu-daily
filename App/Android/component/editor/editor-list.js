import React, { PropTypes, Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    PixelRatio,
    InteractionManager,
} from 'react-native';

import Toolbar from './toolbar';

// ## 主编列表
export default class EditorList extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        data: null,
        navigator: null,
    };

    static propTypes = {
        data: PropTypes.array,
        navigator: PropTypes.object,
    };

    back = () => {
        this.props.navigator.pop();
    };

    openEditor = (event, id) => {
        // ...需要长时间同步执行的任务...
        this.props.navigator.push({
            id: 6,
            title: '主编资料',
            data: { id }
        });
    };

    render() {
        return (
            <View style={styles.contanier}>

                <Toolbar title="主编" onBack={this.back} />

                <View style={styles.editers}>{
                    // 主编列表
                    this.props.data.map((it, index) => (
                        <Touch
                            key={`editer-${index}`}
                            style={styles.editer}
                            activeOpacity={0.8}
                            onPress={event => this.openEditor(event, it.id)}
                            >

                            <View style={editer.left}>
                                <Image style={editer.avatar} source={{ uri: it.avatar }} />
                            </View>

                            <View style={editer.right}>
                                <Text style={editer.name}>{it.name}</Text>
                                <Text style={editer.bio}>{it.bio}</Text>
                            </View>

                        </Touch>
                    ))
                }</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    },
    editers: {
        flex: 1,
    },
    editer: {
        flexDirection: 'row',
        backgroundColor: '#aaa',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee',
    }
});

const editer = StyleSheet.create({
    left: {
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
        paddingLeft: 20,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    right: {
        flex: 1,
        padding: 10,
        paddingVertical: 20,
        backgroundColor: '#fff',
    },
    name: {
        color: '#333',
        fontSize: 15,
        paddingBottom: 8,
    },
    bio: {
        color: '#999',
    }
})