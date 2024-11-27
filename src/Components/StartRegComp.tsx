import TimeComp from "./TimeComp.tsx";
import KmComp from "./KmComp.tsx";
import {useState} from "react";

interface StartRegCompProps {
    titleStartTime: string;
    titleStartKm: string;
    timeStart: string;                
    kmStart: string;                  
    onTimeChange: (timeValue: string) => void; 
    onKmChange: (kmValue: string) => void;     
}

// StartRegComp is a functional component that uses the StartRegCompProps interface to define the props ({ titleStartTime, titleStartKm, timeStart, kmStart, onTimeChange, onKmChange }).
const StartRegComp: React.FC<StartRegCompProps> = ({ titleStartTime, titleStartKm, timeStart, kmStart, onTimeChange, onKmChange }) => {
    
    // State management for the start time value and start km value
    const [startTime, setStartTime] = useState<string>(timeStart);
    const [startKm, setStartKm] = useState<string>(kmStart);

    // Handles time updates
    const handleStartTimeChange = (startTimeValue: string) => {
        setStartTime(startTimeValue); 
        onTimeChange(startTimeValue);
    };

    // Handles km updates
    const handleStartKmChange = (startKmValue: string) => {
        setStartKm(startKmValue); 
        onKmChange(startKmValue);
    };
    
    
    return (
        
            <div className='regComponent-wrapper'>
                <TimeComp title={titleStartTime}
                          value={startTime}
                          onChange={handleStartTimeChange}/>

                <KmComp title={titleStartKm}
                        value={startKm}
                        onChange={handleStartKmChange}/>
            </div>
    );

}

export default StartRegComp;