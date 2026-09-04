import styles from './FormError.module.scss';
import PropTypes from 'prop-types';

export const FormError = ({ error }) => {
	return <div className={styles.error__message}>{error}</div>;
};

FormError.propTypes = {
	error: PropTypes.node,
};
