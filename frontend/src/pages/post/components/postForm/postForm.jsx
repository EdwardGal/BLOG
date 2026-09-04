import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

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

const getFormData = (post) => ({
	id: post.id ?? '',
	category: post.category ?? '',
	title: post.title ?? '',
	description: post.description ?? '',
	timeToRead: post.timeToRead ?? '',
	imageUrl: post.imageUrl ?? '',
	content: post.content ?? '',
});

export const PostForm = ({ post }) => {
	const { id, publishedAt } = post;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { name } = useSelector(selectUser);

	const [formData, setFormData] = useState(() => getFormData(post));

	useEffect(() => {
		setFormData(getFormData(post));
	}, [post]);

	const onChange = ({ target }) => {
		const { name, value } = target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onFormSave = () => {
		const postData = {
			author: name,
			category: formData.category.trim(),
			imageUrl: formData.imageUrl.trim(),
			title: formData.title.trim(),
			description: formData.description.trim(),
			timeToRead: formData.timeToRead.trim(),
			content: sanitizeContent(formData.content),
		};

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

					<div className={styles.postForm__form}>
						<Input
							name="category"
							label="Категория"
							value={formData.category}
							onChange={onChange}
							placeholder="Введите категорию"
						/>

						<Input
							name="title"
							label="Заголовок"
							value={formData.title}
							onChange={onChange}
							placeholder="Введите заголовок"
						/>

						<Input
							name="description"
							label="Описание"
							value={formData.description}
							onChange={onChange}
							placeholder="Введите описание"
						/>

						<Input
							name="timeToRead"
							label="Время"
							value={formData.timeToRead}
							onChange={onChange}
							placeholder="Введите время прочтения"
						/>

						<Input
							name="imageUrl"
							label="URL обложки"
							value={formData.imageUrl}
							onChange={onChange}
							placeholder="Введите URL картинки"
						/>

						<TextArea
							name="content"
							label="Текст статьи"
							value={formData.content}
							onChange={onChange}
							placeholder="Введите текст статьи"
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

							<Button
								className={styles.postForm__action}
								type="button"
								onClick={onFormSave}
							>
								{publishedAt ? 'Сохранить' : 'Опубликовать'}
							</Button>
						</div>
					</div>
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
