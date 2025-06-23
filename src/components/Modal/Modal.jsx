import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '../../ds';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 90%;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  margin-bottom: 16px;
`;

const ModalContent = styled.div`
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  isDanger = false
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Text weight={600} type="h5">
            {title}
          </Text>
        </ModalHeader>
        <ModalContent>
          <Text color="neutral.700">
            {content}
          </Text>
        </ModalContent>
        <ButtonGroup>
          <Button 
            variant="secondary" 
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button 
            variant={isDanger ? "danger" : "primary"}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  isDanger: PropTypes.bool
};

export default Modal; 