import React from 'react';
import styleSheet from './MyInput.module.css'
import {isMobile} from 'react-device-detect';

const MyInput = (props) => {
    return (
        <div className={styleSheet.MyIn}>
            <label className={isMobile ? styleSheet.labelM : styleSheet.label}>{props.currentname}</label>
            <input className={isMobile ? styleSheet.inpM : styleSheet.inp} {...props}/>
        </div>
    );
};

export default MyInput;

