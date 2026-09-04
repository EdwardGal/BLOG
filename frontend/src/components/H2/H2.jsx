import clsx from 'clsx';
import styles from './H2.module.scss';
import PropTypes from 'prop-types';

export const H2 = ({ className, children }) => {
	return <h2 className={clsx(styles.title, className)}>{children}</h2>;
};


H2.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};
