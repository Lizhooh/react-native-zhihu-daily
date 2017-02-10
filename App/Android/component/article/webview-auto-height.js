import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    WebView,
    TouchableOpacity as Touch,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Global from '../../Global';

// ## 自适应高度的 webview
export default class WebviewAutoHeight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            height: 0,
        };
    }

    static defaultProps = {
        css: '',
        htmlStyle: '',
        body: null,
        onloadHTML: () => { },
    };

    static propTypes = {
        css: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string,
        ]),
        body: PropTypes.string,
        htmlStyle: PropTypes.string,
        onloadHTML: PropTypes.func,
    };

    render() {
        let css;

        if (Array.isArray(this.props.css)) {
            css = this.props.css.map(it => `<link href="${it}" rel="stylesheet />`).join('\n');
        }
        else if (typeof this.props.css === 'string') {
            css = `<link href="${this.props.css}" rel="stylesheet" />`;
        }

        const body = this.props.body
            .replace('<div class="img-place-holder"></div>', '')
            .replace(/\<a/g, '<span style="color: #3C96EB;"')
            .replace(/\<\/a\>/g, '</span>')
            ;

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8"/>
                <meta content="width=device-width, initial-scale=1.0, user-scalable=0;" name="viewport" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                ${css}
            </head>
            <body>
                ${body}
                <script>
                    window.onload = function() {
                        window.location.hash = 1;
                        document.title = document.body.clientHeight;
                    }
                </script>
            </body>
            </html>
        `;

        return (
            <WebView
                domStorageEnabled={true}
                javaScriptEnabled={true}
                scalesPageToFit={false}
                style={{ height: this.state.height }}
                source={{ html: html }}
                onNavigationStateChange={(document) => {
                    if (document.title) {
                        this.props.onloadHTML(document);
                        if (this.state.height === document.title) return;
                        this.setState({
                            height: parseInt(document.title) + 50,
                        });
                    }
                } }
                />
        );
    }
}

const styles = StyleSheet.create({

});