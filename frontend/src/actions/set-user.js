import { ACTION_TYPE } from '../constants/action-type';

export const setUser = (user) => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
});
