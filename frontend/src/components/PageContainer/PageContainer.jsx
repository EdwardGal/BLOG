import PropTypes from 'prop-types';

export const PageContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};


PageContainer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};
