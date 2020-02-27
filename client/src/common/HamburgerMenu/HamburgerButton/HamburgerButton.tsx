import React, { MouseEvent } from 'react';
import './HamburgerButton.scss';

const HamburgerButton = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<MouseEvent>>;
}) => {
  return (
    <button
      className={`hamburger ${open ? 'open' : 'close'}`}
      onClick={setOpen}
    >
      <div />
      <div />
      <div />
    </button>
  );
};

export default HamburgerButton;
