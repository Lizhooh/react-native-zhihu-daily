import {
    StyleSheet,
    Dimensions,
    PixelRatio,
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
        backgroundColor: '#fff',
    },
    webview: {
    },

    modal: {
        flex: 1,
        backgroundColor: 'rgba(1, 1, 1, 0.5)',
    },

    footer: {
        margin: 20,
        marginBottom: 30,
        padding: 1 / PixelRatio.get(),
        backgroundColor: 'rgba(1, 1, 1, 0.04)',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 2,
        paddingRight: 5,
    },
    footerImage: {
        width: 50,
        height: 50,
    },
    footerContent: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        flex: 1,
    },
});

export {
    styles,
}