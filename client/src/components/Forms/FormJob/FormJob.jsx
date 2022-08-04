import React, {useState} from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import Another from "./jobVariations/Another";
import DistantWork from "./jobVariations/DistantWork";
import FullDay from "./jobVariations/FullDay";
import SchiftMethod from "./jobVariations/SchiftMethod";
import TwoTroughTwo from "./jobVariations/TwoTroughTwo";
import styleSheet from "../Forms.module.css"


const FormJob = () => {

    const [child, setChild] = useState()

    const handler = (e) => {
         if(e.target.name === 'full') {setChild(<FullDay/>)}
         else if(e.target.name === 'schift') {setChild(<SchiftMethod/>)}
         else if(e.target.name === 'dist') {setChild(<DistantWork/>)}
         else if(e.target.name === 'two') {setChild(<TwoTroughTwo/>)}
         else {setChild(<Another/>)}
    }

    return (
        <div className={styleSheet.MyForm} onClick={e => e.stopPropagation()}>
            <MyButton onClick={handler} name={'full'}>Пятидневка</MyButton>
            <MyButton onClick={handler} name={'schift'}>Вахта</MyButton>
            <MyButton onClick={handler} name={'dist'}>Удаленная работа</MyButton>
            <MyButton onClick={handler} name={'two'}>2 через 2</MyButton>
            <MyButton onClick={handler}>Другой вариант</MyButton>
            <div>{child}</div>
        </div>
    );
};

export default FormJob;
