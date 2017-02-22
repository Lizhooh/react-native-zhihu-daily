
import React from 'react';
import {
    AsyncStorage,
} from 'react-native';

const version = 4;
const protocol = 'http'; // or https

const themes = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/themes`,
    get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => console.error("themes api Error: " + err))
    },
};

const latest = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/stories/latest`,
    get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => console.error("latest api Error: " + err))
    }
};

const theme = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/theme/`,
    get(id) {
        return fetch(this.url + id)
            .then(res => res.json())
            .then(jsondata => jsondata)
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
            .catch(err => console.error("story api Error: " + err))
    }
};

// 文章点赞，评论信息
const storyExtra = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/story-extra/`,
    get(id) {
        return fetch(this.url + id)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => console.error("storyExtra api Error: " + err))
    }
};

// 加载更多的
const themeMore = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/theme/`,
    get(themeid, storyid) {
        return fetch(this.url + `${themeid}/before/${storyid}`)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => console.error("themeMore api Error: " + err))
    }
};

const homeMore = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/stories/before/`,
    get(lastDate) {
        return fetch(this.url + lastDate)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => console.error("homeMore api Error: " + err))
    }
};

// 评论
const longComments = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/story/`,
    get(id) {
        return fetch(this.url + `${id}/long-comments`)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => console.error("longComments api Error: " + err))
    }
};

const shortComments = {
    url: `${protocol}://news-at.zhihu.com/api/${version}/story/`,
    get(id) {
        return fetch(this.url + `${id}/short-comments`)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => console.error("shortComments api Error: " + err))
    }
};

const appStart = {
    url: `https://news-at.zhihu.com/api/7/prefetch-launch-images/720*1112`,
    get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(jsondata => jsondata)
            .catch(err => console.error("appStart api Error: " + err))
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
};

export default Api;

