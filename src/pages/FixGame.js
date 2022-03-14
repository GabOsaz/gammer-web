import React, { useContext, useEffect, useRef, useState } from 'react'
import PageTitle from '../components/common/PageTitle'
import { motion } from 'framer-motion'
import SchoolsDd from '../components/SchoolsDd'
import DismissDd from '../components/common/DismissDd'
import GradientButton from '../components/common/GradientButton'
import { FetchContext } from '../context/FetchContext'
import { AnimatePresence } from 'framer-motion'
import NotificationPrompt from '../components/NotificationPrompt'

function FixGame() {
    const fetchContext = useContext(FetchContext);

    const [ loading, setLoading ] = useState(false);
    const [ validationPrompt, setValidationPrompt ] = useState(null);
    const [ promptMessage, setPromptMessage ] = useState('')

    const dDRef = useRef(null)
    const [ showDdId, setShowDdId ] = useState([]);
    const [ data, setData ] = useState([]);
    const [ inputValue, setInputValue ] = useState({
        '1': '',
        '2': ''
    })
    
    const SchoolTeamSelect = React.memo(({ id }) => {

        function toggleShowDd() {
            setShowDdId(init => [...init, id])
            if (showDdId.includes(id)) {
                setShowDdId(init => init.filter(eachId => eachId !== id))
            } else {
                setShowDdId(init => [...init, id])
            }
        }

        const handleSelect = (grabbedSchool) => {
            inputValue[id] = grabbedSchool.schoolName
        }
        
        return (
            <div className="mb-2 relative">
                <div id={id} onClick={() => toggleShowDd()}>
                    <input
                        aria-label="Schools"
                        name="school"
                        type="text"
                        value={inputValue[id]}
                        placeholder="Type school"
                        className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 ${inputValue[id] ? 'border-blue-500 bg-blue-100' : validationPrompt && validationPrompt[id] && 'border-red-500'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5`}
                        readOnly='readonly'
                    />
                </div>
                {validationPrompt && !inputValue[id] &&
                    <h2 className='text-red-600 mt-1'> {validationPrompt[id]} </h2>
                }
                {showDdId.includes(id) && 
                    <DismissDd theRef={dDRef} toggleDd={toggleShowDd}>
                    <div ref={dDRef} className='absolute top-18 z-20 left-0 w-full myShadow rounded-lg overflow-auto'>
                        <SchoolsDd
                            setShowDd = {toggleShowDd}
                            data={data}
                            setGrabbedItem = {handleSelect}
                        />
                    </div>
                    </DismissDd>
                }
            </div>
        )
    });

    useEffect(() => {
        const fetchRegisteredSchools = async () => {
            try {
                const { data } = await fetchContext.authAxios.get('registered_schools');
                setData(data.registeredSchools)
            } catch (error) {
                console.log(error.response.status, error.response)
            }
        }

        fetchRegisteredSchools()
    
      return () => {
        
      }
    }, [fetchContext.authAxios])

    const createFixture = async () => {
        const theFixture = `${inputValue['1']} versus ${inputValue['2']}` 
        const body = {fixture: theFixture}
        if(!inputValue['1']) return setValidationPrompt({ '1': 'Select a school here'});
        if(!inputValue['2']) return setValidationPrompt({ '2': 'Select a school here'})
            
        try {
            setLoading(true);
            const { data } = await fetchContext.authAxios.post('match_fix', body);
            setLoading(false);
            setPromptMessage(data.message);
            setInputValue({
                '1': '',
                '2': ''
            });
            setValidationPrompt(null)
        } catch (error) {
            setLoading(false);
            const { data, status, statusText } = error.response;
            if(status < 500) {
                setPromptMessage(data.message ? data.message : statusText);
            } else {
                setPromptMessage(statusText);
            }
        }
    }

    const pageAnime = {
        hidden: { 
            opacity: 0,
            y: '100px',
            transition: {
                duration: 0.3
            }
        },
        visible: { 
          opacity: 1,
          y: 0,
          transition: { delay: 0.2 }
        },
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={pageAnime}
        >
            <AnimatePresence>
                {promptMessage &&
                    <NotificationPrompt handleClose={setPromptMessage} promptMessage={promptMessage} />
                }
            </AnimatePresence>
            <PageTitle title="Schedule Games Between Schools" />
            <div className='mt-6 flex w-3/4 justify-between items-center'>
                <div className='mt-4 w-64'>
                    <SchoolTeamSelect
                        id='1' 
                    />
                </div>
                <span className='font-semibold'> Versus </span>
                <div className='mt-4 w-64'>
                    <SchoolTeamSelect 
                        id='2' 
                    />
                </div>
            </div>
            <div onClick={createFixture} className='mt-8 w-3/4 flex justify-center'>
                <GradientButton
                    text='Schedule'
                    loading={loading}
                />
            </div>
        </motion.div>
    )
}

export default FixGame