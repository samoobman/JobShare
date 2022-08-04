import React from 'react';
import styleSheet from "./AboutPage.module.css"
import {isMobile} from 'react-device-detect';

const AboutPage = () => {
    return (
        <div className={isMobile ? styleSheet.PageM : styleSheet.Page}>
            <div className={styleSheet.item1}>Этот сайт создан исключительно для развлечения автора.</div>
            <div className={styleSheet.item2}>По всем вопросам обращайтесь по адресу: <span className={styleSheet.email}>ingworon@gmail.com</span></div>
        </div>
    );
};

export default AboutPage;
