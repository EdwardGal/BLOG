import { Link } from 'react-router-dom';

import { Icon, PageContainer } from '../../components';
import { ERROR, ROUTES } from '../../constants';

import styles from './notfound.module.scss';

export const NotFound = () => {
	return (
		<div className={styles.notFound}>
			<PageContainer className={styles.notFound__container}>
				<div className={styles.notFound__content}>
					<div className={styles.notFound__icon}>
						<Icon name="Bike" size="56" color="#002014" />
					</div>

					<span className={styles.notFound__label}>404</span>

					<div className={styles.notFound__title}>Страница не найдена.</div>

					<div className={styles.notFound__subtitle}>
						Похоже, вы свернули не на тот трейл. Возможно, страница переехала
						или её никогда не существовало.
					</div>

					<Link className={styles.notFound__link} to={ROUTES.HOME}>
						На главную
					</Link>
				</div>
			</PageContainer>
		</div>
	);
};
