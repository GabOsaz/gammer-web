import React, { useState } from 'react';
import nigerianStates from '../util/nigerianStates';
import Card from './common/Card';
import ListDropDownItem from './common/ListDropDownItem';

export default function NigerianStatesDd({ setShowDd, setGrabbedState }) {
    const [searchedTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResult] = useState([]);

    const handleOnchange = (e) => {
        setSearchTerm(e.target.value)
        const searchTerm = e.target.value
        console.log(searchTerm)
        if(searchTerm === '') {
          setSearchResult([])
          return
        }
        const filtered = nigerianStates.filter(each => each.name.toLowerCase().includes(searchTerm.toLowerCase()));
        // console.log(filtered, 'filtered')
        setSearchResult(filtered)
    }

    const handleClick = (state) => {
        setShowDd(false);
        setGrabbedState(state.name)
        // dataContext.setFormCountrySwitch(true)
    }

    return (
        <>
        <div className='max-h-96 w-full'>
            <Card addShadow>
                <div className='relative w-full h-full'>
                    <div className='sticky px-6 py-5 top-0 left-0 bg-white'>
                        <div className='flex justify-between font-semibold'>
                            <div className='text-base text-headingDark text-opacity-70'> Select State </div>
                            <span onClick={() => setShowDd(false)} className='text-headingDark text-opacity-70 text-sm cursor-pointer'> Cancel </span>
                        </div>
                        <div className='mt-4 w-full'>
                            <input
                                aria-label="search states"
                                type='text'
                                placeholder = 'Search'
                                value = {searchedTerm}
                                onChange = {(e) => handleOnchange(e)}
                                className="appearance-none relative block w-full px-3 py-2 bg-defaultGray border placeholder-opacity-20 placeholder-font-semibold text-headingDark rounded focus:outline-none focus:border-blue-500 focus:z-0 sm:text-sm sm:leading-5"
                            />
                        </div>
                    </div>
                    <div className='pb-3 w-full'>
                        {searchResults.length > 0 && 
                            <ListDropDownItem 
                                listArray={searchResults}
                                handleDdClick={handleClick}
                                mainTextKey='name'
                                indexKey='code'
                            />
                        }
                        {searchResults.length === 0 && 
                            <ListDropDownItem 
                                listArray={nigerianStates}
                                handleDdClick={handleClick}
                                mainTextKey='name'
                                indexKey='code'
                            />
                        }
                    </div>
                </div>
            </Card>
        </div>
        </>
    )
};