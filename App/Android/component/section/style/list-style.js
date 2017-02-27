import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
        backgroundColor: '#f1f1f1',
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
});

export {
    styles,
};