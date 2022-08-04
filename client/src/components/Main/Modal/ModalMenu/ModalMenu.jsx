import React from 'react';
import styleSheet from "./ModalMenu.module.css"
import {useContextState} from "../../../../state-provider/allStateProvider";

const ModalMenu = ({children, visible}) => {

    const {toggleModalMenu} = useContextState()
    const rootClasses = [styleSheet.ModalMenu]


    if (visible) {
        rootClasses.push(styleSheet.active)
    }

    return (
        <nav>
            <div className={rootClasses.join(" ")} onClick={toggleModalMenu}>
                {children}
            </div>
        </nav>
    );
};

export default ModalMenu;