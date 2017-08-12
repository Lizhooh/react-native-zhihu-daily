import { ARTICLE } from '../types';

const init_state = {
    id: 0,
    data: null,
};

export default (state = init_state, action) => {
    switch (action.type) {

        case ARTICLE.init_success: return {
            ...state,
            data: action.data,
            id: action.id,
        }

        case ARTICLE.leave_success: return init_state;

        default: return state;
    }
}
