import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { motion } from "framer-motion";

const GradientButton = ({
  type,
  text,
  size,
  loading,
  extraClasses,
  onClick
}) => {
  const classes = classNames({
    'flex rounded-full items-center py-2 px-6 focus:outline-none shadow-lg text-white': true,
    'bg-green-500': extraClasses,
    'bg-gradient' : !extraClasses,
    'text-2xl': size === 'lg'
  });
  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{
        scale: 0.8,
        // borderRadius: "10%"
      }}
    >
      {loading ? (
        <span className="flex items-center">
          <FontAwesomeIcon icon={faCircleNotch} spin />
          <span className="ml-2">Loading...</span>
        </span>
      ) : (
        <span>{text}</span>
      )}
    </motion.button>
  );
};

export default GradientButton;
