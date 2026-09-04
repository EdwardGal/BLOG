import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { H2, Icon, PageContainer, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

import { selectUser } from '../../store/selectors';
import { checkAccess, request } from '../../utils';

import { TableHead, UserRow } from './components';

import styles from './users.module.scss';

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	const { roleId } = useSelector(selectUser);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], roleId)) {
			return;
		}
		Promise.all([request(`/users`), request('/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			},
		);
	}, [shouldUpdateUserList, roleId]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], roleId)) {
			return;
		}

		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={styles.users}>
			<PageContainer className={styles.users__container}>
				<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
					<div className={styles.users__content}>
						<div className={styles.users__head}>
							<div className={styles.users__label}>
								<div className={styles.users__icon}>
									<Icon name="Users" size="20" color="#002014" />
								</div>

								<H2 className={styles.users__title}>Пользователи</H2>
							</div>

							<div className={styles.users__info}>
								Всего участников: {users.length}. Меняйте роли и сохраняйте
								изменения.
							</div>
						</div>

						<div className={styles.users__table}>
							<TableHead />

							<div className={styles.users__body}>
								{users.map((user) => (
									<UserRow
										key={user.id}
										{...user}
										roles={roles.filter(({ id }) => Number(id) !== ROLE.GUEST)}
										onUserRemove={() => onUserRemove(user.id)}
									/>
								))}
							</div>
						</div>
					</div>
				</PrivateContent>
			</PageContainer>
		</div>
	);
};
