import { TableGrid } from '../tableGrid/tableGrid';
import styles from './tableHead.module.scss';

export const TableHead = () => {
	return (
		<TableGrid className={styles.tableHead}>
			<div className={styles.tableHead__cell}>Имя</div>

			<div className={styles.tableHead__cell}>Почта</div>

			<div className={styles.tableHead__cell}>Дата регистрации</div>

			<div className={styles.tableHead__cell}>Роль</div>

			<div className={styles.tableHead__cell}>Действия</div>
		</TableGrid>
	);
};
