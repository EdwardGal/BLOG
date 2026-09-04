import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../Button/Button';
import { ROLE, ROUTES } from '../../../../constants';
import { Icon } from '../../../Icon/Icon';
import styles from './UserPanel.module.scss';
import { selectUser } from '../../../../store/selectors';
import clsx from 'clsx';
import { checkAccess } from '../../../../utils';
import PropTypes from 'prop-types';
import { logout } from '../../../../actions';

export const UserPanel = ({ onSearchToggle, isSearchOpen }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { roleId, name } = useSelector(selectUser);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={styles.userPanel}>
			<nav className={styles.userPanel__navigation}>
				<Button
					className={clsx(
						styles.userPanel__search,
						isSearchOpen && styles.active,
					)}
					onClick={onSearchToggle}
				>
					<Icon
						name="Search"
						size="20"
						color={isSearchOpen ? '#f8f8f8' : '#006951'}
					/>
				</Button>
				<Button
					className={styles.userPanel__navigationLink}
					aria-label="Вернуться назад"
					onClick={() => navigate(-1)}
				>
					<Icon name="ArrowLeft" title="Вернуться назад" />
				</Button>

				{isAdmin && (
					<>
						<Link
							className={styles.userPanel__newPost}
							to={ROUTES.POST}
							aria-label="Новый пост"
						>
							<Icon name="FilePlus2" title="Создать пост" />
						</Link>
						<Link
							className={styles.userPanel__users}
							to={ROUTES.USERS}
							aria-label="Пользователи"
						>
							<Icon name="Users" title="Пользователи" />
						</Link>
					</>
				)}
			</nav>
			<div className={styles.userPanel__actions}>
				{roleId === ROLE.GUEST ? (
					<Link to={ROUTES.LOGIN}>
						<Button className={styles.userPanel__btn}>Войти</Button>
					</Link>
				) : (
					<>
						<div className={styles.userPanel__loginName}>
							{name?.slice(0, 2)}
						</div>
						<Button variant="logout" onClick={onLogout}>
							<Icon name="LogOut" title="Выйти"></Icon>
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

UserPanel.propTypes = {
	onSearchToggle: PropTypes.func.isRequired,
	isSearchOpen: PropTypes.bool.isRequired,
};
