import clsx from 'clsx';
import styles from './Input.module.scss';
import { Icon } from '../Icon/Icon';
import PropTypes from 'prop-types';
import { FormError } from '../FormError/FormError';



export const Input = ({ id, label, error, className, iconName, ...props }) => {
	const inputId = id ?? props.name;

	return (
		<div className={styles.field}>
			{label && (
				<label className={styles.field__label} htmlFor={inputId}>
					{label}
				</label>
			)}

			<div className={styles.field__line}>
				{iconName && (
					<Icon className={styles.field__icon} name={iconName} size="20" />
				)}
				<input
					id={inputId}
					className={clsx(styles.field__input, className)}
					{...props}
				/>
			</div>

			{error && <FormError className={styles.field__error} error={error} />}
		</div>
	);
};

Input.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.node,
	className: PropTypes.string,
	iconName: PropTypes.string,
};
