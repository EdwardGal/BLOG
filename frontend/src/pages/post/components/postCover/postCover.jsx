import PropTypes from 'prop-types';
import styles from './postCover.module.scss';

export const PostCover = ({ title, imageUrl }) => {

	if (!imageUrl) {
		return null;
	}

	return (
		<div className={styles.postCover}>
			<img className={styles.postCover__image} src={imageUrl} alt={title} />
		</div>
	);
};

PostCover.propTypes = {
	title: PropTypes.string,
	imageUrl: PropTypes.string,
};
