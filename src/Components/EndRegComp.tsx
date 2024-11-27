import TimeComp from "./TimeComp.tsx";
import KmComp from "./KmComp.tsx";
import {useState} from "react";

interface StartRegCompProps {
    timeEnd: string;
    kmEnd: string;
    onTimeChange: (timeValue: string) => void;
    onKmChange: (kmValue: string) => void;
}

// StartRegComp is a functional component that uses the StartRegCompProps interface to define the props ({ time, km, onTimeChange, onKmChange }).
const StartRegComp: React.FC<StartRegCompProps> = ({ timeEnd, kmEnd, onTimeChange, onKmChange }) => {

    // State management for the start time value and start km value
    const [endTime, setEndTime] = useState<string>(timeEnd);
    const [endKm, setEndKm] = useState<string>(kmEnd);

    // Handles time updates
    const handleEndTimeChange = (endTimeValue: string) => {
        setEndTime(endTimeValue);
        onTimeChange(endTimeValue);
    };

    // Handles km updates
    const handleEndKmChange = (endKmValue: string) => {
        setEndKm(endKmValue);
        onKmChange(endKmValue);
    };


    return (

        <div className='regComponent-wrapper'>
            <TimeComp title={"Slut tid"}
                      value={endTime}
                      onChange={handleEndTimeChange}/>

            <KmComp title={"Slut km"}
                    value={endKm}
                    onChange={handleEndKmChange}/>
        </div>
    );

}

export default StartRegComp;