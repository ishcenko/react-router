import React, { useEffect, useState } from 'react';
import { StyledModal, StyledOverlay } from './styled';
import PropTypes from 'prop-types';

const Modal = ({ visibleData, onCloseModal }) => {
  const [dataType, setDataType] = useState('emails');
  // const btnEmailsRef = useRef();
  // const btnUserRef = useRef();
  // console.log('visibleData: ', visibleData);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal(event);
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal(event);
      }
    };
    console.log('Modal has Mounter');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  useEffect(() => {
    console.log(dataType);
  }, [dataType]);

  const onSetDataType = newDataType => {
    setDataType(newDataType);
  };

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  return (
    <StyledOverlay onClick={handleOverlayClick}>
      <StyledModal>
        <button className="modal-close" onClick={onCloseModal}>
          &times;
        </button>
        <br />
        <div className="buttonType">
          <button
            className={`button-type ${dataType === 'emails' ? 'active' : ''}`}
            onClick={() => {
              onSetDataType('emails');
              // btnUserRef.current.focus();

              // console.log(window.getComputedStyle(btnEmailsRef.current).color);
            }}
            // ref={btnEmailsRef}
            type="button"
          >
            Emails
          </button>
          <button
            className={`button-type ${dataType === 'users' ? 'active' : ''}`}
            onClick={() => onSetDataType('users')}
            // ref={btnUserRef}
            type="button"
          >
            Users
          </button>
          <button
            className={`button-type ${dataType === 'comments' ? 'active' : ''}`}
            onClick={() => onSetDataType('comments')}
            type="button"
          >
            Comments
          </button>
        </div>
        <h2>Active dataType: {dataType} </h2>
        {!Array.isArray(visibleData) && JSON.stringify(visibleData, null, 2)}
        {dataType === 'emails' && (
          <ul>
            {Array.isArray(visibleData) &&
              visibleData.map(comment => (
                <li key={comment.id}>{comment.email}</li>
              ))}{' '}
          </ul>
        )}
        {dataType === 'users' && (
          <ul>
            {Array.isArray(visibleData) &&
              visibleData.map(comments => (
                <li key={comments.id}>{comments.name}</li>
              ))}{' '}
          </ul>
        )}
        {dataType === 'comments' && (
          <ul>
            {Array.isArray(visibleData) &&
              visibleData.map(comment => (
                <li key={comment.id}>{comment.body}</li>
              ))}{' '}
          </ul>
        )}
      </StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  visibleData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
