import StartRegComp from './StartRegComp';
import {useRef, useState, useEffect} from "react";
import RegTaskHeadlineComp from "./RegTaskHeadlineComp.tsx";
import EndRegComp from "./EndRegComp.tsx";
import Button from "@mui/material/Button";
import {NEW_TASK_PAGE_TITLE} from "../Constants.ts";
import {Link, useLocation} from "react-router-dom";
import {Stack} from '@mui/material';
import {TaskModel} from "../Models/TaskModel.ts";
import dayjs, {Dayjs} from "dayjs";
import {TimeRules} from "../Services/ValidationRules/TimeRules.ts";
import {KmRules} from "../Services/ValidationRules/KmRules.ts";
import {TimePeriodRules} from "../Services/ValidationRules/TimePeriodRules.ts";
import {DistanceRules} from "../Services/ValidationRules/DistanceRules.ts";
import {ETaskStatus} from "../Enum/ETaskStatus.ts";
import {EErrorMessages} from "../Enum/EErrorMessages.ts";
import {UtilityDateAndTime} from "../Services/UtilityDateAndTime.ts";
import {UtilityKm} from "../Services/UtilityKm.ts";
import {PostTask, PutTask} from "../Services/TaskService.ts";
import { ObjectId } from 'bson';

interface MainRegCompProp {
    task: TaskModel; // The task prop is of type TaskModel
  }

