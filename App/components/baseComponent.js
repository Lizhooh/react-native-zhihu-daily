// baseComponent.js   component的基类方法
import React, { Component } from 'react';
import { is } from 'immutable';

export default class BaseComponent extends Component {

    constructor(props, context, updater) {
        super(props, context, updater);
    }

    // 在这里 props 都是 immutable 对象
    shouldComponentUpdate(nextProps, nextState) {
        const thisProps = this.props || {};
        const thisState = this.state || {};
        nextState = nextState || {};
        nextProps = nextProps || {};

        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true;
        }

        for (const key in nextProps) {
            if (!is(thisProps[key], nextProps[key])) {
                return true;
            }
        }

        for (const key in nextState) {
            if (!is(thisState[key], nextState[key])) {
                return true;
            }
        }

        return false;
    }
}
