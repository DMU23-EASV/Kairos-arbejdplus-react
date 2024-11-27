import TimeComp from "./TimeComp.tsx";
import KmComp from "./KmComp.tsx";
import React, {useState} from "react";
import RemarkComp from "./RemarkComp.tsx";

interface StartRegCompProps {
    titleEndTime: string;
    titleEndKm: string;
    titleRemark: string;    
    timeEnd: string;
    kmEnd: string;
    remarkVal: string;
    onTimeChange: (timeValue: string) => void;
    onKmChange: (kmValue: string) => void;
    onRemarkChange: (remarkValue: string) => void;
}

// StartRegComp is a functional component that uses the StartRegCompProps interface to define the props ({ time, km, onTimeChange, onKmChange }).
const StartRegComp: React.FC<StartRegCompProps> = ({ titleEndTime, titleEndKm, titleRemark, timeEnd, kmEnd, remarkVal, onTimeChange, onKmChange, onRemarkChange }) => {

    // State management for the start time value and start km value
    const [endTime, setEndTime] = useState<string>(timeEnd);
    const [endKm, setEndKm] = useState<string>(kmEnd);
    const [remark, setRemark] = useState<string>(remarkVal);

    // Handles end time updates
    const handleEndTimeChange = (endTimeValue: string) => {
        setEndTime(endTimeValue);
        onTimeChange(endTimeValue);
    };

    // Handles end km updates
    const handleEndKmChange = (endKmValue: string) => {
        setEndKm(endKmValue);
        onKmChange(endKmValue);
    };

    // Handles remark updates
    const handleRemarkChange = (remarkValue: string) => {
        setRemark(remarkValue);
        onRemarkChange(remarkValue);
    }

    return (

        <div className='regComponent-wrapper'>
            <TimeComp title={titleEndTime}
                      value={endTime}
                      onChange={handleEndTimeChange}/>

            <KmComp title={titleEndKm}
                    value={endKm}
                    onChange={handleEndKmChange}/>
            
            <RemarkComp title={titleRemark}
                        value={remark}
                        onChange={handleRemarkChange}
            />
                        
        </div>
    );

}

export default StartRegComp;