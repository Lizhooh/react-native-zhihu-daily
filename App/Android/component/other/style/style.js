import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contanter: {
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
    leftTitle: {
        fontSize: 18,
        color: '#333',
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
});

const pice = StyleSheet.create({
    contanter: {
        width: window.width,
        height: 220,
        backgroundColor: '#fff',
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

export {
    styles,
    pice,
    editor,
};