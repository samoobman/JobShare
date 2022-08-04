import React from 'react';
import {Routes, Route} from "react-router-dom";
import styleSheet from "./MyContent.module.css"
import AboutPage from "../../../../Pages/AboutPage/AboutPage";
import MyAccountPage from "../../../../Pages/Accounts/MyAccountPage/MyAccountPage";
import TitlePage from "../../../../Pages/TitlePage/TitlePage";
import SearchPage from "../../../../Pages/SearchPage/SearchPage";
import ResultPage from "../../../../Pages/ResultPage/ResultPage";
import SomeAccountPage from "../../../../Pages/Accounts/SomeAccountPage/SomeAccountPage";
import LeftSide from '../LeftSide/LeftSide';
import RightSide from '../RightSide/RightSide'



const MyContent = () => {

    return (
        <div className={styleSheet.MyContent}>
            <Routes>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/myAccount" element={<MyAccountPage/>}/>
                <Route path="/" element={<TitlePage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/result/:id" element={<ResultPage/>}/>
                <Route path="/someAccount/:id" element={<SomeAccountPage/>}/>
                <Route path="/vacancies" element={<LeftSide/>}/>
                <Route path="/jobs" element={<RightSide/>}/>
            </Routes>
        </div>
    );
};

export default MyContent;
