import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './tableGrid.module.scss';

export const TableGrid = ({ children, className }) => {
	return <div className={clsx(styles.tableGrid, className)}>{children}</div>;
};

TableGrid.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
