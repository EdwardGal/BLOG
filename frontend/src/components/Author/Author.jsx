import clsx from 'clsx';
import { Icon } from '../Icon/Icon';
import styles from './Author.module.scss';
import { useMatch } from 'react-router-dom';
import { ROUTES } from '../../constants';
import PropTypes from 'prop-types';

export const Author = ({
	className,
	variant,
	author,
	publishedAt,
	timeToRead,
	comments,
}) => {
	const match = useMatch(ROUTES.HOME);
	return (
		<div className={clsx(styles.author, styles[variant], className)}>
			<div className={styles.author__avatar}>{author.slice(0, 2)}</div>
			<div className={styles.author__info}>
				<div className={styles.author__name}>{author}</div>
				<div className={styles.author__details}>
					<span className={styles.author__date}>
						<Icon name="Calendar" size="16" color="#0f171f" />
						{publishedAt}
					</span>
					<span className={styles.author__time}>
						<Icon name="Clock" size="16" color="#0f171f" />
						{timeToRead}
					</span>
				</div>
			</div>

			{match && (
				<div className={styles.author__comments}>
					<Icon
						className={styles.author__commentsIcon}
						name="MessageCircle"
						size="20"
					/>
					<span className={styles.author__commentsCounter}>
						{comments === undefined ? 0 : comments.length}
					</span>
				</div>
			)}
		</div>
	);
};

Author.propTypes = {
	className: PropTypes.string,
	variant: PropTypes.string,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	timeToRead: PropTypes.number.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
