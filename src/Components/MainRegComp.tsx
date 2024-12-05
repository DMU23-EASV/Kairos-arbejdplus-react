import StartRegComp from './StartRegComp';
import {useRef, useState} from "react";
import RegTaskHeadlineComp from "./RegTaskHeadlineComp.tsx";
import EndRegComp from "./EndRegComp.tsx";
import Button from "@mui/material/Button";
import {NEW_TASK_PAGE_TITLE} from "../Constants.ts";
import {Link} from "react-router-dom";
import {Stack} from '@mui/material';
import {TaskModel} from "../Models/TaskModel.ts";
import dayjs, {Dayjs} from "dayjs";
import {TimeRules} from "../Services/ValidationRules/TimeRules.ts";
import {KmRules} from "../Services/ValidationRules/KmRules.ts";
import {TimePeriodRules} from "../Services/ValidationRules/TimePeriodRules.ts";
import {DistanceRules} from "../Services/ValidationRules/DistanceRules.ts";
import {ETaskStatus} from "../Enum/ETaskStatus.ts";


function MainRegComp() {

    // Reference to a hidden Link element for program navigation to "/history"
    const linkRefHistory = useRef<HTMLAnchorElement>(null);
    
    function changeViewToHistory(): void {
        // Navigates user to "/history" if linkRefHistory isn't null
        if (linkRefHistory.current) {
            linkRefHistory.current.click();
        }
    }

    // Task object to save in database
    const taskObj: TaskModel = new TaskModel();

    // State management for registration properties
    const [date, setDate] = useState<Dayjs | null>(dayjs());    
    const [startTime, setStartTime] = useState<string>("");
    const [startKm, setStartKm] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [endKm, setEndKm] = useState<string>("");
    const [remark, setRemark] = useState<string>("");
    
    // State management for error messages
    const [errorDate, setErrorDate] = useState<string>("");
    const [errorStartTime, setErrorStartTime] = useState<string>("");
    const [errorStartKm, setErrorStartKm] = useState<string>("");
    const [errorEndTime, setErrorEndTime] = useState<string>("");
    const [errorEndKm, setErrorEndKm] = useState<string>("");


    // Handler functions
    const handleDateChange = (newDate: Dayjs | null) => {
        setDate(newDate);
        taskObj.selecteDate = newDate?.toDate();
        
        console.log(newDate);
    };

    const handleStartTimeChange = (newStartTime: string) => {
        setStartTime(newStartTime);
        console.log(newStartTime);
        
        if (newStartTime && !TimeRules.validateTime(newStartTime)) {
            setErrorStartTime("Starttid skal være hh:mm format")
        } else {
            setErrorStartTime("");

            // Changes type of startTime to Date
            const [hours, minutes] = newStartTime.split(":").map(Number);
            if (date) {
                taskObj.startTime = new Date(date.year(), date.month(), date.date(), hours, minutes, 0, 0);
            }
        }

        validateTaskData();

    };

    const handleStartKmChange = (newStartKm: string) => {
        setStartKm(newStartKm);
        console.log(newStartKm)
        
        if (newStartKm && !KmRules.validateKm(newStartKm)) {
            setErrorStartKm("Ikke korrekt km format");
        } else {
            setErrorStartKm("");
            taskObj.startKm = parseInt(newStartKm);
        }
        
        validateTaskData();
    };

    const handleEndTimeChange = (newEndTime: string) => {
        setEndTime(newEndTime);
        console.log(newEndTime);

        if (newEndTime && !TimeRules.validateTime(newEndTime)) {
            setErrorEndTime("Sluttid skal være hh:mm format")
        } else {
            setErrorEndTime("");

            // Changes type of startTime to Date
            const [hours, minutes] = newEndTime.split(":").map(Number);
            if (date) {
                taskObj.endTime = new Date(date.year(), date.month(), date.date(), hours, minutes, 0, 0);
            }
        }

        validateTaskData();

    };

    const handleEndKmChange = (newEndKm: string) => {
        setEndKm(newEndKm);
        console.log(newEndKm);

        if (newEndKm && !KmRules.validateKm(newEndKm)) {
            setErrorEndKm("Ikke korrekt km format");
        } else {
            setErrorEndKm("");
            taskObj.endKm = parseInt(newEndKm);
        }
        
        validateTaskData();
    };

    const handleRemarkChange = (newRemark: string) => {
        setRemark(newRemark);
        taskObj.remark = newRemark;
        console.log(newRemark);
    };
    

    // This function switches the view to history without performing any database save operation
    function handleAnnullerClick(): void {
        console.log("Annuller...")
        changeViewToHistory();
    }    
    
    
    function handleSaveClick(): void {

        const taskStatus:ETaskStatus = ETaskStatus.Draft;

        
    }
    
    function handleSendClick(): void {

        const taskStatus:ETaskStatus = ETaskStatus.AwaitingApproval;
        
        if (date === null && startTime === null && startKm === null && endTime === null && endKm === null){
            console.log("All empty...")
            changeViewToHistory();
        }
        
        if (date !== null && startTime !== null && startKm !== null && endTime !== null && endKm !== null){
            const isValid = validateTaskData();
            
            if (isValid){
                sendToDatabase(taskStatus);
            } else {
                console.log("Not valid data")
            }
        }
        
    }
       

    function validateTaskData(): boolean {
        let isValid:boolean = false;
        
        if (TimePeriodRules.validateTimePeriod(startTime, endTime) && DistanceRules.validateDistance(startKm, endKm)){
            isValid = true;

            setErrorStartTime("");
            setErrorEndTime("");
            setErrorStartKm("")
            setErrorEndKm("")
            
        } else if (TimePeriodRules.validateTimePeriod(startTime, endTime) && !DistanceRules.validateDistance(startKm, endKm)) {
            isValid = false;
            
            setErrorStartKm("Start km skal være mindre end slut km")
            setErrorEndKm("Start km skal være mindre end slut km")
            
        } else if (!TimePeriodRules.validateTimePeriod(startTime, endTime) && DistanceRules.validateDistance(startKm, endKm)){
            isValid = false;
            
            setErrorStartTime("Starttid skal være før sluttid");
            setErrorEndTime("Starttid skal være før sluttid");
        }
        
        return isValid;
    }
    
    function sendToDatabase(taskStatus:ETaskStatus): void {
        console.log(`Taskstatus: ${taskStatus}`);
        console.log("Send to database...");
        
    }
  
    
    
    return (
        <div className='regMainComponent-container mainComponent-wrapper'>
            <RegTaskHeadlineComp
                title={NEW_TASK_PAGE_TITLE} 
            />
            
            <StartRegComp
                titleDate={"Dato"}
                titleStartTime={"Start tid"}
                titleStartKm={"Start km"}
                date={date}
                timeStart={startTime}
                kmStart={startKm}
                errorDateMessage={errorDate}
                errorTimeMessage={errorStartTime}
                errorKmMessage={errorStartKm}
                onDateChange={handleDateChange}
                onTimeChange={handleStartTimeChange}
                onKmChange={handleStartKmChange}
                
            />
            
            <EndRegComp titleEndTime={"Slut tid"} 
                        titleEndKm={"Slut km"} 
                        titleRemark={"Bemærkning"} 
                        timeEnd={endTime} 
                        kmEnd={endKm} 
                        remarkVal={remark} 
                        errorTimeMessage={errorEndTime}
                        errorKmMessage={errorEndKm}
                        onTimeChange={handleEndTimeChange}
                        onKmChange={handleEndKmChange}
                        onRemarkChange={handleRemarkChange}
                       
            />

            <Stack className='buttons-wrapper' spacing={2} direction="row">
                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}
                        // changing view to '/history'
                        onClick={handleAnnullerClick}>
                        Annuller</Button>

                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}
                        onClick={handleSaveClick}>
                        Gem som kladde</Button>

                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}
                        onClick={handleSendClick}>
                        Send</Button>
                        <Link to="/history" ref={linkRefHistory} style={{display: 'none'}}/> 
            </Stack>
        </div>
    );
}

export default MainRegComp;
