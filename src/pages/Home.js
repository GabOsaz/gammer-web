import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
// import GradientLink from '../components/common/GradientLink';
import GradientButton from '../components/common/GradientButton';
// import GradientBar from './../components/common/GradientBar';
// import logo from './../images/logo.png';
// import { AuthContext } from './../context/AuthContext'
import Signup from './Signup';
import { motion } from "framer-motion";

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const landingParentVariants = {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        type: 'spring',
        mass: 0.4,
        damping: 8
      }
    },
  };

  const container = {
    hidden: { opacity: 1, scale: 0, rotate: -99 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
    }
  };

  const theTransitions = {
    type: "spring",
    duration: 1.0,
    stiffness: 40,
  };

  return (
    <>
        <motion.div 
          
          className="h-screen bg-blue-900 relative overflow-y-auto overflow-x-hidden"
        >
          <div className="opacity-10 h-full">
            <img
              className="object-cover w-full h-full"
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
              alt="Home"
            />
          </div>
          
          <div className='flex absolute top-0 left-0'>
            <motion.div 
              variants={landingParentVariants}
              initial="hidden"
              animate="visible"
              className=" lg:w-2/3 mt-32 lg:mt-48 px-12 nato-sans"
            >
              <h1 className="text-gray-200 text-2xl lg:text-6xl sm:text-5xl font-bold leading-tight">
                It's all about games here! Are you ready?
              </h1>
              <h2 className="text-gray-400 text-md sm:text-2xl sm:mt-10 mt-4">
                Let the games begin...
              </h2>
              <div className="mt-4 sm:mt-10 w-48">
                <motion.div 
                  animate={{ opacity:1, scale: [1, 1.2, 1, 1.2, 1] }} 
                  initial={{ opacity: 0, scale: 0 }} 
                  transition={{ delay: .5}}
                  onClick = {() => setShowForm(!showForm)}
                >
                  <GradientButton 
                    text="Get Started"
                  />
                </motion.div>
              </div>
            </motion.div>
            {showForm &&
              <motion.div 
                className=''
                // className='absolute right-0 top-0'
                variants={container}
                initial="hidden"
                animate="visible"
                transition={theTransitions}
              >
                <Signup />
              </motion.div>
            }
          </div>
        </motion.div>
      {/* </div> */}
    </>
  );
};

export default Home;
