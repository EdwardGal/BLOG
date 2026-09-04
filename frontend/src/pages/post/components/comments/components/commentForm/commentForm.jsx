import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, TextArea } from '../../../../../../components';



import styles from './commentForm.module.scss';
import { addCommentAsync } from '../../../../../../actions';

export const CommentForm = ({ postId }) => {
	const [comment, setComment] = useState('');

	const dispatch = useDispatch()

	const newCommentAdd = () => {
		dispatch(addCommentAsync(postId, comment));
		setComment('');
	};

	const onChange = ({ target }) => {
		setComment(target.value);
	};

	return (
		<div className={styles.commentForm}>
			<div className={styles.commentForm__field}>
				<div className={styles.commentForm__avatar}>ВЫ</div>

				<TextArea
					className={styles.commentForm__input}
					placeholder="Поделитесь мнением о статье..."
					name="comment"
					value={comment}
					onChange={onChange}
				/>
			</div>

			<Button
				className={styles.commentForm__submit}
				disabled={!comment.trim()}
				onClick={newCommentAdd}
			>
				<Icon name="Send" color="#f8f8f8" />
				Отправить
			</Button>
		</div>
	);
};

CommentForm.propTypes = {
	postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
