import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Button,
	Input,
	FormError,
	H2,
	Icon,
	CustomLink,
} from '../../components';
import { setUser } from '../../actions';
import { ROUTES } from '../../constants';
import { schema } from './schema';
import styles from './authorization.module.scss';
import { request } from '../../utils';

export const Authorization = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(schema),
		mode: 'onSubmit',
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(error);
					return;
				}
				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
				reset();
				navigate(ROUTES.HOME, { replace: true });
			},
		);
	};

	const clearServerError = () => setServerError(null);

	return (
		<div className={styles.login}>
			<div className={styles.login__head}>
				<div className={styles.login__icon}>
					<Icon name="Bike" size="28" color="#002014" />
				</div>
				<H2 className={styles.login__title}>С возвращением</H2>
				<div className={styles.login__subtitle}>
					Войдите, чтобы публиковать статьи и сохранять избранное
				</div>
			</div>

			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="email"
					placeholder="you@example.com"
					error={errors.login?.message}
					{...register('login', { onChange: clearServerError })}
				/>
				<Input
					type="password"
					error={errors.password?.message}
					placeholder="••••••••"
					{...register('password', { onChange: clearServerError })}
				/>
				<CustomLink className={styles.login__link} to={ROUTES.REGISTER}>
					Создать аккаунт
				</CustomLink>
				<Button className={styles.form__btn} type="submit">
					Войти
				</Button>
				{serverError && <FormError error={serverError} />}
			</form>
		</div>
	);
};
