import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './TextArea.module.scss';
import PropTypes from 'prop-types';
import { FormError } from '../FormError/FormError';

export const TextArea = forwardRef(
	({ id, className, label, error, ...props }, ref) => {
		const inputId = id ?? props.name;

		return (
			<div className={styles.field}>
				{label && (
					<label className={styles.field__label} htmlFor={inputId}>
						{label}
					</label>
				)}
				<textarea
					id={inputId}
					ref={ref}
					className={clsx(styles.field__area, className)}
					{...props}
				/>
				{error && <FormError className={styles.field__error} error={error} />}
			</div>
		);
	},
);

TextArea.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string,
};
