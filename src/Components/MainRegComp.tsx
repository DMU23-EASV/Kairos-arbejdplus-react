import StartRegComp from './StartRegComp';
import {useState} from "react";
import RegTaskHeadlineComp from "./RegTaskHeadlineComp.tsx";
import EndRegComp from "./EndRegComp.tsx"; // Importer StartRegComp

function MainRegComp() {
    // State til at gemme start tid og km
    const [startTime, setStartTime] = useState<string>('');
    const [startKm, setStartKm] = useState<string>('');
    
    const [endTime, setEndTime] = useState<string>('');
    const [endKm, setEndKm] = useState<string>('');
    
    const [remark, setRemark] = useState<string>('');
    
    // Håndtering af opdatering af start tid og km
    const handleStartTimeChange = (timeStartValue: string) => {
        setStartTime(timeStartValue);
    };

    const handleStartKmChange = (kmStartValue: string) => {
        setStartKm(kmStartValue);
    };

    const handleEndTimeChange = (timeEndValue: string) => {
        setEndTime(timeEndValue);
    };

    const handleEndKmChange = (kmEndValue: string) => {
        setEndKm(kmEndValue);
    };
    
    
    const handleRemarkChange = (remarkValue: string) => {
        setRemark(remarkValue);
    }

  

    return (
        <div>
            <RegTaskHeadlineComp
                title={"Ny tidsregistrering"}
                date={"11. november 2024"}
                />
            
            <StartRegComp
                titleStartTime={"Start tid"}
                titleStartKm={"Start km"}
                timeStart={startTime}
                kmStart={startKm}
                onTimeChange={handleStartTimeChange}
                onKmChange={handleStartKmChange}
            />
            
            <EndRegComp titleEndTime={"Slut tid"} 
                        titleEndKm={"Slut km"} 
                        titleRemark={"Bemærkning"} 
                        timeEnd={endTime} 
                        kmEnd={endKm} 
                        remarkVal={remark} 
                        onTimeChange={handleEndTimeChange} 
                        onKmChange={handleEndKmChange} 
                        onRemarkChange={handleRemarkChange}
            />            

            <div>
                <p>Start tid: {startTime}</p>
                <p>Start km: {startKm}</p>
                <p>Slut tid: {endTime}</p>
                <p>Slut km: {endKm}</p>
                <p>Bemærkning: {remark}</p>
            </div>
        </div>
    );
}

export default MainRegComp;
