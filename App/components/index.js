import React from 'react';
import { RefreshControl } from 'react-native';
import { color } from '../config';

export { default as Toolbar } from './toolbar';
export { default as Topbar } from './topbar';
export { default as Box } from './box';
export { default as Make } from './make';
export { default as SelectBox } from './select-box';


/**
 * 统一风格的刷新器
 */
export const Refresh = (props) => (
    <RefreshControl
        refreshing={false}
        tintColor={color}
        title="Loading..."
        titleColor={color}
        colors={[color]}
        progressBackgroundColor="#fff"
        {...props}
        />
);
