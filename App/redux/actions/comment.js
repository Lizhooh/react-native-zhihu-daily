import { COMMENT } from '../types';
import * as api from '../../api';

export const init = id => async (dispatch, getState) => {
    dispatch({ type: COMMENT.init_in });
    const [ldata, sdata] = await Promise.all([
        api.longcomments(id),
        api.shortcomments(id)
    ]);
    dispatch({
        type: COMMENT.init_success,
        id,
        ldata: ldata.comments,
        sdata: sdata.comments,
    });
}

export const leave = () => ({ type: COMMENT.leave });

// 加载更多
export const smore = () => async (dispatch, getState) => {
    const { id, sdata } = getState().comment;
    const res = await api.shortcommentsmore(id, sdata.last().id);
    dispatch({ type: COMMENT.smore_success, sdata: res.comments });
    return res.comments;
}

// 加载更多
export const lmore = () => async (dispatch, getState) => {
    const { id, ldata } = getState().comment;
    const res = await api.longcommentsmore(id, ldata.last().id);
    dispatch({ type: COMMENT.lmore_success, ldata: res.comments });
    return res.comments;
}
