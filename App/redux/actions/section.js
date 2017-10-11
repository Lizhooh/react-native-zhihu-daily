import { SECTION } from '../types';
import * as api from '../../api';

export const init = id => async (dispatch, getState) => {
    dispatch({ type: SECTION.init_in });
    const data = await api.section(id);
    dispatch({ type: SECTION.init_success, data, id });
}

export const more = () => async (dispatch, getState) => {
    const { id, lasttime } = getState().section;
    const data = await api.sectionmore(id, lasttime);
    dispatch({ type: SECTION.more_success, data });
    return data.stories;
}

export const refresh = () => async (dispatch, getState) => {
    const { id } = getState().section;
    const data = await api.section(id);
    dispatch({ type: SECTION.init_success, data, id });
}
