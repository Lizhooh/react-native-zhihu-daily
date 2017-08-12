import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    ScrollView,
} from 'react-native';

import { color } from '../config';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ## 菜单视图
export default class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // 默认
            themes: require('../resource/themes.json'),
            active: -1,
        };
    }

    render() {
        const { onSelectChanng = () => { } } = this.props;
        const { themes, active } = this.state;

        return (
            <ScrollView
                overScrollMode='never'
                style={$.contanter}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode='on-drag'
                >
                <View style={$.toolbar}>
                    <View style={box.top}>
                        <View style={box.img}>
                            <Image style={box.img} source={require('../resource/user.jpg')} />
                        </View>
                        <Text style={box.login}>请登录</Text>
                    </View>
                    <View style={box.bottom}>
                        <Touch style={box.pick} activeOpacity={0.7}>
                            <Icon name="star" color="#fff" size={20} />
                            <Text style={box.pickText}>我的收藏</Text>
                        </Touch>
                        <Touch style={box.pick} activeOpacity={0.7}>
                            <Icon name="file-download" color="#fff" size={18} />
                            <Text style={box.pickText}>离线下载</Text>
                        </Touch>
                    </View>
                </View>
                <Touch
                    activeOpacity={1}
                    style={[$.home, active === -1 && $.active]}
                    onPress={event => {
                        this.setState({ active: -1 });
                        onSelectChanng(event, -1, '首页');
                    } }
                    >
                    <Icon name="home" size={20} color={color} />
                    <Text style={$.homeText}>首页</Text>
                </Touch>
                <View style={$.theme}>{
                    themes.others.map((it, index) => (
                        <Touch
                            style={[theme.item, active === it.id && $.active]}
                            activeOpacity={1}
                            key={`theme-${index}`}
                            onPress={event => {
                                this.setState({ active: it.id });
                                onSelectChanng(event, it.id, it.name);
                            } }
                            >
                            <Text style={theme.text}>{it.name}</Text>
                            <Icon style={theme.icon} name="add" color="#ccc" size={19} />
                        </Touch>
                    ))
                }
                </View>
            </ScrollView>
        );
    }
}

const $ = StyleSheet.create({
    contanter: {
        flex: 1,
        backgroundColor: color,
    },
    toolbar: {
        height: 150,
        backgroundColor: color,
        padding: 10,
    },
    home: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    homeText: {
        color: color,
        marginLeft: 20,
        fontSize: 16,
    },
    theme: {
        paddingVertical: 5,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: '#f4f4f4',
    }
});

const box = StyleSheet.create({
    top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        // justifyContent: 'center',
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    login: {
        color: '#fff',
        fontSize: 15,
        paddingHorizontal: 10,
    },
    pick: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pickText: {
        color: '#fff',
        marginLeft: 15,
        fontWeight: '500',
    },
});

const theme = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingHorizontal: 25,
    },
    text: {
        flex: 1,
        flexDirection: 'row',
        color: '#222',
        fontSize: 15,
    },
    icon: {
        paddingRight: 20,
    }
});
