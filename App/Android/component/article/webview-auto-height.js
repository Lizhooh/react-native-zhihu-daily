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

        // 使用 window.onload 会被重写的可能
        this.script =
            `
                (function __isComplete() {
                    if (document.readyState == "complete" &&
                        document.documentElement.offsetWidth > 0) {

                        window.location.hash = 1;
                        document.title = document.body.clientHeight;

                        var imglist = [].slice.call(document.querySelectorAll('img'));

                        function imgOnClick(event) {
                            window.postMessage &&
                            window.postMessage(event.target.src);
                        }

                        for(var i in imglist) {
                            imglist[i].removeEventListener('click', imgOnClick);
                            imglist[i].addEventListener('click', imgOnClick);
                        }
                    }
                    else {
                        setTimeout(__isComplete, 25);
                    }
                })();
            `;
    }

    static defaultProps = {
        css: '',
        htmlStyle: '',
        body: null,
        onloadHTML: () => { },
        onImagePress: () => { },
    };

    static propTypes = {
        css: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string,
        ]),
        body: PropTypes.string,
        htmlStyle: PropTypes.string,
        onloadHTML: PropTypes.func,
        onImagePress: PropTypes.func.isRequired,
    };

    render() {

        const body = this.props.body;
        const css = this.props.css;

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8"/>
                <meta content="width=device-width, initial-scale=1.0, user-scalable=0;" name="viewport" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <style>
                    ${css}
                    .headline {border-bottom: none !important;}
                    .img-place-holder {height: 0 !important;}
                    .view-more a {color: #aaa !important;}
                    .content {color: #444;}
                    a {color: ${Global.themeColor} !important;}
                    blockquote {border-left: 3px solid #D0E5F2; color: #888;}
                    blockquote em { font-weight: normal !important;}
                </style>
            </head>
            <body>
                ${body}
                <script>
                    ${this.script}
                </script>
            </body>
            </html>
        `;

        // body 会有 null
        if (this.props.body) {
            var source = { html: html };
        }
        else {
            var source = { url: this.props.url };
        }

        return (
            <WebView
                domStorageEnabled={true}
                javaScriptEnabled={true}
                scalesPageToFit={false}
                style={[{ height: this.state.height }, this.props.style]}
                source={source}
                injectedJavaScript={this.script}
                onMessage={this.props.onImagePress}
                onNavigationStateChange={(document) => {
                    if (document.title) {
                        this.props.onloadHTML(document);
                        if (this.state.height === document.title) return;

                        this.setState({
                            height: parseInt(document.title) + 60,
                        });
                    }
                } }
                />
        );
    }
}
