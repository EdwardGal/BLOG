import { ACTION_TYPE } from '../constants/action-type';

export const setPostData = (postData) => ({
	type: ACTION_TYPE.SET_POST_DATA,
	payload: postData,
});
