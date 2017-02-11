
import React from 'react';
import ReactNative from 'react-native';

const version = 4;
const protocol = 'http'; // or https

const themes = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/themes`,
    get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(jsondata => {
                return jsondata;
            })
            .catch(err => console.error("themes api Error: " + err))
    },
};

const latest = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/stories/latest`,
    get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(jsondata => {
                return jsondata;
            })
            .catch(err => console.error("latest api Error: " + err))
    }
};

const theme = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/theme/`,
    get(id) {
        return fetch(this.url + id)
            .then(res => res.json())
            .then(jsondata => {
                return jsondata;
            })
            .catch(err => console.error("theme api Error: " + err))
    }
};

const story = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/story/`,
    get(id) {
        return fetch(this.url + id)
            .then(res => res.json())
            .then(jsondata => {
                jsondata.style = '';

                if (Array.isArray(jsondata.css) && jsondata.css.length > 0) {
                    return fetch(jsondata.css[0])
                        .then(res => res.text())
                        .then(css => {
                            jsondata.style = css;

                            return jsondata;
                        });
                }
                else {
                    return jsondata;
                }
            })
            .catch(err => console.error("story api Error: " + err))
    }
};

const storyExtra = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/story-extra/`,
    get(id) {
        return fetch(this.url + id)
            .then(res => res.json())
            .then(jsondata => {
                return jsondata;
            })
            .catch(err => console.error("storyExtra api Error: " + err))
    }
};

const Api = {
    themes,
    latest,
    theme,
    story,
    storyExtra,
};

export default Api;

