import * as yup from 'yup';

export const schema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните email')
		.email('Введите корректный email'),

	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знки # %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});
