import { ARTICLE } from '../types';

const init_state = {
    id: 0,
    data: null,
    extra: {},
};

export default (state = init_state, action) => {
    switch (action.type) {

        case ARTICLE.init_success: return {
            ...state,
            data: action.data,
            extra: action.extra,
            id: action.id,
        }

        default: return state;
    }
}
