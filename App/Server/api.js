
import React from 'react';
import {
    AsyncStorage,
    ToastAndroid,
} from 'react-native';

const version = 4;
const protocol = 'http'; // or https

const themes = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/themes`,
    get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1001', ToastAndroid.SHORT);
            })
    },
};

const latest = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/stories/latest`,
    get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1002', ToastAndroid.SHORT);
            })
    }
};

const theme = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/theme/`,
    get(id) {
        return fetch(this.url + id)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1003', ToastAndroid.SHORT);
            })
    }
};

const story = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/story/`,
    get(id) {
        return fetch(this.url + id)
            .then(res => res.json())
            .then(jsondata => {
                jsondata.style = '';

                if (Array.isArray(jsondata.css) && !jsondata.css.empty()) {
                    // 本地存储
                    // 1. 使用 AsyncStorage 存储 css
                    // 2. 判断 css 的 Url 变化，决定是否重新缓存
                    const link = jsondata.css[0];
                    const keyName = 'css';

                    return AsyncStorage.getItem(keyName).then(value => {
                        // 没有这个 key
                        if (value === null) {
                            return fetch(link)
                                .then(res => res.text())
                                .then(css => {
                                    jsondata.style = css;

                                    // 进行缓存 css
                                    return AsyncStorage
                                        .setItem(keyName, JSON.stringify({
                                            url: link,
                                            style: css,
                                        }))
                                        .then(_ => jsondata);
                                });
                        }

                        // 解析取到的值
                        const cssCache = JSON.parse(value);

                        // url 相等直接取缓存
                        if (cssCache.url === link) {
                            jsondata.style = cssCache.style;

                            return jsondata;
                        }
                        // 不相等，重新缓存
                        else {
                            return fetch(link)
                                .then(res => res.text())
                                .then(css => {
                                    jsondata.style = css;

                                    // 进行缓存 css
                                    return AsyncStorage
                                        .setItem(keyName, JSON.stringify({
                                            url: link,
                                            style: css,
                                        }))
                                        .then(_ => jsondata);
                                });
                        }
                    });
                }
                else {
                    return jsondata;
                }
            })
            .catch(err => {
                ToastAndroid.show('网络连接错误：1004', ToastAndroid.SHORT);
            })
    }
};

// 文章点赞，评论信息
const storyExtra = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/story-extra/`,
    get(id) {
        return fetch(this.url + id)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1005', ToastAndroid.SHORT);
            })
    }
};

// 加载更多的
const themeMore = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/theme/`,
    get(themeid, storyid) {
        return fetch(this.url + `${themeid}/before/${storyid}`)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1006', ToastAndroid.SHORT);
            })
    }
};

const homeMore = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/stories/before/`,
    get(lastDate) {
        return fetch(this.url + lastDate)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1007', ToastAndroid.SHORT);
            })
    }
};

// 评论
const longComments = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/story/`,
    get(id) {
        return fetch(this.url + `${id}/long-comments`)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1008', ToastAndroid.SHORT);
            })
    }
};

const shortComments = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/story/`,
    get(id) {
        return fetch(this.url + `${id}/short-comments`)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1009', ToastAndroid.SHORT);
            })
    }
};

const appStart = {
    url: `https://news-at.zhihu.com/api/7/prefetch-launch-images/720*1112`,
    get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1010', ToastAndroid.SHORT);
            })
    }
};

const section = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/section/`,
    get(id) {
        return fetch(this.url + id)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1011', ToastAndroid.SHORT);
            })
    }
};

// http://news-at.zhihu.com/api/4/section/35/before/1486476000
const sectionMore = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/section/`,
    get(id, lastTime) {
        return fetch(this.url + `${id}/before/${lastTime}`)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => {
                ToastAndroid.show('网络连接错误：1012', ToastAndroid.SHORT);
            })
    }
};

const Api = {
    themes,
    latest,
    theme,
    story,
    storyExtra,
    themeMore,
    homeMore,
    longComments,
    shortComments,
    appStart,
    section,
    sectionMore,
};

export default Api;

