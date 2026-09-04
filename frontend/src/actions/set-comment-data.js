import { ACTION_TYPE } from '../constants/action-type';
export const setCommentData = (comment) => ({
	type: ACTION_TYPE.SET_COMMENT_DATA,
	payload: comment,
});
