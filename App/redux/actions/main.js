import { LATEST, THEMELIST, MAIN } from '../types';
import * as api from '../../api';


export const init = () => async (dispatch, getState) => {
    dispatch({ type: LATEST.init_in });
    const res = await api.latest();
    dispatch({ type: LATEST.init_success, data: res });
}

export const updateTitle = title => ({ type: MAIN.title, title });
