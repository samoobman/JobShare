import React, {useCallback} from 'react';
import ModalWin from "./components/Main/Modal/ModalWin/ModalWin";
import ModalAlert from "./components/Main/Modal/ModalAlert/ModalAlert";
import GeneralWrapper from "./components/Main/GeneralWrapper/GeneralWrapper";
import styleSheet from "./JobSharePro.module.css"
import {useContextState} from "./state-provider/allStateProvider"
import Loader from "./components/Loader/Loader";

const JobSharePro = () => {
    const {modalState, readyAuth} = useContextState()

    if (!readyAuth) {
        return <Loader />
    }

    const rootClasses = []
    if (modalState.formReg || modalState.formLogin || modalState.formJob) {
        rootClasses.push(styleSheet.disScroll)
    }

    return (
        <div className={rootClasses}>
            <ModalWin />
            <ModalAlert />
            <GeneralWrapper />
        </div>
    );
};

export default JobSharePro;
