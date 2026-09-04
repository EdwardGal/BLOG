import PropTypes from 'prop-types';
import styles from './postContent.module.scss';

export const PostContent = ({ content }) => {
	return <div className={styles.postContent}>{content}</div>;
};

PostContent.propTypes = {
	content: PropTypes.node.isRequired,
};
