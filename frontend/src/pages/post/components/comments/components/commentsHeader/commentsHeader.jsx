import PropTypes from 'prop-types';

import { Icon } from '../../../../../../components';

import styles from './commentsHeader.module.scss';

export const CommentsHeader = ({ count }) => {
	return (
		<div className={styles.commentsHeader}>
			<Icon name="MessageCircle" />

			<h2 className={styles.commentsHeader__title}>Комментарии</h2>

			<span className={styles.commentsHeader__count}>{count}</span>
		</div>
	);
};

CommentsHeader.propTypes = {
	count: PropTypes.number.isRequired,
};
