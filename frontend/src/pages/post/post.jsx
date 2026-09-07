import { useEffect, useLayoutEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';

import { PageContainer, PageError, PrivateContent } from '../../components';

import { ROLE } from '../../constants';
import { selectPost } from '../../store/selectors';

import {
	Comments,
	PostHeader,
	PostContent,
	PostCover,
	PostForm,
} from './components';

import styles from './post.module.scss';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';

export const Post = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();
	const { id } = useParams();

	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');

	const post = useSelector(selectPost);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);

		dispatch(loadPostAsync(id))
			.then((postData) => {
				if (postData.error) {
					setError(postData.error);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [dispatch, id, isCreating]);

	if (isLoading) {
		return null;
	}

	const specificPostPage =
		isEditing || isCreating ? (
			<PrivateContent access={[ROLE.ADMIN, ROLE.MODERATOR]} serverError={error}>
				<PostForm post={post} />
			</PrivateContent>
		) : (
			<>
				<article className={styles.post__article}>
					<PostHeader
						id={post.id}
						category={post.category}
						title={post.title}
						description={post.description}
						author={post.author}
						publishedAt={post.publishedAt}
						timeToRead={post.timeToRead}
					/>

					<PostCover title={post.title} imageUrl={post.imageUrl} />

					<PostContent content={post.content} />
				</article>

				<Comments comments={post.comments} postId={post.id} />
			</>
		);

	return (
		<div className={styles.post}>
			<PageContainer className={styles.post__container}>
				{error ? <PageError error={error} /> : specificPostPage}
			</PageContainer>
		</div>
	);
};
