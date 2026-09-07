import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, H2, Author } from '../../../../components';

import { ROLE } from '../../../../constants';
import { selectUser } from '../../../../store/selectors';
import { checkAccess, shareLink } from '../../../../utils';

import styles from './postHeader.module.scss';
import { openModal } from '../../../../actions';

export const PostHeader = ({
	id,
	category,
	title,
	description,
	author,
	publishedAt,
	timeToRead,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { roleId } = useSelector(selectUser);

	const onRemovePost = () => {
		dispatch(
			openModal({
				title: 'Удалить публикацию?',
				text: 'Публикация будет удалёна без возможности восстановления.',
				type: 'DELETE_POST',
				payload: {
					id,
				},
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN,ROLE.MODERATOR], roleId);

	return (
		<div className={styles.postHeader}>
			<div className={styles.postHeader__category}>{category}</div>
			<H2 className={styles.postHeader__title}>{title}</H2>
			<div className={styles.postHeader__description}>{description}</div>
			<div className={styles.postHeader__meta}>
				<Author
					author={author}
					publishedAt={publishedAt}
					timeToRead={timeToRead}
				/>
				<div className={styles.postHeader__actions}>
					<Button
						className={styles.postHeader__action}
						onClick={() => shareLink(title)}
					>
						<Icon name="Share2" size="20" color="#3c1401" />
					</Button>

					{isAdmin && (
						<div className={styles.postHeader__postActions}>
							<Button className={styles.postHeader__action}>
								<Icon
									name="Pencil"
									size="20"
									color="#3c1401"
									onClick={() => navigate(`/post/${id}/edit`)}
								/>
							</Button>
							<Button
								className={styles.postHeader__action}
								onClick={onRemovePost}
							>
								<Icon name="Trash2" size="20" color="#de3b3d" />
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

PostHeader.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	category: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	author: PropTypes.object.isRequired,
	publishedAt: PropTypes.string.isRequired,
	timeToRead: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
