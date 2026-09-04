import { ACTION_TYPE } from '../constants/action-type';

export const addComment = (comment) => ({
	type: ACTION_TYPE.ADD_COMMENT,
	payload: comment,
});