const MainRegComp: React.FC<MainRegCompProp> = () => {
    
    const location = useLocation();
    const task: TaskModel = location.state?.task;

    useEffect(() => {
        if (task) {
            console.log("Loaded task:", task.owner, "Name: ", task.name);
            loadTaskObject(task);
            console.log(task.bsonId)
        }
    }, [task]);

    // Reference to a hidden Link element for program navigation to "/history"
    const linkRefHistory = useRef<HTMLAnchorElement>(null);


    /**
     * Function for changing view to /history
     */
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

    // Object mapping input field names to their values and error handlers
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
  
    /**
     * This function handles the case where user clicks the "Annuller" button and 
     * switches the view to history without performing any database save operation
     */
    function handleAnnullerClick(): void {
        console.log("Annuller...")
        changeViewToHistory();
    }


    /**
     * Handles the case where the user clicks the "Gem som kladde" button.
     * The behavior of the action varies depending on how many fields are filled out
     */
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


    /**
     * This function handles the case where some of the fields are filled out.
     * It checks if both start- and end time is filled out and validates the time inputs if so.
     * It checks if both start- and end km is filled out and validates the km inputs if so.
     *
     * If the inputs are valid, a task object is created and sent to the database.
     * If the inputs are invalid, an error message is generated.
     * @param taskStatus The status of the task to be created (e.g., Draft, AwaitingApproval).
     */
    function handleIfSomeFieldsAreFilledOut(taskStatus: ETaskStatus) {
        console.log("HANDLING SOME FIELDS METODE")
        let timeIsValid: boolean = true;
        let kmIsValid: boolean = true;
        
        
        if (startTime !== "" && endTime !== ""){
            const timePeriodIsValid: boolean = TimePeriodRules.validateTimePeriod(startTime, endTime);
            
            if (!timePeriodIsValid){
                timeIsValid = false;
                console.log("SOME FIELDS - Time inputs wasn't valid")
                setTimePeriodError(EErrorMessages.StartTimeBeforeEndTime);
                
            } else {
                console.log("SOME FIELDS - Time inputs is valid")
                setTimePeriodError(EErrorMessages.NoError);
            }
        }
        
        if (startKm !== "" && endKm !== ""){
            const kmDistanceIsValid: boolean = DistanceRules.validateDistance(startKm, endKm);
            
            if (!kmDistanceIsValid){
                kmIsValid = false;
                console.log("SOME FIELDS - Km inputs wasn's valid")
                setDistanceError(EErrorMessages.StartKmBeforeEndKm)
              
            } else {
                console.log("SOME FIELDS - Km inputs is valid")
                setDistanceError(EErrorMessages.NoError);
            }
        } 
        
        if (timeIsValid && kmIsValid){
            const taskObj: TaskModel = createTaskObj(taskStatus);

            sendToDatabase(taskObj);
            
        } else {
            console.log("SOMEFIELDS ARE FILLED OUT - Not valid inputs")
        }
        
    }


    /**
     * Sets the error messages for both the start and end time fields
     * @param errorMessage The error message to be displayed
     */
    function setTimePeriodError(errorMessage:string){
        setErrorStartTime(errorMessage);
        setErrorEndTime(errorMessage)
    }

    /**
     * Sets the error messages for both the start and end km fields
     * @param errorMessage The error message to be displayed
     */
    function setDistanceError(errorMessage:string){
        setErrorStartKm(errorMessage);
        setErrorEndKm(errorMessage);
    }

    
    /**
     * Handles the case where the user clicks the "Send" button.
     * The behavior of the action varies depending on how many fields are filled out.
     */
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


    /**
     * Checks if all fields are empty 
     * @return true if all fields are empty - false if not 
     */
    function isAllFieldsEmpty(): boolean {
        if (date === undefined && startTime === "" && startKm === "" && endTime === "" && endKm === ""){
            return true;
            
        } else {
            return false;
        }
    }


    /**
     * Checks if all fields are filled out
     * @return true if all fields are filled out - false if not
     */
    function isAllFieldsFilledOut(): boolean {

        if (date !== undefined && startTime !== "" && startKm !== "" && endTime !== "" && endKm !== ""){
            return true;
        } else {
            return false;
        }
    }


    /**
     * Handles the case where all fields are empty by navigating to the /history view.
     */
    function handleIfAllFieldsIsEmpty(): void {
        console.log("All empty...")
        changeViewToHistory();
    }


    /**
     * This function handles the case where all fields are filled out.
     * It validates both start- and end time inputs, and start- and end km inputs.
     * If the inputs are valid, a task object is created and sent to the database.
     * If the inputs are invalid error messages are generated.
     * @param taskStatus The status of the task to be created (e.g., Draft, AwaitingApproval).
     */
    function handleIfAllFieldsAreFilledOut(taskStatus:ETaskStatus): void {
        console.log("HANDLING ALL FIELDS")
        const timeIsValid = validateTimePeriod(startTime, endTime);
        const kmIsValid = validateKmDistance(startKm, endKm);

        if (timeIsValid && kmIsValid){
            console.log("ALL FIELDS - Data is Valid")
            const taskObj:TaskModel = createTaskObj(taskStatus);

            sendToDatabase(taskObj);

        } else {
            console.log("ALL FIELDS ARE FILLED OUT - Not valid data")
            
            if (!timeIsValid){
                setTimePeriodError(EErrorMessages.StartTimeBeforeEndTime);
            }
            
            if (!kmIsValid) {
                setDistanceError(EErrorMessages.StartKmBeforeEndKm)
            }
        }
    }


    /**
     * This function iterates through all the fields in the UI and sets error messages based on 
     * if the fields are filled out or not.
     * For each empty field a "Required" message is displayed.
     */
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


    /**
     * Validates a given time period
     * @param timeStart The start time
     * @param timeEnd The end time
     * @return true if valid time period - false if not
     */
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


    /**
     * Validates a given km distance
     * @param kmStart The start km
     * @param kmEnd The end km
     * @return true if valid km distance - false if not
     */
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


    /**
     * This function creates a task object based on the filled-out fields and a given task status.
     * We have to check that no data is null, as the API wont accept null values.
     * @param taskStatus The status of the task to be created (e.g., Draft, AwaitingApproval).
     * @return a created task object
     */
    function createTaskObj(taskStatus:ETaskStatus):TaskModel {

        // Task object to save in database
        const taskObj: TaskModel = new TaskModel();
        
        if (startTime == ""){
            setStartTime("00:00")
        }

        taskObj.owner = sessionStorage.getItem("username")!.toString();
        taskObj.selecteDate = date?.toDate();

        if(endTime != null){
            taskObj.endTime = UtilityDateAndTime.convertTimeStringToDateType(date.toDate(), endTime); 
        }

        if(parseInt(startKm)){
            taskObj.startKilometers = parseInt(startKm)
        }

        if(parseInt(endKm)){
            taskObj.endKilometers = parseInt(endKm);
        }
        taskObj.startTime = UtilityDateAndTime.convertTimeStringToDateType(date.toDate(), startTime);
        taskObj.name = remark;
        taskObj.modelStatus = taskStatus;

        if (task && task.bsonId != undefined) {
            taskObj.bsonId = task.bsonId;
        }

        return taskObj;
    }



    /**
     * 
     * @param taskObj The created task object to be sent to the database
     */
    function sendToDatabase(taskObj:TaskModel): void {
        //console.log("MainRegComp - sendToDatabase: Send to database..." + taskObj);
        //console.log("MainRegComp - sendToDatabase: TASK ID IS : " + taskObj.bsonId)

        if(taskObj.bsonId === undefined){
            {PostTask(taskObj)} 
            alert("Ny Tids registering")
            //console.log("POST")
        } else {
            (PutTask(taskObj))
            alert("Tids registering ændret")
            console.log("PUT")
            console.log("START KM : " + taskObj.endKilometers)
            console.log("END KM : " + taskObj.startKilometers)
            console.log("START TIME : " + taskObj.startTime)
            console.log("END TIME : " + taskObj.endTime)
            console.log("COMMENT : " + taskObj.comment)

        }
        changeViewToHistory();
    }
    
    function loadTaskObject(excTaskObj:TaskModel): void{
        console.log("BEFORE ADDING TO COMP: Object Start Time: " + excTaskObj.startTime)
        console.log("BEFORE ADDING TO COMP: Loading Task Object " +  excTaskObj.owner )
        setDate(UtilityDateAndTime.convertDateToDayjsType(excTaskObj.startTime));
        setStartTime(UtilityDateAndTime.convertDateTimeToStringTime(excTaskObj.startTime));
        setStartKm(UtilityKm.kmToString(excTaskObj.startKilometers));  
        setEndTime(UtilityDateAndTime.convertDateTimeToStringTime(excTaskObj.endTime));
        setEndKm(UtilityKm.kmToString(excTaskObj.endKilometers));
        setRemark(excTaskObj.name ?? "");
        task.bsonId = excTaskObj.bsonId;


        console.log("task object loaded..")
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

            <Stack className='buttons-wrapper' spacing={2} direction="row" marginBottom={"50px"}>
                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}
                        // changing view to '/history'
                        onClick={handleAnnullerClick}>
                            Annuller
                </Button>

                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}
                        onClick={handleSaveClick}>
                            Gem som kladde
                </Button>

                <Button variant="contained"
                        size="small"
                        sx={{ color: 'black', backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'darkgrey' } }}
                        onClick={handleSendClick}>
                            Send
                </Button>

                <Link to="/history" ref={linkRefHistory} style={{display: 'none'}}/> 
            </Stack>
        </div>
    );
}

export default MainRegComp;
