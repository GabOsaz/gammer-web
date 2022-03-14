import React, { useState, useEffect } from 'react'

function Accordion({ id, Head, Body, closeAccordion }) {
    const [ clickedIds, setclickedId ] = useState('');
    const [ showBodyIds, setShowBodyId ] = useState([]);

    const onClickAccordionHead = (id) => {
        setclickedId(id)
        if(showBodyIds.includes(id)) {
            setShowBodyId(init => init.filter((eachId) => eachId !== id));
        } else {
            setShowBodyId(init => [...init, id])
        }
    }

    useEffect(() => {
      closeAccordion && onClickAccordionHead()
    
      return () => {
        
      }
    }, [])
    

    return (
        <div key={id} className='w-full bg-white rounded-lg px-8 py-6 myShadow mb-4'>
            <div onClick={() => onClickAccordionHead(id)}>
                <Head />
            </div>
            {showBodyIds.includes(id) &&
                <Body />
            }
        </div>
    )
}

export default Accordion