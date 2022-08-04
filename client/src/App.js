import React from "react";
import {ContextProvider} from "./state-provider/allStateProvider"
import JobSharePro from "./JobSharePro";
import "./App.css"


function App() {

    return (
        <ContextProvider>
            <div className="App">
                <JobSharePro />
            </div>
        </ContextProvider>
    );

}

export default App;
