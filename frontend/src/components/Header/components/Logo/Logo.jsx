import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import { Icon } from '../../../Icon/Icon';
import styles from './Logo.module.scss';

export const Logo = () => {
	return (
		<Link to={ROUTES.HOME} className={styles.logo} aria-label="Главная">
			<Icon
				className={styles.logo__icon}
				name="Bike"
				size="28"
				title="Главная"
			/>
			<span className={styles.logo__title}>Pedal</span>
		</Link>
	);
};
