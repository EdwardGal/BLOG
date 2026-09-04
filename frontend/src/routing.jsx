import { createBrowserRouter } from 'react-router-dom';
import { MainLayout, AuthLayout } from './layouts';
import {
	Home,
	Authorization,
	Post,
	NotFound,
	Registration,
	Users,
} from './pages';
import { ROUTES } from './constants';

export const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: ROUTES.HOME,
				element: <Home />,
			},
			{
				path: ROUTES.POST,
				children: [
					{
						index: true,
						element: <Post />,
					},
					{
						path: ':id',
						element: <Post />,
					},
					{
						path: ':id/edit',
						element: <Post />,
					},
				],
			},
			{
				path: ROUTES.USERS,
				element: <Users />,
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: ROUTES.LOGIN,
				element: <Authorization />,
			},
			{
				path: ROUTES.REGISTER,
				element: <Registration />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);
