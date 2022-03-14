import React, { useState } from 'react';
import { toTitleCase } from '../../util/titleCase';

const ListDropDownItem = ({ 
    handleDdClick,
    mainTextKey,
    indexKey,
    toggleDd, 
    listArray, 
    extraClasses='font-normal text-sm',
    callBack
}) => {
    const [hover, setHover] = useState(null);
    const [border, setBorder] = useState('');
    
    const handleMouseOver = (item) => {
        setHover(item);
        setBorder('border-l-2');
    };

    const handleMouseOut = (item) => {
        setHover(item);
        setBorder('')
    };

    const handleClick = (item) => {
        handleDdClick && handleDdClick(item);
        toggleDd && toggleDd(false);
        callBack && callBack()
    }

    return (
            <>
                <div className='py-0'>
                    {listArray && listArray.length > 0 && listArray.map((item, index, array) => {
                        return (
                            <div key={index} onClick={() => handleClick(typeof(item) === 'object' ? item : item)} onMouseOver={() => handleMouseOver(item, index, array)} onMouseOut={() => handleMouseOut(item)} className={`flex w-full ${item === hover && border} border-blue-700 `}>
                                <div className={`w-full px-6 py-1 text-opacity-70 cursor-pointer ${extraClasses} flex items-center justify-between space-x-2 hover:bg-blue-100 hover:text-opacity-100  transition duration-200 ease-in-out`}>
                                    <div className='flex items-center'>
                                        <span>
                                            { typeof(item) === 'object' ? toTitleCase(item[mainTextKey]) : toTitleCase(item) }
                                        </span>
                                    </div>
                                </div>
                            </div>
                    )})}
                </div>
            </>
    )
}

export default ListDropDownItem;
