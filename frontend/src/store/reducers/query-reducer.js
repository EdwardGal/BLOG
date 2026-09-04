import { ACTION_TYPE } from '../../constants/action-type';

const initialQueryState = {
	searchPhrase: '',
	searchResultsCount: 0,
};

export const queryReducer = (state = initialQueryState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_SEARCH_PHRASE:
			return {
				...state,
				searchPhrase: payload,
			};
		case ACTION_TYPE.SET_SEARCH_RESULTS_COUNT:
			return {
				...state,
				searchResultsCount: payload,
			};

		default:
			return state;
	}
};
