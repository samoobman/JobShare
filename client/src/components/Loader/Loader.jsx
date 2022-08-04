import React from 'react';
import styleSheet from "./Loader.module.css"

const Loader = () => {
    return (
        <div className={styleSheet.LoaderContainer}>
            <div className={styleSheet.Loader}>
            </div>
        </div>
    );
};

export default Loader;
