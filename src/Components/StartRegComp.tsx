import TimeComp from "./TimeComp.tsx";
import KmComp from "./KmComp.tsx";
import {useState} from "react";

interface StartRegCompProps {
    time: string;                // Start tid som en string
    km: string;                  // Start km som en string
    onTimeChange: (newTime: string) => void; // Funktion til at opdatere tid
    onKmChange: (newKm: string) => void;     // Funktion til at opdatere km
}

const StartRegComp: React.FC<StartRegCompProps> = ({ time, km, onTimeChange, onKmChange }) => {

    const [startTime, setTime] = useState<string>(time);
    const [startKm, setKm] = useState<string>(km);

    // Håndterer opdatering af tid
    const handleTimeChange = (newTime: string) => {
        setTime(newTime); // Opdaterer time
        onTimeChange(newTime);
    };

    // Håndterer opdatering af kilometer
    const handleKmChange = (newKm: string) => {
        setKm(newKm); // Opdaterer km
        onKmChange(newKm);
    };
    
    return (
    
        <div className='regComponent-wrapper'>
                <TimeComp title={"Start tid"}
                          value={startTime}
                          onChange={handleTimeChange}/>
            
                <KmComp title={"Slut km"}
                        value={startKm}       
                        onChange={handleKmChange}/>
        </div>  
        
    );
    
}

export default StartRegComp;