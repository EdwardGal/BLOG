import { ACTION_TYPE } from '../constants/action-type';

export const removeComment = (commentId) => ({
	type: ACTION_TYPE.REMOVE_COMMENT,
	payload: commentId,
});
