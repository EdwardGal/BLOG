import { useEffect, useState } from 'react';
import { Logo, SearchInput, UserPanel } from './components';
import styles from './Header.module.scss';
import { PageContainer } from '../PageContainer/PageContainer';
import { useMatch } from 'react-router-dom';
import { ROUTES } from '../../constants';

export const Header = () => {
	const match = useMatch(ROUTES.HOME);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	useEffect(() => {
		if (!match) {
			setIsSearchOpen(false);
		}
	}, [match]);

	return (
		<header className={styles.header}>
			<PageContainer className={styles.header__container}>
				<div className={styles.header__content}>
					<Logo />

					<div className={styles.header__actions}>
						<UserPanel
							onSearchToggle={() => setIsSearchOpen((prev) => !prev)}
							isSearchOpen={isSearchOpen}
						/>
					</div>
				</div>

				{isSearchOpen && match && (
					<SearchInput className={styles.header__search} />
				)}
			</PageContainer>
		</header>
	);
};
