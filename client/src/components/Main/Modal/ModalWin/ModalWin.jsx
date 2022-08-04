import React from 'react';
import styleSheet from "./ModalWin.module.css"
import {useContextState} from "../../../../state-provider/allStateProvider";
import FormReg from "../../../Forms/FormReg";
import FormJob from "../../../Forms/FormJob/FormJob";
import FormLogin from "../../../Forms/FormLogin";

const ModalWin = () => {

    const {modalState, toggleModalReg, toggleModalJob, toggleModalLogin} = useContextState()
    const rootClassesReg = [styleSheet.ModalWinOverlay]
    const rootClassesJob = [styleSheet.ModalWinOverlay]
    const rootClassesLogin = [styleSheet.ModalWinOverlay]

    if (modalState.formReg) {
        rootClassesReg.push(styleSheet.active)
    }

    if (modalState.formJob) {
        rootClassesJob.push(styleSheet.active)
    }

    if (modalState.formLogin) {
        rootClassesLogin.push(styleSheet.active)
    }

    return (
        <div>
            <div className={rootClassesReg.join(" ")}>
                <div className={styleSheet.table}>
                    <div className={styleSheet.tableCell} onClick={toggleModalReg}>
                        <FormReg />
                    </div>
                </div>
            </div>
            <div className={rootClassesJob.join(" ")}>
                <div className={styleSheet.table}>
                    <div className={styleSheet.tableCell} onClick={toggleModalJob}>
                        <FormJob />
                    </div>
                </div>
            </div>
            <div className={rootClassesLogin.join(" ")}>
                <div className={styleSheet.table}>
                    <div className={styleSheet.tableCell} onClick={toggleModalLogin}>
                        <FormLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalWin;
