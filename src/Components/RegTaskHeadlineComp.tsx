import React from "react";

interface RegTaskHeadlineCompProps{
    title: string;
    date: string;
}

const RegTaskHeadlineComp: React.FunctionComponent<RegTaskHeadlineCompProps> = ({ title, date })=>{
   
    return (
        <div>
            <h2>{title}</h2>
            <h3>{date}</h3>
        </div>
    )
}

export default RegTaskHeadlineComp;