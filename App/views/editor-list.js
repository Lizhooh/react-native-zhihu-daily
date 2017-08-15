import React from 'react';
import {
    StyleSheet,
    View, Text, Image,
    TouchableOpacity as Touch,
    PixelRatio,
} from 'react-native';
import { Topbar } from '../components';

// ## 主编列表
export default ({data, navigator}) => (
    <View style={styles.contanier}>
        <Topbar title="主编" onBack={() => navigator.pop()} />

        <View style={styles.editors}>{
            // 主编列表
            data.map((it, index) => (
                <Touch
                    key={`editer-${index}`}
                    style={styles.editor}
                    activeOpacity={0.8}
                    onPress={() => navigator.push({ name: 'Editor', data: it.id })}
                    >

                    <View style={editor.left}>
                        <Image style={editor.avatar} source={{ uri: it.avatar }} />
                    </View>

                    <View style={editor.right}>
                        <Text style={editor.name}>{it.name}</Text>
                        <Text style={editor.bio}>{it.bio}</Text>
                    </View>

                </Touch>
            ))
        }</View>
    </View>
);


const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    },
    editors: {
        flex: 1,
    },
    editor: {
        flexDirection: 'row',
        backgroundColor: '#aaa',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee',
    }
});

const editor = StyleSheet.create({
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
