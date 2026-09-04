import { PageContainer } from '../PageContainer/PageContainer';
import styles from './PageError.module.scss';
import PropTypes from 'prop-types';

export const PageError = ({ error }) => {
	return (
		<div className={styles.error}>
			<PageContainer className={styles.error__container}>
				<div className={styles.error__content}>
					<div className={styles.error__title}>Ошибка</div>
					<div className={styles.error__message}>{error}</div>
				</div>
			</PageContainer>
		</div>
	);
};


PageError.propTypes = {
	error: PropTypes.node.isRequired,
};
