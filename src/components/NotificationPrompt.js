import React from 'react'
import CloseSvg from '../svgs/CloseSvg';
import { motion } from 'framer-motion';

export default function NotificationPrompt({ handleClose, promptMessage }) {
    const promptAnime = {
        hidden: { 
            opacity: 0,
            x: '100px',
            transition: {
                duration: 0.3
            }
        },
        visible: { 
          opacity: 1,
          x: 0,
          transition: { delay: 0.2 }
        },
    }

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={promptAnime}
            className='p-3 w-64 z-50 text-sm flex items-center justify-between absolute top-75 right-0 bg-white myShadow rounded-lg'
        >
            <span className='mt-4 mr-0'>
                <span className='font-semibold'> {promptMessage} </span> <br />
            </span>
            <span onClick={() => handleClose('')} className='cursor-pointer p-2 flex items-center justify-center hover:bg-red-300 transition-colors duration-200 ease-in-out rounded-full'>
                <CloseSvg stroke='#D80027' w='10' h='10' />
            </span>
        </motion.div>
    )
}
