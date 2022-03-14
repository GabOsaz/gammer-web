import React from 'react';

const Card = ({ children, addShadow }) => (
  <div className={`py-3 h-full rounded ${addShadow && 'myShadow'} bg-white`}>{children}</div>
);

export default Card;
