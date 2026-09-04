import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	postReducer,
	postsReducer,
	userReducer,
	usersReducer,
	queryReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
	query: queryReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk)),
);
