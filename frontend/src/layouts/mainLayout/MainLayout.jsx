import { Outlet } from 'react-router-dom';
import { Footer, Header, ModalContainer } from '../../components';
import styles from './mainLayout.module.scss';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions';



export const MainLayout = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }),
		);
	}, [dispatch]);

	return (
		<>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
			<ModalContainer />
		</>
	);
};
