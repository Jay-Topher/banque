import React from 'react';

interface IButton {
  style?: React.CSSProperties;
  styleButton: React.CSSProperties | any;
  buttonName: string;
}
export default function Button(props: IButton) {
  return (
    <div>
      <button style={props.styleButton}>{props.buttonName}</button>
    </div>
  );
}
