import { AsyncStorage } from 'react-native';


export const saveCSS = async jsondata => {
    jsondata.style = '';

    if (Array.isArray(jsondata.css) && jsondata.css.length > 0) {
        // 本地存储
        // 1. 使用 AsyncStorage 存储 css
        // 2. 判断 css 的 Url 变化，决定是否重新缓存
        const link = jsondata.css[0];
        const keyName = 'css';
        const value = await AsyncStorage.getItem(keyName);

        // 没有这个值
        if (value === null) {
            let css = await fetch(link).then(res => res.text());
            jsondata.style = css;
            await AsyncStorage.setItem(keyName, JSON.stringify({
                url: link,
                style: css,
            }));
            return jsondata;
        }

        // 解析取到的值
        const cssCache = JSON.parse(value);
        // url 相等直接取缓存
        if (cssCache.url === link) {
            jsondata.style = cssCache.style;
            return jsondata;
        }
        // 不相等，重新缓存
        let css = await fetch(link).then(res => res.text());
        await AsyncStorage.setItem(keyName, JSON.stringify({
            url: link,
            style: css,
        }));
        return jsondata;
    }
    else {
        return jsondata;
    }
}
