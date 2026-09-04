import * as yup from 'yup';

export const schema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните имя')
		.matches(/^[а-яА-ЯёЁa-zA-Z]+$/, 'Имя может содержать только буквы')
		.min(2, 'Имя должно содержать минимум 2 символа')
		.max(20, 'Имя должно содержать максимум 20 символов'),
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
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});
