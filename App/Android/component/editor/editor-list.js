import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity as Touch,
    PixelRatio,
} from 'react-native';

import Toolbar from './toolbar';

// ## 主编列表
export default ({data, navigator}) => (
    <View style={styles.contanier}>
        <Toolbar title="主编" onBack={() => navigator.pop()} />

        <View style={styles.editers}>{
            // 主编列表
            data.map((it, index) => (
                <Touch
                    key={`editer-${index}`}
                    style={styles.editer}
                    activeOpacity={0.8}
                    onPress={() => {
                        navigator.push({
                            id: 6,
                            title: '主编资料',
                            data: { id: it.id }
                        });
                    } }
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