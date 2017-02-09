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

export {
    styles
}

