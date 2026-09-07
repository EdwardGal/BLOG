import * as yup from 'yup';

export const schema = yup.object().shape({
	category: yup.string().required('Заполните поле категория'),
	title: yup.string().required('Заполните поле заголовок'),
	description: yup.string().required('Заполните поле описание'),
	timeToRead: yup.string().required('Заполните поле время'),
	content: yup.string().required('Заполните поле текст статьи'),
});
