import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const CustomLink = ({ children, ...props }) => {
	return <Link {...props}>{children}</Link>;
};

CustomLink.propTypes = {
	children: PropTypes.node.isRequired,
};
