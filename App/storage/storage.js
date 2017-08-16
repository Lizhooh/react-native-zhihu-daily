import { AsyncStorage } from 'react-native';

/**
 * json 数据存储
 */
export default storage = {
    async get(key) {
        return JSON.parse(await AsyncStorage.getItem(key));
    },
    async set(key, value) {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    async remove(key) {
        return await AsyncStorage.removeItem(key);
    },
    async has(key) {
        return !(await this.get(key) === null);
    }
}

