import React, { useContext, useEffect, useState } from 'react'
import GradientButton from '../components/common/GradientButton';
import PageTitle from '../components/common/PageTitle';
import { AnimatePresence, motion } from 'framer-motion'
// import { publicFetch } from '../util/fetch';
import { FetchContext } from '../context/FetchContext';
import Hyperlink from './common/Hyperlink';

export const registeredSchoolsData = [
    {
        id: '1',
        schoolName: 'School One',
        state: 'Edo',
        yearFounded: '1992',
        gameMasterName: 'Akpos',
        gameMasterEmail: 'akpos1@gmail.com',
        gameMasterPhone: '090284783347'
    },
    {
        id: '2',
        schoolName: 'School Two',
        state: 'Ebonyi',
        yearFounded: '1992',
        gameMasterName: 'Akpos',
        gameMasterEmail: 'akpos2@gmail.com',
        gameMasterPhone: '090284783347'
    },
    {
        id: '3',
        schoolName: 'School Three',
        state: 'Calabar',
        yearFounded: '1992',
        gameMasterName: 'Akpos',
        gameMasterEmail: 'akpos3@gmail.com',
        gameMasterPhone: '090284783347'
    }
];
function SchoolsListModel({ accepted }) {
    const fetchContext = useContext(FetchContext);

    const [ isAccepted, setIsAccepted ] = useState(false);
    // const [ currSchoolId, setCurrSchoolId ] = useState('');
    const [ showSchBodyId, setShowSchBodyId ] = useState([]);
    const [ accordionClickedId, setAccordionClickedId] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ registeredSchools, setRegisteredSchools ] = useState([]);
    const [ fetchError, setFetchError ] = useState('');

    console.log(registeredSchools)

    useEffect(() => {
        const fetchRegisteredSchools = async () => {
            try {
                setLoading(true);
                const { data } = await fetchContext.authAxios.get('registered_schools');
                console.log(data)
                setLoading(false);
                setRegisteredSchools(data.registeredSchools.filter(school => accepted ? school.accepted : !school.accepted))
            } catch (error) {
                setLoading(false);
                // console.log(error.response.status, error.response)
                const { data, status, statusText } = error.response;
                if(status < 500) {
                    setFetchError(data.message ? data.message : statusText);
                } else {
                    setFetchError(statusText);
                }
            }
        }

        fetchRegisteredSchools()
    
      return () => {
        
      }
    }, [fetchContext.authAxios, isAccepted, accepted])

    const acceptRequest = async (id) => {
        console.log(!accepted)

        try {
          await fetchContext.authAxios.patch(
            'accept_school',
            {
                accepted: !accepted,
                id
            }
          );
          setIsAccepted(!isAccepted)
        } catch (err) {
            console.log(err)
        }
    };

    const onClickAccordionHead = (id) => {
        setAccordionClickedId(id)
        if(showSchBodyId.includes(id)) {
            setShowSchBodyId(init => init.filter(eachId => eachId !== id));
        } else {
            setShowSchBodyId(init => [...init, id])
        }
    }

    const AccorodionHead = ({ schoolName, id, accepted }) => (
        <motion.div layoutId="accordion" onClick = {() => onClickAccordionHead(id)} className='flex items-center justify-between cursor-pointer'>
            <h1 className='text-gray-800 text-opacity-50 font-semibold text-xl'> {schoolName} </h1>
            <GradientButton 
                text={ accepted ? 'Accepted' : 'Accept?'}
                extraClasses={ accepted ? 'bg-green-500' : ''}
                onClick={() => acceptRequest(id)}
            />
        </motion.div>
    )

    const AccordionBody = ({ school }) => {
        const { _id, schoolName, state, yearFounded, email, gameMasterFirstName, gameMasterLastName, phoneNumber } = school;
        return (
            <motion.div 
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={ accordionClickedId === _id &&
                    {
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                    }
                }
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                className=' shadow-inner px-8 py-6 mt-6 rounded-lg'
                layoutId="accordion"
            >
                <motion.div
                    variants={accordionClickedId === _id && { collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                    transition={{ duration: 0.8 }}
                    className='accordionGrid'
                >
                    <div className='flex'>
                        <span className='text-blue-500 font-semibold mr-4'> School Name: </span>
                        <span className='text-gray-800'> {schoolName} </span>
                    </div>
                    <div className='flex'>
                        <span className='text-blue-500 mr-4 font-semibold'> State: </span>
                        <span className='text-gray-800'> {state} </span>
                    </div>
                    <div className='flex'>
                        <span className='text-blue-500 mr-4 font-semibold'> Year Founded: </span>
                        <span className='text-gray-800'> {yearFounded} </span>
                    </div>
                    <div className='flex'>
                        <span className='text-blue-500 mr-4 font-semibold'> Game Master's Name: </span>
                        <span className='text-gray-800'> {`${gameMasterFirstName} ${" "} ${gameMasterLastName}`} </span>
                    </div>
                    <div className='flex'>
                        <span className='text-blue-500 mr-4 font-semibold'> Game Master's Email: </span>
                        <span className='text-gray-800'> {email} </span>
                    </div>
                    <div className='flex'>
                        <span className='text-blue-500 mr-4 font-semibold'> Game Master's Phone Number: </span>
                        <span className='text-gray-800'> {phoneNumber} </span>
                    </div>
                </motion.div>
            </motion.div>
        )
    }

    const Accordion = ({ school }) => {
        const { _id, schoolName, accepted } = school
        return (
            <div key={_id} className='w-3/4 bg-white rounded-lg px-8 py-6 myShadow mb-4'>
                <AccorodionHead accepted={accepted} schoolName={schoolName} id={_id} />
                <AnimatePresence>
                {showSchBodyId.includes(_id) &&
                    <AccordionBody school={school}/>
                }
                </AnimatePresence>
            </div>
        )
    }

  return (
    <div>
        <PageTitle title="Registered Schools" />
        {loading && 
            <h1> Loading... </h1>
        }
        {!loading && !fetchError && registeredSchools.length > 0 ? registeredSchools.map(school => {
            return (
                <Accordion key={school._id} school={school} />
            )}) : !loading && !fetchError && accepted ? (
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='mr-1'> No accepted schools yet. </h2>
                    <h2>Accept schools <Hyperlink to={'registeredSchools'} text='here' /> </h2>
                </div>
            ) : !loading && !accepted && !fetchError &&
                <h2 className='flex items-center justify-center w-full'> No registered schools yet. The list of registered schools would be here, just push out some more adds </h2>
        }
        {fetchError && 
            <h1> {fetchError} </h1>
        }
    </div>
  )
}

export default SchoolsListModel;