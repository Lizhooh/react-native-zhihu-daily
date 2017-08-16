import { COMMENT } from '../types';

const init_state = {
    id: 0,
    ldata: [],          // 长评论数据
    sdata: [],          // 短评论数据

    refreshing: false,     // 加载
}

export default (state = init_state, action) => {
    switch (action.type) {

        case COMMENT.init_in: return {
            ...state,
            refreshing: true,
        }

        case COMMENT.init_success: return {
            ...state,
            id: action.id,
            ldata: action.ldata,
            sdata: action.sdata,
            refreshing: false
        }

        case COMMENT.leave: return {
            ...init_state,
        }

        case COMMENT.smore_success: return {
            ...state,
            sdata: [...state.sdata, ...action.sdata],
        }

        default: return state;
    }
}
