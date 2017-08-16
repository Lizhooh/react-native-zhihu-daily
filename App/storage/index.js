import storage from './storage';

/**
 * 本地存储
 * 1. 使用 AsyncStorage 存储 css
 * 2. 判断 css 的 Url 变化，决定是否重新缓存
 */
export const saveCSS = async jsondata => {
    jsondata.style = '';

    if (Array.isArray(jsondata.css) && !jsondata.css.empty()) {
        const link = jsondata.css[0];
        const keyName = 'css';
        const value = await storage.has(keyName);

        // 没有这个值
        if (value === false) {
            let css = await fetch(link).then(res => res.text());
            jsondata.style = css;
            await storage.set(keyName, { url: link, style: css });
            return jsondata;
        }

        // 解析取到的值
        const cssCache = await storage.get(keyName);

        // url 相等直接取缓存
        if (cssCache.url === link) {
            jsondata.style = cssCache.style;
            return jsondata;
        }
        // 不相等，重新缓存
        let css = await fetch(link).then(res => res.text());
        await storage.set(keyName, { url: link, style: css });
        return jsondata;
    }
    else {
        return jsondata;
    }
}

/**
 * 缓存最新的首页数据
 */
export const cacheLatest = {
    key: 'cacheLatest',
    get() {
        return storage.get(this.key);
    },
    set(data) {
        return storage.set(this.key, data);
    }
}

