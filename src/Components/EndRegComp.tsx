import TimeComp from "./TimeComp.tsx";
import KmComp from "./KmComp.tsx";
import React, {useEffect, useState} from "react";
import RemarkComp from "./RemarkComp.tsx";

interface StartRegCompProps {
    titleEndTime: string;
    titleEndKm: string;
    titleRemark: string;    
    timeEnd: string;
    kmEnd: string;
    remarkVal: string;
    errorTime: boolean;
    errorKm: boolean;
    onTimeChange: (timeValue: string) => void;
    onKmChange: (kmValue: string) => void;
    onRemarkChange: (remarkValue: string) => void;
    onEndTimeErrorChange: (timeErrorState: boolean) => void;
    onEndKmErrorChange: (kmErrorState: boolean) => void;    
}

// StartRegComp is a functional component that uses the StartRegCompProps interface to define the props ({ time, km, onTimeChange, onKmChange }).
const StartRegComp: React.FC<StartRegCompProps> = ({ titleEndTime, titleEndKm, titleRemark, timeEnd, kmEnd, remarkVal, errorTime, errorKm, onTimeChange, onKmChange, onRemarkChange, onEndTimeErrorChange, onEndKmErrorChange }) => {

    // State management for the start time value and start km value
    const [endTime, setEndTime] = useState<string>(timeEnd);
    const [endKm, setEndKm] = useState<string>(kmEnd);
    const [remark, setRemark] = useState<string>(remarkVal);
    const [timeError, setTimeError] = useState<boolean>(errorTime);
    const [kmError, setKmError] = useState<boolean>(errorKm);

    // Updates the time error state when the errorTime prop changes in MainRegComp
    useEffect(() => {
        setTimeError(errorTime); // Update local error state for time
    }, [errorTime]);

    // Updates the km error state when the errorTime prop changes in MainRegComp
    useEffect(() =>{
        setKmError(errorKm);
    }, [errorKm]);
    
    
    // Handles end time updates
    const handleEndTimeChange = (endTimeValue: string) => {
        setEndTime(endTimeValue);
        onTimeChange(endTimeValue);
    };

    // Handles end time error updates
    const handlesEndTimeErrorChange = (endTimeErrorState: boolean) => {
        setTimeError(endTimeErrorState);
        onEndTimeErrorChange(endTimeErrorState);
    }

    // Handles end km updates
    const handleEndKmChange = (endKmValue: string) => {
        setEndKm(endKmValue);
        onKmChange(endKmValue);
    };

    // Handles end km error updates
    const handlesEndKmErrorChange = (endKmErrorState: boolean) => {
        setKmError(endKmErrorState);
        onEndKmErrorChange(endKmErrorState);
    }

    // Handles remark updates
    const handleRemarkChange = (remarkValue: string) => {
        setRemark(remarkValue);
        onRemarkChange(remarkValue);
    }

    return (

        <div className='regComponent-wrapper'>
            <TimeComp title={titleEndTime}
                      value={endTime}
                      errorTime={timeError}
                      onTimeChange={handleEndTimeChange}
                      onErrorChange={handlesEndTimeErrorChange}/>

            <KmComp title={titleEndKm}
                    value={endKm}
                    errorKm={kmError}
                    onKmChange={handleEndKmChange}
                    onErrorChange={handlesEndKmErrorChange}/>
            
            <RemarkComp title={titleRemark}
                        value={remark}
                        onChange={handleRemarkChange}
            />
                        
        </div>
    );

}

export default StartRegComp;