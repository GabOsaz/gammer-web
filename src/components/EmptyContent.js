import React from 'react'
import emptyStateImg from '../images/emptyStateImg.png'
import Hyperlink from './common/Hyperlink';

function EmptyContent({ message, acceptedSchEmpty }) {
  
  const AcceptedSchsMsg = () => (
    <div className='flex flex-col items-center justify-center'>
        <h2 className='mr-1'> No accepted schools yet. </h2>
        <h2>Accept schools <Hyperlink to={'registeredSchools'} text='here' /> </h2>
    </div>
);

  return (
    <div>
      <div className='flex justify-center mt-8 w-full'>
          <div className='w-1/2'>
              <div>
                  <img alt='sorry' src={emptyStateImg} />
              </div>
              {acceptedSchEmpty ? 
                <AcceptedSchsMsg /> :
                <div className='mt-4 w-1/2 mx-auto text-center'>
                  <h2> 
                      {message}
                  </h2>
              </div>
              }
          </div>
      </div>
    </div>
  )
}

export default EmptyContent