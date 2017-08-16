import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text,
    WebView,
    TouchableOpacity as Touch,
    ActivityIndicator,
} from 'react-native';

import { color } from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ## 自适应高度的 webview
export default class WebviewAutoHeight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            height: 60,
            opacity: 0,
        };

        this.script =
            `
            window.addEventListener('load', function(event) {
                window.location.hash = 1;
                document.title = document.body.clientHeight;

                var alist = [].slice.call(document.querySelectorAll('a'));

                function imgOnClick(event) {
                    window.postMessage &&
                    window.postMessage(event.target.src);
                    return false;
                }

                for(var i in alist) {
                    (function(i) {
                        alist[i].href = '';
                        alist[i].onclick = function() { return false };
                    })(i);
                }
            });
            `;
    }

    render() {

        const {
            body, css, url, style,
            onImagePress = () => { }, onLoad = () => { }
        } = this.props;

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8"/>
                <meta content="width=device-width, initial-scale=1.0, user-scalable=0;" name="viewport" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <style>
                    ${css}
                    body{ -webkit-tap-highlight-color:rgba(0, 0, 0, 0); }
                    .headline {border-bottom: none !important;}
                    .img-place-holder {height: 0 !important;}
                    .view-more a {color: #aaa !important;}
                    .content {color: #444;}
                    a {color: ${color} !important;}
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

        return (
            <View collapsable={true}>
                <WebView
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={false}
                    style={[{ height: this.state.height, opacity: this.state.opacity }, style]}
                    source={body ? { html: html } : { url: url }}
                    injectedJavaScript={this.script}
                    onMessage={onImagePress}
                    onNavigationStateChange={(document) => {
                        if (document.title) {
                            if (this.state.height === document.title) return;
                            this.setState({
                                height: (Number.parseInt(document.title) + 5),
                                opacity: 1,
                            }, () => {
                                setTimeout(() => {
                                    onLoad(document)
                                }, 100);
                            });
                        }
                    } }
                    />
                {this.state.opacity === 0 &&
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator color={color} size='small' />
                    </View>
                }
            </View>
        );
    }
}
