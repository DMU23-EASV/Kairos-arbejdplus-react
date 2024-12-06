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
import {EErrorMessages} from "../Enum/EErrorMessages.ts";


function MainRegComp() {

    // Reference to a hidden Link element for program navigation to "/history"
    const linkRefHistory = useRef<HTMLAnchorElement>(null);
    
    function changeViewToHistory(): void {
        // Navigates user to "/history" if linkRefHistory isn't null
        if (linkRefHistory.current) {
            linkRefHistory.current.click();
        }
    }
    

    // State management for registration properties
    const [date, setDate] = useState<Dayjs>(dayjs());    
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

    const requiredData: { [key: string]: [string, React.Dispatch<React.SetStateAction<string>>] } = {
        startTime: [startTime, setErrorStartTime],
        startKm: [startKm, setErrorStartKm],
        endTime: [endTime, setErrorEndTime],
        endKm: [endKm, setErrorEndKm],
    };
    
    
    // Handler functions
    const handleDateChange = (newDate: Dayjs) => {
        setDate(newDate);
        console.log(newDate);
    };

    const handleStartTimeChange = (newStartTime: string) => {
        setStartTime(newStartTime);
        console.log(newStartTime);
        
        if (newStartTime && !TimeRules.validateTime(newStartTime)) {
            setErrorStartTime(EErrorMessages.StartTimeFormat)
        } else {
            setErrorStartTime(EErrorMessages.NoError);
        }
    };

    const handleStartKmChange = (newStartKm: string) => {
        setStartKm(newStartKm);
        console.log(newStartKm)
        
        if (newStartKm && !KmRules.validateKm(newStartKm)) {
            setErrorStartKm(EErrorMessages.KmFormat);
        } else {
            setErrorStartKm(EErrorMessages.NoError);
        }
    };

    const handleEndTimeChange = (newEndTime: string) => {
        setEndTime(newEndTime);
        console.log(newEndTime);

        if (newEndTime && !TimeRules.validateTime(newEndTime)) {
            setErrorEndTime(EErrorMessages.EndTimeFormat)
        } else {
            setErrorEndTime(EErrorMessages.NoError);
        }
    };

    const handleEndKmChange = (newEndKm: string) => {
        setEndKm(newEndKm);
        console.log(newEndKm);

        if (newEndKm && !KmRules.validateKm(newEndKm)) {
            setErrorEndKm(EErrorMessages.KmFormat);
        } else {
            setErrorEndKm(EErrorMessages.NoError);
        }
    };

    const handleRemarkChange = (newRemark: string) => {
        setRemark(newRemark);
        console.log(newRemark);
    };
    

    // This function switches the view to history without performing any database save operation
    function handleAnnullerClick(): void {
        console.log("Annuller...")
        changeViewToHistory();
    }


    

    function handleSaveClick(): void {

        const taskStatus:ETaskStatus = ETaskStatus.Draft;

        const allFieldsIsEmpty: boolean = isAllFieldsEmpty();
        const allFieldsAreFilledOut: boolean = isAllFieldsFilledOut();

        if (allFieldsIsEmpty){
            handleIfAllFieldsIsEmpty()
        }

        if (allFieldsAreFilledOut){
            handleIfAllFieldsAreFilledOut(taskStatus);

        } else {
            handleIfSomeFieldsAreFilledOut(taskStatus);
        }
    }


    function handleIfSomeFieldsAreFilledOut(taskStatus: ETaskStatus) {
        
        let timeIsValid: boolean = true;
        let kmIsValid: boolean = true;
        
        
        if (startTime !== "" && endTime !== ""){
            const timePeriodIsValid: boolean = TimePeriodRules.validateTimePeriod(startTime, endTime);
            
            if (!timePeriodIsValid){
                timeIsValid = false;
                console.log("Time inputs wasn't valid")
                setTimePeriodError(EErrorMessages.StartTimeBeforeEndTime);
                
            } else {
                console.log("Time inputs is valid")
                setTimePeriodError(EErrorMessages.NoError);
            }
        }
        
        if (startKm !== "" && endKm !== ""){
            const kmDistanceIsValid: boolean = DistanceRules.validateDistance(startKm, endKm);
            
            if (!kmDistanceIsValid){
                kmIsValid = false;
                console.log("Km inputs wasn's valid")
                setDistanceError(EErrorMessages.StartKmBeforeEndKm)
              
            } else {
                console.log("Km inputs is valid")
                setDistanceError(EErrorMessages.NoError);
            }
        } 
        
        if (timeIsValid && kmIsValid){
            const taskObj: TaskModel = createTaskObj(taskStatus);

            sendToDatabase(taskObj);
            
        } else {
            console.log("Not valid inputs")
        }
        
    }
    
    
    function setTimePeriodError(errorMessage:string){
        setErrorStartTime(errorMessage);
        setErrorEndTime(errorMessage)
    }
    
    
    function setDistanceError(errorMessage:string){
        setErrorStartKm(errorMessage);
        setErrorEndKm(errorMessage);
    }
    
    

    function handleSendClick(): void {
        console.log("handle send")
        const taskStatus:ETaskStatus = ETaskStatus.AwaitingApproval;

        const allFieldsIsEmpty: boolean = isAllFieldsEmpty();
        const allFieldsAreFilledOut: boolean = isAllFieldsFilledOut();

        if (allFieldsIsEmpty){
            handleIfAllFieldsIsEmpty()
        }

        if (allFieldsAreFilledOut){
            handleIfAllFieldsAreFilledOut(taskStatus);

        } else {
            console.log("Empty fields...")
            // Finds empty fields and notifies user with an error message
            setErrorMessagesEmptyFields();
        }
    }
    
    
    
    
    function isAllFieldsEmpty(): boolean {
        if (date === undefined && startTime === "" && startKm === "" && endTime === "" && endKm === ""){
            return true;
            
        } else {
            return false;
        }
    }
    
    function isAllFieldsFilledOut(): boolean {

        if (date !== undefined && startTime !== "" && startKm !== "" && endTime !== "" && endKm !== ""){
            return true;
        } else {
            return false;
        }
    }
    
    function handleIfAllFieldsIsEmpty(): void {
        console.log("All empty...")
        changeViewToHistory();
    }
    
    function handleIfAllFieldsAreFilledOut(taskStatus:ETaskStatus): void {
        const timeIsValid = validateTimePeriod(startTime, endTime);
        const kmIsValid = validateKmDistance(startKm, endKm);

        if (timeIsValid && kmIsValid){
            console.log("Data is Valid")
            const taskObj:TaskModel = createTaskObj(taskStatus);

            sendToDatabase(taskObj);

        } else {
            console.log("Not valid data")
        }
    }
    
    
    
    
    
    function setErrorMessagesEmptyFields(): void {

        if (!date) {
            setErrorDate(EErrorMessages.Required);
        } else {
            setErrorDate(EErrorMessages.NoError); 
        }
        
        Object.entries(requiredData).forEach(([, [value, setError]]) => {
            if (!value || value.trim() === "") {
                setError(EErrorMessages.Required); 
            } else {
                setError(EErrorMessages.NoError); 
            }
        });
        
    }


    function validateTimePeriod(timeStart:string, timeEnd:string): boolean {
        let isValid:boolean;

        if (TimePeriodRules.validateTimePeriod(timeStart, timeEnd)) {
            isValid = true;
            setTimePeriodError(EErrorMessages.NoError);
            
        } else {
            isValid = false;
            setTimePeriodError(EErrorMessages.StartTimeBeforeEndTime);
        }
        
        return isValid;
    }


    function validateKmDistance(kmStart:string, kmEnd:string): boolean {
        let isValid;
        
        if (DistanceRules.validateDistance(kmStart, kmEnd)) { 
            isValid = true;
            setDistanceError(EErrorMessages.NoError);
            
        } else {
            isValid = false;
            setDistanceError(EErrorMessages.StartKmBeforeEndKm);
        }
        return isValid;
    }
    

    function createTaskObj(taskStatus:ETaskStatus):TaskModel {

        // Task object to save in database
        const taskObj: TaskModel = new TaskModel();
        
        taskObj.owner = sessionStorage.getItem("username")!.toString();
        taskObj.selecteDate = date?.toDate();
        taskObj.startTime = convertToDateType(date.toDate(), startTime);
        taskObj.startKm = parseInt(startKm);
        taskObj.endTime = convertToDateType(date.toDate(), endTime); 
        taskObj.endKm = parseInt(endKm);
        taskObj.remark = remark;
        taskObj.modelStatus = taskStatus;
            
        return taskObj;
    }


    function convertToDateType(date:Date, time:string):Date {

        const [hours, minutes] = time.split(":").map(Number);

        const newDate = new Date(date); 
        newDate.setHours(hours, minutes, 0, 0); 
        

        return newDate;

    }


    function sendToDatabase(taskObj:TaskModel): void {
        console.log(taskObj);
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
