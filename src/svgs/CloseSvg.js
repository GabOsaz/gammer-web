import React from 'react';

const CloseSvg = ({w='14', h='14', stroke='#111111'}) => (
    <svg width={w} height={h} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L13 13M1 13L13 1L1 13Z" stroke={stroke} strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default CloseSvg;