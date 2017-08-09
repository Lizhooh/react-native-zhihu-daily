import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navigator from './navigator';
import './functions';

// 入口点
export default () => (
    <Provider store={store}>
        <Navigator />
    </Provider>
);

const $ = StyleSheet.create({
    container: {
        flex: 1,
    }
});
