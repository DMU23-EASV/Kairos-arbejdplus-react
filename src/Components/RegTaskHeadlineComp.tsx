import React from "react";

interface RegTaskHeadlineCompProps{
    title: string;
}

const RegTaskHeadlineComp: React.FunctionComponent<RegTaskHeadlineCompProps> = ({ title })=>{
   
    return (
        <div className='headline-container'>
            <h2>{title}</h2>
        </div>
    )
}

export default RegTaskHeadlineComp;