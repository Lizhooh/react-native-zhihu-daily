
import { StyleSheet } from 'react-native';
import { Global } from '../../common';

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
        backgroundColor: Global.themeColor,
    },
    toolbar: {
        height: 55,
        backgroundColor: 'rgba(30, 150, 255, 0.0)',
    },
    otherToolbar: {
        height: 55,
        backgroundColor: Global.themeColor,
        position: 'absolute',
        top: -55,
        left: 0, right: 0,
        zIndex: -1,
        justifyContent: 'center',
    },
    otherToolbarText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 60,
        fontWeight: '100',
    }
});


export {
    styles
}