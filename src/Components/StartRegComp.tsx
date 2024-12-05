import TimeComp from "./TimeComp.tsx";
import KmComp from "./KmComp.tsx";
import DateComp from "./DateComp.tsx";
import dayjs from "dayjs";

interface StartRegCompProps {
    titleDate: string;
    titleStartTime: string;
    titleStartKm: string;
    date: Date;
    timeStart: string;
    kmStart: string;
    errorTimeMessage?: string;
    errorKmMessage?: string;
    onDateChange: (date: Date) => void;
    onTimeChange: (timeValue: string) => void;
    onKmChange: (kmValue: string) => void;
}


// StartRegComp is a functional component that uses the StartRegCompProps interface to define the props ({ titleStartTime, titleStartKm, timeStart, kmStart, onTimeChange, onKmChange }).
const StartRegComp: React.FC<StartRegCompProps> = ({ titleDate, titleStartTime, titleStartKm, date, timeStart, kmStart, errorTimeMessage, errorKmMessage, onDateChange, onTimeChange, onKmChange }) => {
    
   const dayjsDate = dayjs(date);

    const handleDateChange = (newDate: Date) => {
        onDateChange(newDate);  // Send Date back to parent component
    }


    return (
        
            <div className='regComponent-wrapper'>

                <DateComp title={titleDate}
                          value={dayjsDate}
                          onDateChange={handleDateChange}/>

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