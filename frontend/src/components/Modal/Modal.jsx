import clsx from 'clsx';
import { Button } from '../Button/Button';
import { H2 } from '../H2/H2';
import { Icon } from '../Icon/Icon';
import styles from './Modal.module.scss';
import PropTypes from 'prop-types';

export const Modal = ({ title, text, onCancel, onConfirm }) => {
	return (
		<div className={styles.modal}>
			<div className={styles.modal__overlay}></div>
			<div className={styles.modal__content}>
				<div className={styles.modal__head}>
					<div className={styles.modal__icon}>
						<Icon name="TriangleAlert" size="20" color="#de3b3d" />
					</div>
					<H2 className={styles.modal__title}>{title}</H2>
				</div>
				<div className={styles.modal__text}>{text}</div>
				<div className={styles.modal__actions}>
					<Button
						className={clsx(styles.modal__action, styles.transparent)}
						onClick={onCancel}
					>
						Отмена
					</Button>
					<Button className={styles.modal__action} onClick={onConfirm}>
						Удалить
					</Button>
				</div>
			</div>
		</div>
	);
};


Modal.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.node.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
};
