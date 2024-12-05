import TimeComp from "./TimeComp.tsx";
import KmComp from "./KmComp.tsx";
import DateComp from "./DateComp.tsx";
import dayjs, { Dayjs } from "dayjs";

interface StartRegCompProps {
    titleDate: string;
    titleStartTime: string;
    titleStartKm: string;
    date: Dayjs | null;
    timeStart: string;
    kmStart: string;
    errorDateMessage?: string;
    errorTimeMessage?: string;
    errorKmMessage?: string;
    onDateChange: (dateVal: Dayjs | null) => void;
    onTimeChange: (timeVal: string) => void;
    onKmChange: (kmVal: string) => void;
}


    // StartRegComp is a functional component that uses the StartRegCompProps interface to define the props ({ titleStartTime, titleStartKm, timeStart, kmStart, onTimeChange, onKmChange }).
    const StartRegComp: React.FC<StartRegCompProps> = ({
        titleDate, titleStartTime, titleStartKm, date, timeStart, kmStart, errorTimeMessage, errorKmMessage, onDateChange, onTimeChange, onKmChange 
    }) => {
    
    
    return (
        
            <div className='regComponent-wrapper'>

                <DateComp title={titleDate}
                          value={dayjs(date)}
                          onDateChange={onDateChange}/>

                <TimeComp title={titleStartTime}
                          value={timeStart}
                          errorMessage={errorTimeMessage}
                          onTimeChange={onTimeChange}/>

                <KmComp title={titleStartKm}
                        value={kmStart}
                        errorMessage={errorKmMessage}
                        onKmChange={onKmChange}
                        />
            </div>
    );

}

export default StartRegComp;