import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

import {
	Button,
	CustomLink,
	FormError,
	H2,
	Icon,
	Input,
} from '../../components';
import { ROLE, ROUTES } from '../../constants';
import { selectUser } from '../../store/selectors';

import { schema } from './schema';

import styles from './registration.module.scss';
import { request } from '../../utils';
import { setUser } from '../../actions';

export const Registration = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(schema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const { roleId } = useSelector(selectUser);

	const onSubmit = ({ name, login, password }) => {
		request('/register', 'POST', { name, login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(error);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
				reset();
			},
		);
	};

	if (roleId !== ROLE.GUEST) {
		return <Navigate to={ROUTES.HOME} replace />;
	}

	const onChangeInput = () => setServerError(null);

	return (
		<div className={styles.register}>
			<div className={styles.register__head}>
				<div className={styles.register__icon}>
					<Icon name="Bike" size="28" color="#002014" />
				</div>
				<H2 className={styles.register__title}>Присоединяйтесь к Pedal</H2>
				<div className={styles.register__subtitle}>
					Создайте аккаунт, чтобы писать статьи и следить за любимыми авторами
				</div>
			</div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Имя"
					type="text"
					placeholder="Илон в маске"
					error={errors.name?.message}
					{...register('name', { onChange: onChangeInput })}
				/>
				<Input
					label="Email"
					type="email"
					placeholder="you@example.com"
					error={errors.login?.message}
					{...register('login', { onChange: onChangeInput })}
				/>

				<Input
					label="Пароль"
					type="password"
					placeholder="Пароль..."
					error={errors.password?.message}
					{...register('password', { onChange: onChangeInput })}
				/>

				<Input
					label="Повтор пароля"
					type="password"
					placeholder="Повторите пароль..."
					error={errors.passcheck?.message}
					{...register('passcheck', { onChange: onChangeInput })}
				/>

				<Button className={styles.form__btn} type="submit">
					Зарегистрироваться
				</Button>

				{serverError && <FormError error={serverError} />}
			</form>

			<div className={styles.register__note}>
				Уже есть аккаунт?
				<CustomLink className={styles.register__link} to={ROUTES.LOGIN}>
					Войти
				</CustomLink>
			</div>
		</div>
	);
};
