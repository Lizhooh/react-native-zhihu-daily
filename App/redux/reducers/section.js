import { SECTION } from '../types';

const init_state = {
    data: [],
    title: '合集',
    lasttime: 0,
    id: 0,
    refresh: false,
};

export default (state = init_state, action) => {
    switch (action.type) {

        case SECTION.init_in: return {
            ...state,
            refresh: true,
        }

        case SECTION.init_success: return {
            ...state,
            data: action.data.stories,
            refresh: false,
            lasttime: action.data.timestamp,
            title: action.data.name,
            id: action.id,
        }

        case SECTION.more_success: return {
            ...state,
            data: [...state.data, ...action.data.stories],
            lasttime: action.data.timestamp,
        }

        default: return state;
    }
}
