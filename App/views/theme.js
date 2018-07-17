import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    ListView,
} from 'react-native';
import { Box } from '../components';
import { Refresh } from '../components';
import StaticView from 'react-static-view/react-native';

export default class Theme extends Component {

    constructor(props) {
        super(props);
    }

    renderItem = (item) => (
        <Box item={item} onPress={this.props.onPress} />
    );

    renderHeader = (source = {}) => (
        source &&
        <StaticView style={{ marginBottom: 10 }}>
            {/* 背景图 */}
            <Touch
                style={pice.contanter}
                activeOpacity={0.9}
                onPress={null}
                >
                <Image
                    style={pice.contanter}
                    source={{ uri: source.background }}
                    />
                <View style={pice.box}>
                    <Text style={pice.text}>{
                        source.description
                    }</Text>
                </View>
            </Touch>
            {/* 主编 */}
            <View style={editor.contanter}>
                <Text style={editor.text}>主编</Text>
                <View style={editor.list}>{
                    source.editors &&
                    source.editors.map((it, index) => (
                        <Touch
                            key={`editors-${index}`}
                            style={editor.user}
                            activeOpacity={0.8}
                            onPress={e => this.props.openEditor(source.editors)}
                            >
                            <Image
                                style={editor.avatar}
                                source={{ uri: it.avatar }}
                                />
                        </Touch>
                    ))
                }</View>
            </View>
        </StaticView>
    );

    componentWillReceiveProps(nextProps) {
        if (this.props.source.name !== nextProps.source.name) {
            setTimeout(() => {
                this.listview.scrollTo({ x: 0, y: 0, animated: true });
            }, 30);
        }
        return true;
    }

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    render() {
        const { data, refresh, source, onMore, onRefresh } = this.props;

        return (
            <View style={$.container}>
                <ListView
                    ref={r => this.listview = r}
                    dataSource={this.ds.cloneWithRows(data)}
                    renderRow={this.renderItem}
                    refreshControl={
                        <Refresh onRefresh={onRefresh} refreshing={false} />
                    }
                    renderHeader={() => this.renderHeader(source)}
                    overScrollMode='never'
                    // showsHorizontalScrollIndicator={false}
                    // showsVerticalScrollIndicator={false}
                    initialListSize={15}
                    scrollRenderAheadDistance={500}
                    enableEmptySections={true}
                    // 滚动刷新
                    onEndReachedThreshold={1000}
                    onEndReached={e => {
                        if (this.loadmore !== true) {
                            this.loadmore = true;
                            onMore().then(res => this.loadmore = false);
                        }
                    } }
                    />

                <View style={{ height: 10 }}></View>
            </View>
        );
    }
}

const $ = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    }
});

const pice = StyleSheet.create({
    contanter: {
        width: window.width,
        height: 220,
        backgroundColor: 'rgba(1, 1, 1, 0.4)',
    },
    box: {
        position: 'absolute',
        bottom: 10,
        top: 0,
        left: 0, right: 0,
        paddingHorizontal: 10,
        zIndex: 1,
        justifyContent: 'flex-end',

    },
    text: {
        fontSize: 20,
        color: '#fff',
    },
});

const editor = StyleSheet.create({
    contanter: {
        paddingBottom: 0,
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#eee',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    text: {
        fontSize: 16,
    },
    list: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    user: {
        width: 30,
        height: 30,
        borderRadius: 30,
        marginHorizontal: 5,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 30,
    },
});
