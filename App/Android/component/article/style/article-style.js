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
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    header: {
        height: 230,
        width: window.width,
        backgroundColor: 'rgba(1, 1, 1, 0.05)',
    },
    image: {
        height: 230,
        width: window.width,
    },
    webview: {
    },
});

export {
    styles,
}