import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    ListView,
    InteractionManager,
    TouchableOpacity as Touch,
} from 'react-native';
import { connect } from 'react-redux';
import { sectionActions } from '../redux/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Topbar, Refresh } from '../components';

class Section extends Component {

    openArticle = (id) => {
        this.props.navigator.push({ name: 'Article', data: id, animated: 'top' });
    }

    renderItem = (item) => (
        <View style={$.box} key={`list-${item.id}`}>
            <Touch
                activeOpacity={0.7}
                style={$.touch}
                onPress={event => this.openArticle(item.id)}
                >
                <View style={$.left}>
                    <Text style={$.title}>{item.title}</Text>
                    <Text style={$.date}>{item.display_date}</Text>
                </View>
                {!!item.images &&
                    <View style={$.right}>
                        <Image
                            style={$.rightImg}
                            source={{ uri: item.images[0] }}
                            />
                        {item.multipic &&
                            <View style={$.multipic}>
                                <Icon name="filter-none" size={11} color="#fff" />
                                <Text style={$.multipicText}>多图</Text>
                            </View>
                        }
                    </View>
                }
            </Touch>
        </View>
    )

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    async componentDidMount() {
        await InteractionManager.runAfterInteractions();
        this.props.init(this.props.data.id);
    }

    render() {
        const { navigator, more, data: { name }, refresh } = this.props;
        let { id, data, title, refreshing } = this.props.state;

        if (id !== this.props.data.id) data = [];

        return (
            <View style={$.container}>
                <Topbar title={name} onBack={() => navigator.pop()} />

                <ListView
                    ref={r => this.listview = r}
                    dataSource={this.ds.cloneWithRows(data)}
                    renderRow={this.renderItem}
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderHeader={() => <View style={{ height: 10 }}></View>}
                    renderFooter={() => <View style={{ height: 10 }}></View>}
                    refreshControl={
                        <Refresh onRefresh={refresh} refreshing={refresh} />
                    }
                    enableEmptySections={true}
                    scrollRenderAheadDistance={500}
                    // 滚动刷新
                    onEndReachedThreshold={1000}
                    onEndReached={e => {
                        if (this.loadmore !== true && !data.empty()) {
                            this.loadmore = true;
                            more().then(res => this.loadmore = false);
                        }
                    } }
                    />
            </View>
        );
    }
}

export default connect(
    state => ({ state: state.section }),
    sectionActions,
)(Section);

const $ = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    box: {
        backgroundColor: '#ddd',
        margin: 10,
        marginHorizontal: 15,
        borderRadius: 3,
        paddingBottom: 1,
        overflow: 'hidden',
    },
    touch: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 15,
        paddingRight: 10,
        borderRadius: 3,
        minHeight: 80,
    },
    left: {
        flex: 1,
        paddingRight: 5,
    },
    title: {
        fontSize: 18,
        color: '#333',
        flex: 1,
    },
    right: {
        width: 100,
        height: 80,
    },
    rightImg: {
        width: 100,
        height: 80,
        borderRadius: 2,
    },
    multipic: {
        position: 'absolute',
        bottom: 0, right: 0,
        backgroundColor: 'rgba(1, 1, 1, 0.6)',
        flexDirection: 'row',
        padding: 3,
        alignItems: 'center',
    },
    multipicText: {
        fontSize: 11,
        color: '#fff',
        marginLeft: 3,
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 1,
        textShadowColor: 'rgba(1, 1, 1, 0.6)',
    },
    date: {
        height: 25,
        color: '#aaa',
    },
})
