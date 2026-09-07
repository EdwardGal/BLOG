import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ROLE } from '../../../../constants';
import { selectUser } from '../../../../store/selectors';
import { checkAccess } from '../../../../utils';

import styles from './homeHeader.module.scss';

export const HomeHeader = () => {
	const { roleId } = useSelector(selectUser);

	const isAdmin = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);

	return (
		<div className={styles.homeHeader}>
			<div className={styles.homeHeader__label}>Блог про велосипеды</div>
			<h1 className={styles.homeHeader__title}>
				Находите свой следующий маршрут
			</h1>
			<div className={styles.homeHeader__subtitle}>
				Обзоры, маршруты, советы по обслуживанию и истории из мира велосипедов.
			</div>

			{isAdmin && (
				<div className={styles.homeHeader__actions}>
					<Link
						className={clsx(styles.homeHeader__action, styles.secondary)}
						to="/post"
					>
						Написать пост
					</Link>
				</div>
			)}
		</div>
	);
};
