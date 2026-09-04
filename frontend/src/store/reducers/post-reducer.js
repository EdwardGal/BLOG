import { ACTION_TYPE } from '../../constants/action-type';

const initialPostState = {
	id: '',
	author: '',
	category: '',
	title: '',
	description: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	timeToRead: '',
	comments: [],
};

export const postReducer = (state = initialPostState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, payload],
			};
		case ACTION_TYPE.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter((comment) => comment.id !== payload),
			};
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...payload,
			};
		case ACTION_TYPE.RESET_POST_DATA:
			return initialPostState;

		// case ACTION_TYPE.SET_COMMENT_DATA:
		// 	return {
		// 		...state,
		// 		comments: state.comments.map((comment) =>
		// 			comment.id === payload.id ? payload : comment,
		// 		),
		// 	};

		default:
			return state;
	}
};
