import React from 'react';
import styleSheet from "./ModalAlert.module.css"
import {useContextState} from "../../../../state-provider/allStateProvider";
import Alert from "./Alert/Alert";


const ModalAlert = () => {

    const {alertChildState} = useContextState()

    return (
        <div>
            <div className={styleSheet.ModalAlert}>
                {alertChildState.map((el, i) => <Alert key={i} t={el}/>)}
            </div>
        </div>
    );
};

export default ModalAlert;
