import { LATEST, THEMELIST, MAIN } from '../types';
import * as api from '../../api';

export const init = (id, title) => async (dispatch, getState) => {
    // dispatch({ type: LATEST.init_in });
    if (id === -1) {
        const res = await api.latest();
        dispatch({ type: LATEST.init_success, data: res, id: -1, title });
    }
    else {
        const res = await api.themelist(id);
        dispatch({
            type: THEMELIST.init_success,
            data: res.stories,
            source: res,
            id: id,
            title: title,
        });
    }
}

export const updateTitle = title => ({ type: MAIN.title, title });

export const more = last => async (dispatch, getState) => {
    const { id } = getState().main;
    if (id === -1) {
        const res = await api.latestmore(last);
        dispatch({ type: LATEST.more_success, data: res });
        return res;
    }
    else {
        const res = await api.themelistmore(id, last);
        dispatch({ type: THEMELIST.more_success, data: res });
        return res;
    }
}

export const refresh = () => async (dispatch, getState) => {
    const { id, title } = getState().main;
    if (id === -1) {
        const res = await api.latest();
        dispatch({ type: LATEST.init_success, data: res, id: -1, title });
    }
    else {
        const res = await api.themelist(id);
        dispatch({
            type: THEMELIST.init_success,
            data: res.stories,
            source: res,
            id: id,
            title: title,
        });
    }
}
