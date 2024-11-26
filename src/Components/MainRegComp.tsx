import StartRegComp from './StartRegComp';
import {useState} from "react"; // Importer StartRegComp

function MainRegComp() {
    // State til at gemme start tid og km
    const [startTime, setStartTime] = useState<string>('');
    const [startKm, setStartKm] = useState<string>('');
    

    // Håndtering af opdatering af start tid og km
    const handleStartTimeChange = (timeValue: string) => {
        setStartTime(timeValue);
    };

    const handleStartKmChange = (kmValue: string) => {
        setStartKm(kmValue);
    };

  

    return (
        <div>
            <StartRegComp
                time={startTime}
                km={startKm}
                onTimeChange={handleStartTimeChange}
                onKmChange={handleStartKmChange}
            />
            

            <div>
                <p>Start tid: {startTime}</p>
                <p>Start km: {startKm}</p>
            </div>
        </div>
    );
}

export default MainRegComp;
