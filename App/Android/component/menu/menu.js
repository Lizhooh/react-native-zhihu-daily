import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    ScrollView,
    InteractionManager,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Global from '../../Global';
import Toolbar from './box';

// ## 菜单视图
export default class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            themes: [
                { id: 13, name: '日常心理学', star: false },
                { id: 12, name: '用户推荐日报', star: false },
                { id: 3, name: '电影日报', star: false },
                { id: 11, name: '不许无聊', star: false },
                { id: 4, name: '设计日报', star: false },
                { id: 5, name: '大公司日报', star: false },
                { id: 6, name: '财经日报', star: false },
                { id: 10, name: '互联网安全', star: false },
                { id: 2, name: '开始游戏', star: false },
                { id: 7, name: '音乐日报', star: false },
                { id: 9, name: '动漫日报', star: false },
                { id: 8, name: '体育日报', star: false },
            ],
            active: -1,
        };
    }

    static defaultProps = {
        onSelectChanng: null,
    };

    static propTypes = {
        onSelectChanng: PropTypes.func.isRequired,
    };

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

                <Toolbar
                    style={styles.toolbar}
                    onUser={null}
                    onStar={null}
                    onDownload={null}
                    />

                <Touch
                    activeOpacity={1}
                    style={[styles.home, this.state.active === -1 && styles.active]}
                    onPress={(event) => {
                        this.setState({ active: -1 });
                        this.props.onSelectChanng(event, -1, '首页');
                    } }
                    >
                    <MaterialIcons
                        name="home"
                        size={20}
                        color={Global.themeColor}
                        />
                    <Text style={styles.homeText}>首页</Text>
                </Touch>

                <View style={styles.theme}>{
                    this.state.themes.map((it, index) => (
                        <Touch
                            style={[theme.item, this.state.active === it.id && styles.active]}
                            activeOpacity={1}
                            key={`theme-${index}`}
                            onPress={(event) => {
                                this.setState({ active: it.id });
                                this.props.onSelectChanng(event, it.id, it.name);
                            } }
                            >
                            <Text style={theme.text}>{it.name}</Text>
                            <MaterialIcons
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
        // backgroundColor: '#f4f4f4',
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

