import clsx from 'clsx';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

export const Button = ({ children, className, ...props }) => {
	return (
		<button className={clsx(styles.button, className)} {...props}>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
