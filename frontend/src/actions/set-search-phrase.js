import { ACTION_TYPE } from '../constants/action-type';

export const setSearchPhrase = (searchPhrase) => ({
	type: ACTION_TYPE.SET_SEARCH_PHRASE,
	payload: searchPhrase,
});
