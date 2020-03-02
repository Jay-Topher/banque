import React, { useState, useCallback, useEffect } from 'react';
import './Modal.scss';

const Modal = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  const [open, setOpen] = useState(false);

  const escClose = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escClose, false);

    return () => {
      document.removeEventListener('keydown', escClose, false);
    };
  }, []);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <div
        className={`modal-bg ${open ? 'open' : 'close'}`}
        onClick={() => setOpen(false)}
      ></div>
      <div className={`modal-main ${open ? 'show' : 'hide'}`}>
        <div className="close" role="button" onClick={() => setOpen(false)}>
          +
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
