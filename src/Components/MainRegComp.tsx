import StartRegComp from './StartRegComp';
import {useRef, useState} from "react";
import RegTaskHeadlineComp from "./RegTaskHeadlineComp.tsx";
import EndRegComp from "./EndRegComp.tsx";
import Button from "@mui/material/Button";
import {NEW_TASK_PAGE_TITLE} from "../Constants.ts";
import {Link} from "react-router-dom";
import {TimePeriodRules} from "../Services/ValidationRules/TimePeriodRules.ts";
import {DistanceRules} from "../Services/ValidationRules/DistanceRules.ts";
import { Stack } from '@mui/material';


function MainRegComp() {

    // Reference to a hidden Link element for program navigation to "/history"
    const linkRefHistory = useRef<HTMLAnchorElement>(null);
    
    // State management for registration properties
    const [startTime, setStartTime] = useState<string>('');
    const [startKm, setStartKm] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [endKm, setEndKm] = useState<string>('');
    const [remark, setRemark] = useState<string>('');
    const [errorStartTime, setErrorStartTime] = useState<boolean>(false);
    const [errorStartKm, setErrorStartKm] = useState<boolean>(false);
    const [errorEndTime, setErrorEndTime] = useState<boolean>(false);
    const [errorEndKm, setErrorEndKm] = useState<boolean>(false);
    
    
    // Handles start time updates
    const handleStartTimeChange = (timeStartValue: string) => {
        setStartTime(timeStartValue);
    };
    
    // Handles start time error updates
    const handleStartTimeErrorChange = (startTimeErrorState: boolean) => {
        setErrorStartTime(startTimeErrorState);
    } 

    // Handles start km updates
    const handleStartKmChange = (kmStartValue: string) => {
        setStartKm(kmStartValue);
    };

    // Handles start km error updates
    const handleStartKmErrorChange = (startKmErrorState: boolean) => {
        setErrorStartKm(startKmErrorState);
    }

    // Handles end time updates
    const handleEndTimeChange = (timeEndValue: string) => {
        setEndTime(timeEndValue);
    };

    // Handles end time error updates
    const handleEndTimeErrorChange = (endTimeErrorState: boolean) => {
        setErrorEndTime(endTimeErrorState);
    }

    // Handles end km updates
    const handleEndKmChange = (kmEndValue: string) => {
        setEndKm(kmEndValue);
    };

    // Handles end km error updates
    const handleEndKmErrorChange = (endKmErrorState: boolean) => {
        setErrorEndKm(endKmErrorState);
    }
    
    // Handles remark updates
    const handleRemarkChange = (remarkValue: string) => {
        setRemark(remarkValue);
    }
    
    
    function changeViewToHistory(): void {
        // Navigates user to "/history" if linkRefHistory isn't null
        if (linkRefHistory.current) {
            linkRefHistory.current.click();
        }
    }
    
    
    // Change view to /history view
    function onAnnullerClick(){ changeViewToHistory();  }
    
    
    async function onSaveClick(){
        
        let timePeriodIsValid:boolean = true;
        let distanceIsValid:boolean = true;
        
        // Checks if all textboxes is empty
        let allFieldsEmpty:boolean = isAllFieldsEmpty();
        if (allFieldsEmpty) { 
            console.log("Successfully change of view")
            changeViewToHistory();
            return;
        }
        
        
        
        
            // Checks if any error in textboxes
            let allFieldsWithoutErrors: boolean = isAllFieldsWithoutErrors();
            if (allFieldsWithoutErrors) {

                // Checks if both start time and start km
                let twoTimeInput: boolean = isTwoTimeInputs();
                if (twoTimeInput) {
                    let isValid: boolean = TimePeriodRules.validateTimePeriod(startTime, endTime);
                    if (!isValid) {
                        timePeriodIsValid = false;
                        setErrorStartTime(true);
                        setErrorEndTime(true);
                    }
                }

                // Checks if both start km and end km
                let twoKmInput: boolean = isTwoKmInputs();
                if (twoKmInput) {
                    let isValid: boolean = DistanceRules.validateDistance(startKm, endKm);
                    if (!isValid) {
                        distanceIsValid = false;
                        setErrorStartKm(true);
                        setErrorEndKm(true);
                    }
                }

                if (timePeriodIsValid && distanceIsValid) {

                    // TODO: implement web IPA 
                    console.log("Free to save!")
                    changeViewToHistory();
                    
                } else {
                    // TODO: 
                    console.log("Ret fejl")
                }
                
            }  else {

            notifyUser("Ret venligst fejlene")
            return;    
        }
            
    }
    

    async function onSendClick(){
        
        
    }
    
    
    
    
    
    

    
    
    function isAllFieldsEmpty(): boolean{
        
        let isAllEmpty:boolean;
        
        if (startTime == '' && startKm == '' && endTime == '' && endKm == '' && remark == ''){
            isAllEmpty = true;
            
        } else {
            isAllEmpty = false;
        }
        
        return isAllEmpty;
    }
    
    function isAllFieldsWithoutErrors(): boolean{
        
        let isAllWithoutErrors:boolean;
        
        if (errorStartTime || errorStartKm || errorEndTime || errorEndKm){
            isAllWithoutErrors = false;
        } else {
            isAllWithoutErrors = true;
        }
        
        return isAllWithoutErrors;
        
    }
    
    function isTwoTimeInputs(): boolean{
        
        let twoTimeInput:boolean;
        
        if (startTime != '' && endTime != ''){
            twoTimeInput = true;
            
        } else {
            twoTimeInput = false;
        }
        
        return twoTimeInput;
    }

    function isTwoKmInputs(): boolean{

        let twoKmInput:boolean;

        if (startKm != '' && endKm != ''){
            twoKmInput = true;

        } else {
            twoKmInput = false;
        }

        return twoKmInput;
    }
    
   
    
    
    
    
    function notifyUser(message:string): void {
        // TODO: IMPLEMENT LOGIC!
        
        console.log(message)
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
                errorTime={errorStartTime}
                errorKm={errorStartKm}
                onTimeChange={handleStartTimeChange}
                onKmChange={handleStartKmChange}
                onStartTimeErrorChange={handleStartTimeErrorChange}
                onStartKmErrorChange={handleStartKmErrorChange}
            />
            
            <EndRegComp titleEndTime={"Slut tid"} 
                        titleEndKm={"Slut km"} 
                        titleRemark={"Bemærkning"} 
                        timeEnd={endTime} 
                        kmEnd={endKm} 
                        remarkVal={remark} 
                        errorTime={errorEndTime}
                        errorKm={errorEndKm}
                        onTimeChange={handleEndTimeChange} 
                        onKmChange={handleEndKmChange} 
                        onRemarkChange={handleRemarkChange}
                        onEndTimeErrorChange={handleEndTimeErrorChange}
                        onEndKmErrorChange={handleEndKmErrorChange}
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
