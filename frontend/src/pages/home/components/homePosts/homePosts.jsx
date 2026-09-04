import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormError } from '../../../../components';
import { PAGINATION_LIMIT } from '../../../../constants';
import { selectSearch } from '../../../../store/selectors';
import { Pagination, PostCard } from './components';
import styles from './homePosts.module.scss';
import { request } from '../../../../utils';
import { setSearchResultsCount } from '../../../../actions';


export const HomePosts = () => {
	const dispatch = useDispatch();

	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	const { searchPhrase } = useSelector(selectSearch);

	useEffect(() => {
		setPage(1);
	}, [searchPhrase]);

	useEffect(() => {
		setIsLoading(true);

		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { lastPage, posts } }) => {
			setPosts(posts);
			setLastPage(lastPage);
			dispatch(setSearchResultsCount(posts.length));
			setIsLoading(false);
		});
	}, [dispatch, page, searchPhrase]);

	if (isLoading) {
		return null;
	}

	return (
		<>
			{posts.length === 0 ? (
				<FormError error="По вашему запросу ничего не найдено" />
			) : (
				<div className={styles.homePosts}>
					{posts.map((post) => (
						<PostCard key={post.id} {...post} />
					))}
				</div>
			)}

			{lastPage > 1 && (
				<Pagination page={page} totalPages={lastPage} setPage={setPage} />
			)}
		</>
	);
};
