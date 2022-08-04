import React, {useState} from 'react';
import styleSheet from './Item.module.css'

const LeftItem = (prop) => {
    const [children, setChildren] = useState([])
    const [toggleState, setToggleState] = useState(false)
    const date = new Date(prop.data.published_at).toLocaleString()

    const showDetails = () => {
        if(!toggleState) {
            setChildren([
                <hr className={styleSheet.line}/>,
                <div className={styleSheet.snippet}>{prop.data.snippet.responsibility}</div>
            ])
            setToggleState(true)
        } else {
            setChildren([])
            setToggleState(false)
        }
    }

    return (
        <div onClick={showDetails}>
            <div className={styleSheet.LeftItem}>
                <div className={styleSheet.date}>{date}</div>
                <a onClick={e => e.stopPropagation()} href={prop.data.alternate_url} target='_blank'><div className={styleSheet.name}>{prop.data.name}</div></a>
                <div className={styleSheet.salary}>
                    от
                    <span> </span>
                    {prop.data.salary === null || prop.data.salary.from === null ? 'ноля' : prop.data.salary.from}
                    <span> </span>
                    до
                    <span> </span>
                    {prop.data.salary === null || prop.data.salary.to === null ? 'бесконечности' : prop.data.salary.to}
                    <span> </span>
                    <div className={styleSheet.currency}>
                        {
                            prop.data.salary === null ? '' :
                            prop.data.salary.currency === 'RUR' ?
                                'рублей' :
                                prop.data.salary.currency === 'USD' ?
                                    'долларов' :
                                    prop.data.salary.currency === 'EUR' ?
                                        'евро' : 'денег'
                        }
                    </div>
                </div>
                <div className={styleSheet.employer}>{prop.data.employer === null ? '' : prop.data.employer.name}</div>
                <div className={styleSheet.city}>{prop.data.address === null ? 'Адрес не указан' : prop.data.address.raw}</div>
                {children.map(el => el)}
            </div>
        </div>
    );
};

export default LeftItem;
