import { ACTION_TYPE } from '../constants/action-type';

export const setSearchResultsCount = (count) => ({
	type: ACTION_TYPE.SET_SEARCH_RESULTS_COUNT,
	payload: count,
});
