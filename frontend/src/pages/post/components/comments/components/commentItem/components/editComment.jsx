import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

import { Button, Icon, TextArea } from '../../../../../../../components';

import styles from './editComment.module.scss';

export const EditComment = ({
	isEdit,
	comment,
	onConfirmEdit,
	onCancelEdit,
	onUpdatedComment,
}) => {
	const textareaRef = useRef(null);

	useEffect(() => {
		if (!isEdit) return;

		const textarea = textareaRef.current;

		if (!textarea) return;

		textarea.focus();

		const position = textarea.value.length;
		textarea.setSelectionRange(position, position);
	}, [isEdit]);

	return (
		<div className={styles.editComment}>
			<TextArea
				ref={textareaRef}
				className={styles.editComment__area}
				value={comment}
				name="comment"
				onChange={({ target }) => onUpdatedComment(target.value)}
			>
				{comment}
			</TextArea>
			<div className={styles.editComment__actions}>
				<Button
					className={clsx(styles.editComment__action, styles.buttonTransparent)}
					onClick={onCancelEdit}
				>
					<Icon name="X" size="20"></Icon>
					<span>Отмена</span>
				</Button>
				<Button className={styles.editComment__action} onClick={onConfirmEdit}>
					<Icon name="Check" size="20" color="#f8f8f8"></Icon>
					<span>Сохранить</span>
				</Button>
			</div>
		</div>
	);
};

EditComment.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	comment: PropTypes.string.isRequired,
	onConfirmEdit: PropTypes.func.isRequired,
	onCancelEdit: PropTypes.func.isRequired,
	onUpdatedComment: PropTypes.func.isRequired,
};
