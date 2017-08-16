
/**
 *  应用数据状态 action - type
 */

/** 扩展状态类型 */
const extendState = (obj) => {
    Object.keys(obj).forEach(key => {
        obj[key + '_in'] = obj[key] + '_in';                // 进行中
        obj[key + '_fail'] = obj[key] + '_fail';            // 失败了
        obj[key + '_success'] = obj[key] + '_success';      // 成功了
        obj[key + '_complete'] = obj[key] + '_complete';    // 完成了
    });
    return obj;
}

// 首页
export const LATEST = extendState({
    init: 'LATEST_init',
    more: 'LATEST_more',
    loading: 'LATEST_loading',
    refresh: 'LATEST_refesh',
});

// 其他主题
export const THEMELIST = extendState({
    init: 'THEMELIST_init',
    more: 'THEMELIST_more',
    loading: 'THEMELIST_loading',
    refresh: 'THEMELIST_refresh',
});

// main
export const MAIN = {
    title: 'MAIN_title',
};

// 文章
export const ARTICLE = extendState({
    init: 'ARTICLE_init',
    leave: 'ARTICLE_leave',
});

// 集合
export const SECTION = extendState({
    init: 'SECTION_init',
    more: 'SECTION_more',
    leave: 'SECTION_leave',
});

// 评论
export const COMMENT = extendState({
    init: 'COMMENT_init',
    smore: 'COMMENT_smore',
    lmore: 'COMMENT_lmore',
    leave: 'COMMENT_leave',
});
