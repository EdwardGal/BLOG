import clsx from 'clsx';
import styles from './pagination.module.scss';
import PropTypes from 'prop-types';
import { Button, Icon } from '../../../../../../components';

export const Pagination = ({ page, totalPages, setPage }) => {

	const handlePrevious = () => {
		setPage((prevPage) => prevPage - 1);
	};

	const handleNext = () => {
		setPage((prevPage) => prevPage + 1);
	};

	return (
		<div className={styles.pagination}>
			<div className={styles.pagination__content}>
				<Button
					className={styles.pagination__button}
					type="button"
					onClick={handlePrevious}
					disabled={page === 1}
				>
					<Icon name="ChevronLeft" size="20" color="#0f171f" />
				</Button>

				<div className={styles.pagination__pages}>
					{Array.from({ length: totalPages }, (_, index) => {
						const pageNumber = index + 1;

						return (
							<Button
								key={pageNumber}
								className={clsx(
									styles.pagination__button,
									pageNumber === page && styles.active,
								)}
								type="button"
								onClick={() => setPage(pageNumber)}
							>
								{pageNumber}
							</Button>
						);
					})}
				</div>

				<Button
					className={styles.pagination__button}
					type="button"
					onClick={handleNext}
					disabled={page === totalPages}
				>
					<Icon name="ChevronRight" size="20" color="#0f171f" />
				</Button>
			</div>
		</div>
	);
};


Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
