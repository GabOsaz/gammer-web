import React from 'react';

const HyperText = ({ text, onClick }) => (
  <span
    onClick={onClick}
    className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer focus:outline-none focus:underline transition ease-in-out duration-150"
  >
    {text}
  </span>
);

export default HyperText;
