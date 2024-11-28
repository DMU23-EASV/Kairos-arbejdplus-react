import TimeComp from "./TimeComp.tsx";
import KmComp from "./KmComp.tsx";
import {useEffect, useState} from "react";

interface StartRegCompProps {
    titleStartTime: string;
    titleStartKm: string;
    timeStart: string;                
    kmStart: string;    
    errorTime: boolean;
    errorKm: boolean;
    onTimeChange: (timeValue: string) => void; 
    onKmChange: (kmValue: string) => void;
    onStartTimeErrorChange: (timeErrorState: boolean) => void;
    onStartKmErrorChange: (kmErrorState: boolean) => void;
}

// StartRegComp is a functional component that uses the StartRegCompProps interface to define the props ({ titleStartTime, titleStartKm, timeStart, kmStart, onTimeChange, onKmChange }).
const StartRegComp: React.FC<StartRegCompProps> = ({ titleStartTime, titleStartKm, timeStart, kmStart, errorTime, errorKm, onTimeChange, onKmChange, onStartTimeErrorChange, onStartKmErrorChange }) => {
    
    // State management for the start time value and start km value
    const [startTime, setStartTime] = useState<string>(timeStart);
    const [timeError, setTimeError] = useState<boolean>(errorTime);
    const [startKm, setStartKm] = useState<string>(kmStart);
    const [kmError, setKmError] = useState<boolean>(errorKm);

    // Updates the time error state when the errorTime prop changes in MainRegComp
    useEffect(() => {
        setTimeError(errorTime); // Update local error state for time
    }, [errorTime]);

    // Updates the km error state when the errorTime prop changes in MainRegComp
    useEffect(() =>{
        setKmError(errorKm);
    }, [errorKm]);
    
    // Handles start time updates
    const handleStartTimeChange = (startTimeValue: string) => {
        setStartTime(startTimeValue); 
        onTimeChange(startTimeValue);
    };
    
    // Handles start time error updates
    const handleStartTimeErrorChange = (startTimeErrorState: boolean) => {
        setTimeError(startTimeErrorState);
        onStartTimeErrorChange(startTimeErrorState);
    }

    // Handles start km updates
    const handleStartKmChange = (startKmValue: string) => {
        setStartKm(startKmValue); 
        onKmChange(startKmValue);
    };
    
    // Handles start km error updates
    const handleStartKmErrorChange = (startKmErrorState: boolean) => {
        setKmError(startKmErrorState);
        onStartKmErrorChange(startKmErrorState);
    }
    
    
    return (
        
            <div className='regComponent-wrapper'>
                <TimeComp title={titleStartTime}
                          value={startTime}
                          errorTime={timeError}
                          onTimeChange={handleStartTimeChange}
                          onErrorChange={handleStartTimeErrorChange}/>

                <KmComp title={titleStartKm}
                        value={startKm}
                        errorKm={kmError}
                        onKmChange={handleStartKmChange}
                        onErrorChange={handleStartKmErrorChange}/>
            </div>
    );

}

export default StartRegComp;