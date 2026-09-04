import PropTypes from 'prop-types';
import { CommentItem } from '../commentItem/commentItem';
import styles from './commentList.module.scss';

export const CommentList = ({ comments, postId }) => {
	return (
		<div className={styles.commentList}>
			{comments.map((comment) => (
				<CommentItem key={comment.id} {...comment} postId={postId} />
			))}
		</div>
	);
};

CommentList.propTypes = {
	comments: PropTypes.arrayOf(PropTypes.object).isRequired,
	postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
