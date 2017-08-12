import qs from 'qs';

export default (url, query = null) => {
    query && (url += `?${qs.stringify(query)}`);

    return fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(url);
            console.log(res);
            return res;
        })
        .catch(err => {
            console.error('get:', url, '. Error:', err);
        });
}
