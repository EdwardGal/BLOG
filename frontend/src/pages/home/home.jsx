import { PageContainer } from '../../components';
import { HomeHeader, HomePosts } from './components';
import styles from './home.module.scss';

export const Home = () => {
	return (
		<section className={styles.home}>
			<PageContainer className={styles.home__container}>
				<HomeHeader />
				<HomePosts />
			</PageContainer>
		</section>
	);
};
