import StartRegComp from './StartRegComp';
import {useRef, useState} from "react";
import RegTaskHeadlineComp from "./RegTaskHeadlineComp.tsx";
import EndRegComp from "./EndRegComp.tsx";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {NEW_TASK_PAGE_TITLE} from "../Constants.ts";
import {Link} from "react-router-dom";


function MainRegComp() {

    // Reference to a hidden Link element for program navigation to "/history"
    const linkRefHistory = useRef<HTMLAnchorElement>(null);
    
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
    
    function onAnnullerClick(){
        
        // Navigates user to "/history" if linkRefHistory isn't null
        if (linkRefHistory.current) {
            linkRefHistory.current.click();
        }
    }
    
    async function onSaveClick(){
        try{
            // placeholder API
            // TODO finish here!
            console.log("Gemmer data...")
            console.log(`Start tid: ${startTime}`)
            console.log(`Start km: ${startKm}`)

            // Navigates user to "/history" if linkRefHistory isn't null
            if (linkRefHistory.current) {
                linkRefHistory.current.click();
            }
            
        } catch (error){
            // TODO finish here!
            console.error(error);
        }
    }
    
    async function onSendClick(){
        
        if (startTime == '' || startKm == '' || endTime == ''|| endKm == '' ) {
            // placeholder notification to user
            // TODO finish here!
            console.log("Du mangler at indtaste...")
            
        } else{
            
            try {
                // placeholder API
                // TODO finish here
                console.log("Gemmer data...");
                console.log("Data gemt");

                // Navigates user to "/history" if linkRefHistory isn't null
                if (linkRefHistory.current) {
                    linkRefHistory.current.click();
                }
                
            } catch (error) {
                // TODO finish here!
                console.error(error);
            }    
        }
    }

    return (
        <div className='regMainComponent-container mainComponent-wrapper'>
            <RegTaskHeadlineComp
                title={NEW_TASK_PAGE_TITLE}
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
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}
                        // changing view to '/history'
                        onClick={onAnnullerClick}>
                        Annuller</Button>

                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}
                        onClick={async () => {
                            await onSaveClick()
                        }}>
                        Gem som kladde</Button>

                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}
                        onClick={async () => {
                            await onSendClick();
                        }}>
                        Send</Button>
                        <Link to="/history" ref={linkRefHistory} style={{display: 'none'}}/> 
            </Stack>
        </div>
    );
}

export default MainRegComp;
