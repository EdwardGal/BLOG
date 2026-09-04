import { useDispatch, useSelector } from 'react-redux';
import { Modal } from './Modal';
import { selectModal } from '../../store/selectors';

import { closeModal, removeCommentAsync, removePostAsync } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

export const ModalContainer = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const modal = useSelector(selectModal);

	if (!modal.isOpen) {
		return null;
	}

	const onCancel = () => {
		dispatch(closeModal());
	};

	const onConfirm = async () => {
		switch (modal.type) {
			case 'DELETE_COMMENT':
				dispatch(
					removeCommentAsync(modal.payload.postId, modal.payload.commentId),
				);
				break;

			case 'DELETE_POST':
				dispatch(removePostAsync(modal.payload.id));

				navigate(ROUTES.HOME);
				break;

			default:
				break;
		}

		onCancel();
	};

	return (
		<Modal
			title={modal.title}
			text={modal.text}
			onConfirm={onConfirm}
			onCancel={onCancel}
		/>
	);
};
