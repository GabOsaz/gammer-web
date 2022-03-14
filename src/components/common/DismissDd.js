import React, { useEffect } from 'react'
import { motion } from 'framer-motion';

function DismissDd({ children, theRef, toggleDd }) {
    useEffect(() => {
        const listener = event => {
          // Do nothing if clicking theRef's element or descendent elements
          if (theRef && (!theRef.current || theRef.current.contains(event.target))) {
            return;
          }
          toggleDd();
        };
    
        document.addEventListener("mousedown", listener);
    
        return () => {
          document.removeEventListener("mousedown", listener);
        };
    }, [theRef, toggleDd]);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            // variants={pageAnime}
        >
            { children }
            <button className={`cursor-default z-20 bg-transparent static inset-0 w-full h-full `}></button>
        </motion.div>
    )
}

export default DismissDd
