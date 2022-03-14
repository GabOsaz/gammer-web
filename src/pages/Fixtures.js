import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../components/common/PageTitle'
import { FetchContext } from '../context/FetchContext';

function Fixtures() {
    const fetchContext = useContext(FetchContext)
    const [ data, setData ] = useState([])

    const containerVariants = {
        hidden: { 
          opacity: 0, 
          x: '100vw',
          transition: {
            staggerChildren: 0.5,
          } 
        },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: { 
            type: 'spring',
            mass: 0.4,
            damping: 8,
            staggerChildren: 0.4,
            when: "beforeChildren",
          }
        },
    };
      
    const childVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0
        }
    }

    useEffect(() => {
        const fetchRegisteredSchools = async () => {
            try {
                const { data } = await fetchContext.authAxios.get('match_fixtures');
                setData(data.fixtures)
            } catch (error) {
                console.log(error.response.status, error.response)
            }
        }

        fetchRegisteredSchools()
    
      return () => {
        
      }
    }, [fetchContext.authAxios])

  return (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className='overflow-x-hidden'
    >
        <PageTitle title="List of Match Fixtures" />
        <motion.ul 
            variants={childVariants}
            className='mt-6'
            id='fixtures-list'
        >
            {data?.map(game => {
                return (
                    <motion.li 
                        variants={childVariants}
                        whileHover={{ scale: 1.3, originX: 0, color: '#3B82F6' }}
                        className='mb-4'
                        key={game._id}
                    >
                        {game.fixture} 
                    </motion.li>
                )
            })}
        </motion.ul>
    </motion.div>
  )
}

export default Fixtures