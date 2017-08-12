

// 全局初始状态数据
export const ROOT_INIT_STATE = {};

export default (state = ROOT_INIT_STATE, action) => {
    switch (action.type) {
        default: return state;
    }
}

// state 树分支
export { default as main } from './main';
export { default as article } from './article';
