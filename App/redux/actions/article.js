import { ARTICLE } from '../types';
import * as api from '../../api';

export const init = id => async (dispatch, getState) => {
    const [data, extra] = await Promise.all([api.story(id), api.storyExtra(id)]);
    dispatch({ type: ARTICLE.init_success, data, extra, id });
    return { data, extra };
}
