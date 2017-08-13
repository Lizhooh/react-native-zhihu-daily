import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    FlatList,
} from 'react-native';
import { Box } from '../components';
import { color } from '../config';
import { Topbar, Refresh } from '../components';

export default class Theme extends Component {

    constructor(props) {
        super(props);
    }

    renderItem = ({ item, index }) => (
        <Box item={item} index={index} onPress={this.props.onPress} />
    );

    renderHeader = (source = {}) => (
        source &&
        <View style={{ marginBottom: 10 }}>
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
                            onPress={event => {
                                this.props.openEditors(event, source.editors)
                            } }
                            >
                            <Image
                                style={editor.avatar}
                                source={{ uri: it.avatar }}
                                />
                        </Touch>
                    ))
                }</View>
            </View>
        </View>
    );

    render() {
        const { data, refresh, source } = this.props;

        return (
            <View style={$.container}>
                <FlatList
                    data={data}
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderItem}
                    initialNumToRender={15}
                    refreshControl={
                        <Refresh onRefresh={null} refreshing={refresh || false} />
                    }
                    // removeClippedSubviews={false}
                    // renderHeader={() => this.renderHeader(hot)}
                    ListHeaderComponent={this.renderHeader(source)}
                    // renderSectionHeader={this.renderSectionHeader}
                    keyExtractor={item => item.id}
                    />
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
