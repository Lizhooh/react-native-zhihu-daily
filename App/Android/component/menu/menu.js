import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    ScrollView,
} from 'react-native';

import { Global } from '../common';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ## 菜单视图
export default class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // 默认
            themes: require('./themes.json'),
            active: -1,
        };
    }

    static defaultProps = {
        onSelectChanng: null,
        data: null,
    };

    static propTypes = {
        onSelectChanng: PropTypes.func.isRequired,
        data: PropTypes.object,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            if (Array.isArray(nextProps.data.others)) {
                this.setState({ themes: nextProps.data });
            }
        }
    }

    render() {
        if (this.props.drawer) {
            this._drawer = this.props.drawer;
        }

        return (
            <ScrollView
                style={styles.contanter}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode='on-drag'
                >

                <View style={styles.toolbar}>
                    <View style={box.top}>
                        <View style={box.img}>
                            <Image
                                style={box.img}
                                source={require('./img/user.jpg')}
                                />
                        </View>
                        <Text style={box.login}>请登录</Text>
                    </View>
                    <View style={box.bottom}>
                        <View style={box.pick}>
                            <Icon
                                name="star"
                                color="#fff"
                                size={20}
                                />
                            <Text style={box.pickText}>我的收藏</Text>
                        </View>
                        <View style={box.pick}>
                            <Icon
                                name="file-download"
                                color="#fff"
                                size={18}
                                />
                            <Text style={box.pickText}>离线下载</Text>
                        </View>
                    </View>
                </View>

                <Touch
                    activeOpacity={1}
                    style={[styles.home, this.state.active === -1 && styles.active]}
                    onPress={event => {
                        this.setState({ active: -1 });
                        this.props.onSelectChanng(event, -1, '首页');
                    } }
                    >
                    <Icon
                        name="home"
                        size={20}
                        color={Global.themeColor}
                        />
                    <Text style={styles.homeText}>首页</Text>
                </Touch>

                <View style={styles.theme}>{
                    this.state.themes.others.map((it, index) => (
                        <Touch
                            style={[theme.item, this.state.active === it.id && styles.active]}
                            activeOpacity={1}
                            key={`theme-${index}`}
                            onPress={event => {
                                this.setState({ active: it.id });
                                this.props.onSelectChanng(event, it.id, it.name);
                            } }
                            >
                            <Text style={theme.text}>{it.name}</Text>
                            <Icon
                                style={theme.icon}
                                name="add"
                                color="#ccc"
                                size={19}
                                />
                        </Touch>
                    ))
                }
                </View>

            </ScrollView>
        );
    }
}


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
        width: 30,
        height: 30,
        borderRadius: 30,
    },
    login: {
        color: '#fff',
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

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
        backgroundColor: Global.themeColor,
    },
    toolbar: {
        height: 110,
        backgroundColor: Global.themeColor,
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
        color: Global.themeColor,
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
