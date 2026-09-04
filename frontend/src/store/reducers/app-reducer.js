import { ACTION_TYPE } from '../../constants/action-type';

const initialAppState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		title: '',
		type: null,
		payload: null,
	},
};

export const appReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};

		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					isOpen: true,
					...payload,
				},
			};

		case ACTION_TYPE.CLOSE_MODAL:
			return {
				...state,
				modal: initialAppState.modal,
			};

		default:
			return state;
	}
};
