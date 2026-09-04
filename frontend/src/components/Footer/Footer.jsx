import { useState, useEffect } from 'react';
import styles from './Footer.module.scss';
import { WEATHER_API_KEY } from '../../constants';

export const Footer = () => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${WEATHER_API_KEY}&units=metric&lang=ru`,
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				(setCity(name),
					setTemperature(Math.round(main.temp)),
					setWeather(weather[0].description));
			});
	}, []);

	return (
		<footer className={styles.footer}>
			<div className={styles.footer__container}>
				<div className={styles.footer__text}>Блог про велосипеды</div>
				<ul className={styles.footer__list}>
					<li className={styles.footer__item}>
						{city},{' '}
						{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
					</li>
					<li className={styles.footer__item}>{temperature}°С</li>
					<li className={styles.footer__item}>{weather}</li>
				</ul>
			</div>
		</footer>
	);
};
