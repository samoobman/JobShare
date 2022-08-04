import React from 'react';
import styleSheet from './MyButton.module.css'
import {isMobile} from 'react-device-detect';

const MyButton = (props) => {

    const arrStyle = [props.anthrStyleButt, isMobile ? styleSheet.MyButtonM : styleSheet.MyButton]

    return (
        <button className={arrStyle.join(" ")} {...props} />
    );

};

export default MyButton;
