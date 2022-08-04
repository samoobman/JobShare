import React from 'react';
import {useContextState} from "../../../state-provider/allStateProvider";
import SearchItem from "./Item/SearchItem";
import styleSheet from './SearchPage.module.css'

const SearchPage = () => {

    const {searchData} = useContextState()

    return (
        <div>
            {
                searchData.length === 0 ?
                    <div className={styleSheet.empty}>По такому запросу нет результатов</div> :
                    searchData.map((el, i) => <SearchItem key={i} data={el}/>)
            }
        </div>
    );
};

export default SearchPage;
