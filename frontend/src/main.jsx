import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';
import './styles/root.scss';


const root = createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
