import React from 'react';
import styleSheet from "./Alert.module.css"

const Alert = (props) => {
    return (
        <div className={styleSheet.Alert}>
            <p>{props.t}</p>
        </div>
    );
};

export default Alert;
