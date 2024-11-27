import StartRegComp from './StartRegComp';
import {useState} from "react";
import RemarkComp from "./RemarkComp.tsx";
import remarkComp from "./RemarkComp.tsx";
import RegTaskHeadlineComp from "./RegTaskHeadlineComp.tsx"; // Importer StartRegComp

function MainRegComp() {
    // State til at gemme start tid og km
    const [startTime, setStartTime] = useState<string>('');
    const [startKm, setStartKm] = useState<string>('');
    
    const [endTime, setEndTime] = useState<string>('');
    const [endKm, setEndKm] = useState<string>('');
    
    const [remark, setRemark] = useState<string>('');
    
    // Håndtering af opdatering af start tid og km
    const handleStartTimeChange = (timeValue: string) => {
        setStartTime(timeValue);
    };

    const handleStartKmChange = (kmValue: string) => {
        setStartKm(kmValue);
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
            
            <RemarkComp title={"Bemærkning"}
                        remark={remark}
                        onChange={handleRemarkChange}/>/
            

            <div>
                <p>Start tid: {startTime}</p>
                <p>Start km: {startKm}</p>
            </div>
        </div>
    );
}

export default MainRegComp;
