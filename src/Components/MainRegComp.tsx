import StartRegComp from './StartRegComp';
import {useState} from "react";
import RegTaskHeadlineComp from "./RegTaskHeadlineComp.tsx";
import EndRegComp from "./EndRegComp.tsx";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button"; // Importer StartRegComp

function MainRegComp() {
    
    // State management for registration properties
    const [startTime, setStartTime] = useState<string>('');
    const [startKm, setStartKm] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [endKm, setEndKm] = useState<string>('');
    const [remark, setRemark] = useState<string>('');
    
    // Handles start time updates
    const handleStartTimeChange = (timeStartValue: string) => {
        setStartTime(timeStartValue);
    };

    // Handles start km updates
    const handleStartKmChange = (kmStartValue: string) => {
        setStartKm(kmStartValue);
    };

    // Handles end time updates
    const handleEndTimeChange = (timeEndValue: string) => {
        setEndTime(timeEndValue);
    };

    // Handles end km updates
    const handleEndKmChange = (kmEndValue: string) => {
        setEndKm(kmEndValue);
    };
    
    // Handles remark updates
    const handleRemarkChange = (remarkValue: string) => {
        setRemark(remarkValue);
    }

  

    return (
        <div className='regMainComponent-container mainComponent-wrapper'>
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

            <Stack className='buttons-wrapper' spacing={2} direction="row">
                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}>
                        Annuller</Button>
                
                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}>
                        Gem som kladde</Button>
                
                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}>
                        Send</Button>
            </Stack>

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
