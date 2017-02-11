import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // 实现浮动层
    toolbar: {
        position: 'absolute',
        top: -window.height + 25,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    body: {
        flex: 1,
        paddingTop: 53,
    },
    header: {
        height: 220,
        width: window.width,
        backgroundColor: 'rgba(1, 1, 1, 0.05)',
    },
    image: {
        height: 220,
        width: window.width,
    },
    webview: {
    },
    recommenders: {
        height: 60,
        backgroundColor: '#efefef',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    text: {
        color: '#333',
    },
    box: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        flex: 1,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 30,
    },
});

export {
    styles,
}