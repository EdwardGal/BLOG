import { request } from '../utils';
import { setPostData } from './set-post-data';

export const loadPostAsync = (postId) => (dispatch) => {
	return request(`/posts/${postId}`).then((postData) => {
		if (!postData.error) {
			dispatch(setPostData(postData.data));
		}

		return postData;
	});
};
