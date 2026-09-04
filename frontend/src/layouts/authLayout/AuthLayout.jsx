import { Link, Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { CustomLink, Icon, PageContainer } from '../../components';
import styles from './AuthLayout.module.scss';



export const AuthLayout = () => {
	const userData = sessionStorage.getItem('userData');

	if (userData) {
		return <Navigate to={ROUTES.HOME} replace />;
	}

	return (
		<div className={styles.auth}>
			<PageContainer className={styles.auth__container}>
				<div className={styles.auth__wrapper}>
					<CustomLink className={styles.auth__link}>
						<Icon className={styles.auth__icon} name="ArrowLeft" size="20" />
						Вернуться на главную
					</CustomLink>
					<div className={styles.auth__content}>
						<Outlet />
					</div>
				</div>
			</PageContainer>
		</div>
	);
};
