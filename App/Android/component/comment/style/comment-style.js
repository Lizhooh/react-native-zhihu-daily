import { StyleSheet, Dimensions } from 'react-native';
import Global from '../../../Global';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    longComment: {
        minHeight: window.height - 55 - 25 - 46,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    shortComment: {
        minHeight: 45,
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const longComment = StyleSheet.create({
    title: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
    },
    item: {
        padding: 10,
        flexDirection: 'row',
    },
    itemLeft: {
        marginTop: 5,
        width: 50,
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    itemRight: {
        padding: 5,
        flex: 1,
    },
    author: {
        paddingBottom: 5,
        flexDirection: 'row',
    },
    authorText: {
        color: '#333',
        fontWeight: '600',
        flex: 1,
    },
    like: {
        flexDirection: 'row',
    },
    likeText: {
        color: "#bbb",
        fontSize: 12,
        marginLeft: 2,
    },
    content: {
    },
    contentText: {
        color: "#444",
        lineHeight: 23,
    },
    reply: {
        borderLeftColor: Global.themeColor,
        borderLeftWidth: 2,
        marginVertical: 3,
        marginLeft: 0,
        paddingLeft: 6,
    },
    replyAuthor: {
        color: '#333',
        fontWeight: '600',
    },
    replyText: {
        color: '#888',
        lineHeight: 23,
    },
    time: {
        marginTop: 10,
    },
    timeText: {
        color: '#bfbfbf',
        fontSize: 12,
    }
});

const shortComment = StyleSheet.create({
    title: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 45,
    }
});

export {
    styles,
    longComment,
    shortComment,
}