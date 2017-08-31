import React, { Component } from 'react';
import { View } from 'react-native';


/**
 * 静态组件，控制渲染，性能优化
 * @param{Number} count: 渲染次数，默认一次
 * @param{render} render: 超过渲染次数后，决定是否可以渲染
 */
export default class StaticView extends Component {

    static defaultProps = {
        count: 1,
        render: false,
    }

    constructor(props) {
        super(props);
        this.renderCount = 0;
        this._count = this.props.count || 1;
        this._render = this.props.render || false;
    }

    componentWillReceiveProps(nextProps) {
        this._render = nextProps.render;
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.renderCount++;

        if (this.renderCount > this._count) {
            return this._render;
        }

        return true;
    }

    render() {
        const { style = null, children = null, ...props } = this.props;
        return (
            <View style={style} {...props}>
                {children}
            </View>
        );
    }
}
