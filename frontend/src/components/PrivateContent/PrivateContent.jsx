import { useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors';
import { ERROR } from '../../constants';
import { PageError } from '../PageError/PageError';
import { checkAccess } from '../../utils';
import PropTypes from 'prop-types';

export const PrivateContent = ({ serverError = null, access, children }) => {
	const { roleId } = useSelector(selectUser);

	const accessError = checkAccess(access, roleId) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;


	return error ? <PageError error={error} /> : children;
};



PrivateContent.propTypes = {
	serverError: PropTypes.node,
	access: PropTypes.arrayOf(PropTypes.number).isRequired,
	children: PropTypes.node.isRequired,
};
