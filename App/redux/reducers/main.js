import { LATEST, THEMELIST, MAIN } from '../types';

const init_state = {
    id: -1,             // theme id, -1 为首页
    title: '首页',
    latest: {
        data: [],
        hot: [],
    },
    theme: {
        data: [],
        source: null,
    },

    // 加载
    refreshing: false,
    render: true,
};

export default (state = init_state, action) => {
    switch (action.type) {

        case MAIN.title: return {
            ...state,
            title: action.title,
            render: false,
        }

        case LATEST.init_success: return {
            ...state,
            latest: {
                data: [{ data: action.data.stories, title: action.data.date }],
                hot: action.data.top_stories,
            },
            refreshing: false,
            render: true,
            id: action.id,
            title: action.title,
        }

        case LATEST.more_success: return {
            ...state,
            latest: {
                ...state.latest,
                data: [
                    ...state.latest.data,
                    { data: action.data.stories, title: action.data.date }
                ]
            },
            render: true,
        }

        case THEMELIST.init_success: return {
            ...state,
            refreshing: false,
            theme: {
                data: action.data,
                source: action.source,
            },
            id: action.id,
            title: action.title,
        }

        case THEMELIST.more_success: return {
            ...state,
            theme: {
                ...state.theme,
                data: [...state.theme.data, ...action.data.stories],
            }
        }

        default: return state;
    }
}
