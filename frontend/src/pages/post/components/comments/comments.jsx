import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ROLE } from '../../../../constants';
import { selectUser } from '../../../../store/selectors';

import { CommentsHeader, CommentForm, CommentList } from './components';

import styles from './comments.module.scss';

export const Comments = ({ comments, postId }) => {
	const { roleId } = useSelector(selectUser);

	const isGuest = roleId === ROLE.GUEST;

	return (
		<div className={styles.comments}>
			<CommentsHeader count={comments.length} />

			{!isGuest && <CommentForm postId={postId} />}

			{comments.length > 0 && (
				<CommentList comments={comments} postId={postId} />
			)}
		</div>
	);
};

Comments.propTypes = {
	comments: PropTypes.arrayOf(PropTypes.object).isRequired,
	postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
