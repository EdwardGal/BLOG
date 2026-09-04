import clsx from 'clsx';
import styles from './SearchInput.module.scss';
import { Input } from '../../../Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectSearch } from '../../../../store/selectors';
import { setSearchPhrase } from '../../../../actions';
import { FormError } from '../../../FormError/FormError';
import PropTypes from 'prop-types';

export const SearchInput = ({ className }) => {
	const dispatch = useDispatch();
	const { searchPhrase, searchResultsCount } = useSelector(selectSearch);
	const [value, setValue] = useState(searchPhrase);

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(setSearchPhrase(value));
		}, 800);

		return () => clearTimeout(timer);
	}, [value, dispatch]);

	const onChange = ({ target }) => {
		setValue(target.value);
	};

	const shouldShowError =
		searchResultsCount === 0 && value.trim() !== '' && value === searchPhrase;

	return (
		<div className={clsx(styles.search, className)}>
			<div className={styles.search__container}>
				<Input
					className={styles.search__input}
					type="search"
					placeholder="Поиск статей, маршрутов, советов..."
					autoFocus
					iconName="Search"
					value={value}
					onChange={onChange}
				/>
				{shouldShowError && (
					<FormError error="По вашему запросу ничего не найдено" />
				)}
			</div>
		</div>
	);
};

SearchInput.propTypes = {
	className: PropTypes.string,
};
