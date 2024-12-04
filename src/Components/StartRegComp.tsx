import TimeComp from "./TimeComp.tsx";
import KmComp from "./KmComp.tsx";

interface StartRegCompProps {
    titleStartTime: string;
    titleStartKm: string;
    timeStart: string;
    kmStart: string;
    errorTimeMessage?: string;
    errorKmMessage?: string;
    onTimeChange: (timeValue: string) => void;
    onKmChange: (kmValue: string) => void;
}


// StartRegComp is a functional component that uses the StartRegCompProps interface to define the props ({ titleStartTime, titleStartKm, timeStart, kmStart, onTimeChange, onKmChange }).
const StartRegComp: React.FC<StartRegCompProps> = ({ titleStartTime, titleStartKm, timeStart, kmStart, errorTimeMessage, errorKmMessage, onTimeChange, onKmChange }) => {
    
   
    
    return (
        
            <div className='regComponent-wrapper'>
                <TimeComp title={titleStartTime}
                          value={timeStart}
                          errorMessage={errorTimeMessage}
                          onTimeChange={onTimeChange}/>

                <KmComp title={titleStartKm}
                        value={kmStart}
                        errorMessage={errorKmMessage}
                        onKmChange={onKmChange}/>
            </div>
    );

}

export default StartRegComp;