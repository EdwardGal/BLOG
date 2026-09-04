import { request } from '../utils';
import { setCommentData } from './set-comment-data';

export const saveCommentAsync =
	(postId, commentId, updatedComment) => async (dispatch) => {
		return request(`/posts/${postId}/comments/${commentId}`, 'PATCH', {
			content: updatedComment,
		}).then((comment) => {
			dispatch(setCommentData(comment.data));

			return comment.data;
		});
	};
