import * as Icons from 'lucide-react';
import PropTypes from 'prop-types';

export const Icon = ({ name, color = '#006951', ...props }) => {
	const LucideIcon = Icons[name];

	if (!LucideIcon) return null;

	return <LucideIcon color={color} {...props} />;
};


Icon.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string,
};
