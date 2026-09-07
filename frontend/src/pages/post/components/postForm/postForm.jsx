import clsx from 'clsx';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	Button,
	H2,
	Input,
	PageContainer,
	TextArea,
} from '../../../../components';

import { selectUser } from '../../../../store/selectors';

import { sanitizeContent } from './utils';

import styles from './postForm.module.scss';
import { savePostAsync } from '../../../../actions';

export const PostForm = ({ post }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			category: post.category ?? '',
			title: post.title ?? '',
			description: post.description ?? '',
			timeToRead: post.timeToRead ?? '',
			content: post.content ?? '',
			image: null,
		},
		resolver: yupResolver(schema),
	});

	const { id, publishedAt } = post;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { name } = useSelector(selectUser);

	const onSubmit = (data) => {
		const postData = new FormData();

		postData.append('author', name);
		postData.append('category', data.category.trim());
		postData.append('title', data.title.trim());
		postData.append('description', data.description.trim());
		postData.append('timeToRead', data.timeToRead.trim());
		postData.append('content', sanitizeContent(data.content));

		if (data.image) {
			postData.append('image', data.image);
		}

		dispatch(savePostAsync(id, postData)).then(({ id }) => {
			navigate(`/post/${id}`);
		});
	};

	return (
		<div className={styles.postForm}>
			<PageContainer className={styles.postForm__container}>
				<div className={styles.postForm__content}>
					<H2 className={styles.postForm__title}>
						{publishedAt ? `Редактор публикации: ${id}` : 'Новая публикация'}
					</H2>

					<form
						className={styles.postForm__form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<Input
							name="category"
							label="Категория"
							placeholder="Введите категорию"
							error={errors.category?.message}
							{...register('category')}
						/>

						<Input
							name="title"
							label="Заголовок"
							placeholder="Введите заголовок"
							error={errors.title?.message}
							{...register('title')}
						/>

						<Input
							name="description"
							label="Описание"
							placeholder="Введите описание"
							error={errors.description?.message}
							{...register('description')}
						/>

						<Input
							name="timeToRead"
							label="Время"
							placeholder="Введите время прочтения"
							error={errors.timeToRead?.message}
							{...register('timeToRead')}
						/>

						<Input
							type="file"
							id="image"
							name="image"
							accept="image/*"
							label="Изображение"
							error={errors.image?.message}
							onChange={(event) => {
								setValue('image', event.target.files?.[0] ?? null, {
									shouldValidate: true,
								});
							}}
						/>

						<TextArea
							name="content"
							label="Текст статьи"
							placeholder="Введите текст статьи"
							error={errors.content?.message}
							{...register('content')}
						/>

						<div className={styles.postForm__actions}>
							{publishedAt && (
								<Button
									className={clsx(
										styles.postForm__action,
										styles.buttonTransparent,
									)}
									type="button"
									onClick={() => navigate(`/post/${id}`)}
								>
									Отмена
								</Button>
							)}

							<Button className={styles.postForm__action} type="submit">
								{publishedAt ? 'Сохранить' : 'Опубликовать'}
							</Button>
						</div>
					</form>
				</div>
			</PageContainer>
		</div>
	);
};

PostForm.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		category: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		timeToRead: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		imageUrl: PropTypes.string,
		content: PropTypes.string,
		publishedAt: PropTypes.string,
	}).isRequired,
};
