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
    
    
    function onAnnullerClick(){
     
        changeViewToHistory();
    }
    
    async function onSaveClick(){

        if (errorStartTime || errorStartKm || errorEndTime || errorEndKm) {
            handleErrorStates();
        }
        
        else if (startTime == '' || startKm == '' || endTime == ''|| endKm == '' ){
            changeViewToHistory();
            
        } else {

            if (startTime != '' && endTime != '') {
                
                let timeIsValid: boolean = validateTimeInputs(startTime, endTime);
                if (timeIsValid) {
                    if (validateKmInputs(startKm, endKm)) {
                        try {
                            // TODO: placeholder API
                            console.log("tid gemt")
                            changeViewToHistory()
                        } catch (error){

                        }   
                    }
                    else {
                        setErrorStartKm(true);
                        setErrorEndKm(true);
                    }
                }
                else {
                    setErrorStartTime(true);
                    setErrorEndTime(true);
                }
                

            } else if (startKm != '' && endKm != '') {
                
                let kmIsValid: boolean = validateKmInputs(startKm, endKm);
                if (kmIsValid) {
                    try {
                        // TODO: placeholder API
                        console.log("km gemt")
                        changeViewToHistory()
                    } catch (error){
                    }
                }
            } 
            
            else {
                
                try {
                    // TODO: Placeholder API
                    console.log("information gemt")
                    changeViewToHistory()
                } catch (error){
                    
                }
            }
            
            
        }
    }
    

    async function onSendClick(){

        if (startTime == '' || startKm == '' || endTime == ''|| endKm == '' ) {
            
            handleEmptyFields();

        } else if (errorStartTime || errorStartKm || errorEndTime || errorEndKm) {
            
            handleErrorStates();
            
        }else {

            let timeIsValid:boolean = validateTimeInputs(startTime, endTime);
            let kmIsValid:boolean = validateKmInputs(startKm, endKm);
            
            if (timeIsValid && kmIsValid) {

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
                
            } else{
                // TODO: handel!

                if (!timeIsValid && !kmIsValid) {
                    setErrorStartTime(true);
                    setErrorEndTime(true);
                    setErrorStartKm(true);
                    setErrorEndKm(true);
                    
                } else if (!timeIsValid) {
                    setErrorStartTime(true);
                    setErrorEndTime(true);
                    
                    notifyUser("Der er sket en fejl med indtastningen af tid");
                    
                } else if (!kmIsValid) {
                    setErrorStartKm(true);
                    setErrorEndKm(true);

                    notifyUser("Der er sket en fejl med indtastningen af km");
                }
                
            }
        }
    }
    
    

    function validateTimeInputs(startTime:string , endTime:string): boolean {

        let isValid:boolean = false;
        
        // hour and minutes from start time
        let hourStartTime:number = getHour(startTime);
        let minutesStartTime:number = getMinutes(startTime);
        // hours and minutes from end time
        let hourEndTime:number = getHour(endTime);
        let minutesEndTime:number = getMinutes(endTime);
        
        if (hourStartTime < hourEndTime) { isValid = true; }
        if (hourStartTime > hourEndTime) { isValid = false; }
        if (hourStartTime == hourEndTime && minutesStartTime < minutesEndTime) { isValid = true; }
        if (hourStartTime == hourEndTime && minutesStartTime > minutesEndTime) { isValid = false; }
        if (hourStartTime == hourEndTime && minutesStartTime == minutesEndTime) {isValid = false; }
        
        return isValid;
    }
    
    
    function getHour(time: string): number {
        
        let timeSplit = time.split(":");
        return parseInt(timeSplit[0]);
    }


    function getMinutes(time: string): number {

        let timeSplit = time.split(":");
        return parseInt(timeSplit[1]);
    }


    function validateKmInputs(startKm: string, endKm: string) {
        
        let isValid:boolean = false;
        
        let kmStart:number = parseInt(startKm);
        let kmEnd:number = parseInt(endKm);
        
        if (kmStart > kmEnd) { isValid = false; }
        if (kmStart < kmEnd) { isValid = true; }
        if (kmStart == kmEnd) { isValid = false; }
        
        return isValid;
    }
    
    
    function handleErrorStates(): void {
        
        if (errorStartTime) { notifyUser("Indtast rigtig start tid"); }
        if (errorStartKm) { notifyUser("Indtast rigtig start km"); }
        if (errorEndTime) { notifyUser("Indtast rigtig slut tid"); }
        if (errorEndKm) { notifyUser("Indtast rigtig slut km"); }
    }
    
    function handleEmptyFields(): void {

        if (startTime == '') {
            setErrorStartTime(true);
            notifyUser("Start tid er påkrævet");
        }
        if (startKm == '') {
            setErrorStartKm(true);
            notifyUser("Start km er påkrævet");
        }
        if (endTime == '') {
            setErrorEndTime(true);
            notifyUser("Slut tid er påkrævet");
        }
        if (endKm == '') {
            setErrorEndKm(true);
            notifyUser("Slut km er påkrævet");
        }

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
