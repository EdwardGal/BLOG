import PropTypes from 'prop-types';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button, Icon } from '../../../../../../components';

import { ROLE } from '../../../../../../constants';
import { selectUser } from '../../../../../../store/selectors';

import { checkAccess } from '../../../../../../utils';

import { EditComment } from './components';

import styles from './commentItem.module.scss';
import { openModal, saveCommentAsync } from '../../../../../../actions';

export const CommentItem = ({
	author,
	authorId,
	publishedAt,
	content,
	id: commentId,
	postId,
}) => {
	const [isEdit, setIsEdit] = useState(false);
	const [comment, setComment] = useState(content);

	const { id, roleId } = useSelector(selectUser);

	const dispatch = useDispatch();

	const onRemoveComment = () => {
		dispatch(
			openModal({
				title: 'Удалить комментарий?',
				text: 'Комментарий будет удалён без возможности восстановления.',
				type: 'DELETE_COMMENT',
				payload: {
					postId,
					commentId,
				},
			}),
		);
	};

	const onSaveComment = () => {
		dispatch(saveCommentAsync(postId, commentId, comment));
		setIsEdit(!isEdit);
	};

	const checkRole = authorId === id || checkAccess([ROLE.ADMIN,ROLE.MODERATOR], roleId);

	return (
		<article className={styles.comment}>
			<div className={styles.comment__avatar}>{author.slice(0, 2)}</div>
			<div className={styles.comment__body}>
				<div className={styles.comment__info}>
					<div className={styles.comment__meta}>
						<span className={styles.comment__author}>{author}</span>
						<time className={styles.comment__date}>{publishedAt}</time>
					</div>
					{checkRole && (
						<div className={styles.comment__actions}>
							<Button
								className={styles.comment__action}
								onClick={() => setIsEdit(!isEdit)}
							>
								<Icon name="Pencil" />
							</Button>
							<Button
								className={styles.comment__action}
								onClick={onRemoveComment}
							>
								<Icon name="Trash2" color="#de3b3d" />
							</Button>
						</div>
					)}
				</div>
				{isEdit ? (
					<EditComment
						isEdit={isEdit}
						comment={comment}
						onConfirmEdit={onSaveComment}
						onCancelEdit={() => {
							setIsEdit(!isEdit);
							setComment(content);
						}}
						onUpdatedComment={(value) => setComment(value)}
					/>
				) : (
					<p className={styles.comment__text}>{comment}</p>
				)}
			</div>
		</article>
	);
};

CommentItem.propTypes = {
	author: PropTypes.shape({
		id: PropTypes.string,
		login: PropTypes.string,
	}).isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
