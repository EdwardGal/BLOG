import { Link } from 'react-router-dom';
import styles from './postCard.module.scss';
import PropTypes from 'prop-types';
import { Author, Icon } from '../../../../../../components';

export const PostCard = ({
	id,
	category,
	imageUrl,
	title,
	description,
	author,
	publishedAt,
	timeToRead,
	comments,
}) => {

	return (
		<Link className={styles.postCard} to={`/post/${id}`}>
			<div className={styles.postCard__cover}>
				<img
					className={styles.postCard__image}
					src={imageUrl || null}
					alt={title}
				/>
			</div>
			<div className={styles.postCard__info}>
				<h3 className={styles.postCard__title}>{title}</h3>
				<div className={styles.postCard__description}>{description}</div>
				<Author
					className={styles.postCard__author}
					variant="card"
					author={author}
					publishedAt={publishedAt}
					timeToRead={timeToRead}
					comments={comments}
				/>

				<div className={styles.postCard__readMore}>
					<span>Читать</span>
					<Icon name="ArrowRight" size="20" />
				</div>
			</div>
			<div className={styles.postCard__category}>{category}</div>
		</Link>
	);
};

PostCard.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	category: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	author: PropTypes.object.isRequired,
	publishedAt: PropTypes.string.isRequired,
	timeToRead: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	commentsCount: PropTypes.number,
};
