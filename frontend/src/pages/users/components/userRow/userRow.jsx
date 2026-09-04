import PropTypes from 'prop-types';
import { useState } from 'react';

import { Button, Icon } from '../../../../components';

import { TableGrid } from '../tableGrid/tableGrid';

import styles from './userRow.module.scss';
import { request } from '../../../../utils';

export const UserRow = ({
	id,
	name,
	login,
	createdAt,
	roleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRolId] = useState(roleId);
	const [selectedRoleId, setSelectedRoleId] = useState(roleId);

	const onRoleChange = ({ target }) => setSelectedRoleId(Number(target.value));

	const onRoleSave = (userId, newUserRoleId) =>
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRolId(newUserRoleId);
		});

	const isButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<TableGrid className={styles.userRow}>
			<div className={styles.userRow__user}>
				<div className={styles.userRow__avatar}>{login.slice(0, 2)}</div>

				<span>{name}</span>
			</div>

			<div className={styles.userRow__cell}>{login}</div>

			<div className={styles.userRow__cell}>{createdAt}</div>

			<div className={styles.userRow__cell}>
				<select
					className={styles.userRow__select}
					value={selectedRoleId}
					onChange={onRoleChange}
				>
					{roles.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
			</div>

			<div className={styles.userRow__actions}>
				<Button
					disabled={isButtonDisabled}
					onClick={() => onRoleSave(id, selectedRoleId)}
				>
					<Icon name="Save" color="#006951" />
				</Button>

				<Button onClick={onUserRemove}>
					<Icon name="Trash2" color="#de3b3d" />
				</Button>
			</div>
		</TableGrid>
	);
};

UserRow.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	name: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	roleId: PropTypes.number.isRequired,
	roles: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		}),
	).isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
