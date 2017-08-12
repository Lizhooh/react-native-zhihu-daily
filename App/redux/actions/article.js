import { ARTICLE } from '../types';
import * as api from '../../api';

export const init = id => async (dispatch, getState) => {
    let data = await api.story(id);
    dispatch({ type: ARTICLE.init_success, data, id });
}

export const leave = () => ({ type: ARTICLE.leave_success });
