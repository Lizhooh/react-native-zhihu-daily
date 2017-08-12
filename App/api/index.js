import get from './get';
import { saveCSS } from '../storage';

const version = 4;
const host = 'http://news-at.zhihu.com'; // or https

function replace(str, target, value) {
    if (Array.isArray(target) && Array.isArray(value)) {
        for (let i = 0, len = target.length; i < len; i++) {
            str = str.replace(new RegExp(`${target[i]}`, 'g'), value[i]);
        }
    }
    return str.replace(new RegExp(`${target}`, 'g'), value);
}

const zhd = {
    // 菜单栏主题
    themes: `${host}/api/${version}/themes`,
    // 最新的文章列表
    latest: `${host}/api/${version}/stories/latest`,
    // 最新的文章列表加载更多
    latestmore: `${host}/api/${version}/stories/before/:lastdate`,
    // 主题列表
    themelist: `${host}/api/${version}/theme/:id`,
    // 主题列表加载更多
    themelistmore: `${host}/api/${version}/theme/:id/before/:storyid`,
    // 文章
    story: `${host}/api/${version}/story/:id`,
    // 文章点赞，评论信息
    storyExtra: `${host}/api/${version}/story-extra/:id`,
    // 长评论
    longcomments: `${host}/api/${version}/story/:id/long-comments`,
    // 短评论
    shortcomments: `${host}/api/${version}/story/:id/short-comments`,
    // 合集
    section: `${host}/api/${version}/section/:id`,
    // 集合更多
    sectionmore: `${host}/api/${version}/section/:id/before/:lasttime`,
}

export const themes = () => get(zhd.themes);
export const latest = () => get(zhd.latest);
export const latestmore = (lastdate) => get(replace(zhd.latestmore, ':lastdate', lastdate));
export const themelist = (id) => get(replace(zhd.themelist, ':id', id));
export const themelistmore = (id, sid) => get(replace(zhd.themelistmore, [':id', ':storyid'], [id, sid]));
export const story = (id) => get(replace(zhd.story, ':id', id)).then(jsondata => saveCSS(jsondata));
export const storyExtra = (id) => get(replace(zhd.storyExtra, ':id', id));
export const longcomments = (id) => get(replace(zhd.longcomments, ':id', id));
export const shortcomments = (id) => get(replace(zhd.shortcomments, ':id', id));
export const section = (id) => get(replace(zhd.section, ':id', id));
export const sectionmore = (id, lasttime) => get(replace(zhd.sectionmore, [':id', ':lasttime'], id, lasttime));

