import React from 'react';
import styleSheet from './Item.module.css'


const TitleItem = (prop) => {

    const date = new Date(prop.item.date.published * 1000).toLocaleString()

    return (
        <a href={`https://iz.ru${prop.item.path}`} target='_blank'>
            <div className={styleSheet.container}>
                <div className={styleSheet.image}>
                        <img alt={'Изображение'} src={prop.item.previews['900x506'].path}/>
                </div>
                <div className={styleSheet.Item}>
                    <div className={styleSheet.d}>{date}</div>
                    <div className={styleSheet.title}>{prop.item.title}</div>
                    <hr className={styleSheet.line}/>
                    <div>{prop.item.description}</div>
                    <div className={styleSheet.photo}>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default TitleItem;
