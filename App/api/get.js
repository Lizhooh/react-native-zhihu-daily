import qs from 'qs';

export default (url, query = null) => {
    query && (url += `?${qs.stringify(query)}`);

    console.log(url);

    return fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(url);
            console.log(res);
            if (res === '') throw new Error('json error');
            return res;
        })
        .catch(err => {
            console.error('get:', url, '. Error:', err);
        });
}
