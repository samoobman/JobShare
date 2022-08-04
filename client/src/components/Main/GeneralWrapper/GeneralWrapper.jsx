import React from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ContentWrapper from "./ContentWrapper/ContentWrapper";
import styleSheet from "./GeneralWrapper.module.css"

const GeneralWrapper = () => {

    return (
        <div className={styleSheet.GeneralWrapper}>
            <Header />
            <ContentWrapper />
            <Footer />
        </div>
    );
};

export default GeneralWrapper;
