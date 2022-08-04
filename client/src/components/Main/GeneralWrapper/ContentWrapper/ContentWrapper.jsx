import React from 'react';
import styleSheet from "./ContentWrapper.module.css"
import LeftSide from "./LeftSide/LeftSide";
import MyContent from "./MyContent/MyContent";
import RightSide from "./RightSide/RightSide";
import {useContextState} from "../../../../state-provider/allStateProvider";
import {isMobile} from 'react-device-detect';

const ContentWrapper = () => {

    const {toggleModalMenuOff} = useContextState()

    return (
            <div className={styleSheet.ContentWrapper} onClick={toggleModalMenuOff}>
                {isMobile || document.documentElement.clientWidth < 1150 ? <div></div> : <LeftSide/>}
                <MyContent/>
                {isMobile || document.documentElement.clientWidth < 1150 ? <div></div> : <RightSide/>}
            </div>
    );
};

export default ContentWrapper;
