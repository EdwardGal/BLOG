import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './TextArea.module.scss';
import PropTypes from 'prop-types';

export const TextArea = forwardRef(
	({ id, className, label, ...props }, ref) => {
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
			</div>
		);
	},
);


TextArea.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string,
};
