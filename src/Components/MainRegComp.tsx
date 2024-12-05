import StartRegComp from './StartRegComp';
import * as Yup from 'yup';
import {useEffect, useRef, useState} from "react";
import RegTaskHeadlineComp from "./RegTaskHeadlineComp.tsx";
import EndRegComp from "./EndRegComp.tsx";
import Button from "@mui/material/Button";
import {NEW_TASK_PAGE_TITLE, SEND_TASK_ENDPOINT} from "../Constants.ts";
import {Link} from "react-router-dom";
import { Stack } from '@mui/material';
import {TimeRules} from "../Services/ValidationRules/TimeRules.ts";
import {KmRules} from "../Services/ValidationRules/KmRules.ts";
import {TimePeriodRules} from "../Services/ValidationRules/TimePeriodRules.ts";
import {DistanceRules} from "../Services/ValidationRules/DistanceRules.ts";
import {ETaskStatus} from "../Enum/ETaskStatus.ts";
import {NotificationUser} from "../Services/NotificationUser.ts";


interface TaskData {
    startTime: string;
    startKm: string;
    endTime: string;
    endKm: string;
    remark: string;
}

interface TaskErrors{
    [key:string]: string | undefined;
}

interface TaskToSendDTO{
    name: string;
    owner: string
    startTime: string;
    startKm: string;
    endTime: string;
    endKm: string;
    comment: string;
    taskStatus: number;
}


function MainRegComp() {

    // Reference to a hidden Link element for program navigation to "/history"
    const linkRefHistory = useRef<HTMLAnchorElement>(null);
    
    function changeViewToHistory(): void {
        // Navigates user to "/history" if linkRefHistory isn't null
        if (linkRefHistory.current) {
            linkRefHistory.current.click();
        }
    }
    

    // State holding an object with task details: start time, start km, end time, end km, and remark
    const [taskData, setTaskData] = useState<TaskData>({
        startTime: "",
        startKm: "",
        endTime: "",
        endKm: "",
        remark: "",
    });


    // State for validation errors with field names as keys and messages as values
    const [errors, setErrors] = useState<TaskErrors>({});


    const validationSchemaSave = Yup.object({
        startTime: Yup.string().matches(TimeRules.timeRegex, "Starttid skal være hh:mm format").nullable()
            .transform(function (current, orig) {
                if (orig === "") {
                    return null;
                } else {
                    return current;
                }
            }).notRequired(),
        
        startKm: Yup.string().matches(KmRules.kmRegex, "Ikke korrekt km format").nullable()
            .transform(function (current, orig) {
                if (orig === "") {
                    return null;
                } else {
                    return current;
                }
            }).notRequired(),
        
        endTime: Yup.string().matches(TimeRules.timeRegex, "Sluttid skal være hh:mm format").nullable()
            .transform(function (current, orig) {
                if (orig === "") {
                    return null;
                } else {
                    return current;
                }
            }).notRequired(),
        
        endKm: Yup.string().matches(KmRules.kmRegex, "Ikke korrekt km format").nullable()
            .transform(function (current, orig) {
                if (orig === "") {
                    return null;
                } else {
                    return current;
                }
            }).notRequired(),
        
        remark: Yup.string().nullable()
            .transform(function (current, orig) {
                if (orig === "") {
                    return null;
                } else {
                    return current;
                }
            }).notRequired(),
        // TODO: timeperiod and distance do not throw an error message to user - it's only catches the error
        timePeriodValid: Yup.mixed().test(
            "timePeriod", 
            "Starttid skal være før sluttid",
            function () {
                const { startTime, endTime } = this.parent;
                
                // Checks if both start time and end time are defined and if time period is valid.
                // if invalid time period (end time before start time) return an error
                if (startTime && endTime && !TimePeriodRules.validateTimePeriod(startTime, endTime)) {
                    this.createError({
                        path: `${this.path}.startTime`,
                        message: "Starttid skal være før sluttid",
                    });

                    this.createError({
                        path: `${this.path}.endTime`,
                        message: "Starttid skal være før sluttid",
                    });

                    return false;
                }

                // if no validation error, return true to indicate passed validation 
                return true;
            }
        ),
        kmDistanceValid: Yup.mixed().test(
            "distance", "Start km skal være mindre end slut km",
            function () {
                const { startKm, endKm } = this.parent;

                // Checks if both start km and end km are defined and if km distance is valid.
                // if invalid distance (end km before start km) return an error
                if (startKm && endKm && !DistanceRules.validateDistance(startKm, endKm)) {
                    return this.createError({message: "Start km skal være mindre end slut km"});
                }
                
                // if no validation error, return true to indicate passed validation
                return true;
            }
        ),
    });

    const validationSchemaSend = Yup.object({
        startTime: Yup.string().matches(TimeRules.timeRegex).required("Start tid er påkrævet"),
        startKm: Yup.string().matches(KmRules.kmRegex).required("Start km er påkrævet"),
        endTime: Yup.string().matches(TimeRules.timeRegex).required("Slut tid er påkrævet"),
        endKm: Yup.string().matches(KmRules.kmRegex).required("Slut km er påkrævet"),
        remark: Yup.string().nullable().notRequired(),
        
        // TODO: timeperiod and distance do not throw an error message to user - it's only catches the error
        timePeriodValid: Yup.mixed().test(
            "timePeriod",
            "Starttid skal være før sluttid",
            function () {
                const { startTime, endTime } = this.parent;

                // Checks if both start time and end time are defined and if time period is valid.
                // if invalid time period (end time before start time) return an error
                if (startTime && endTime && !TimePeriodRules.validateTimePeriod(startTime, endTime)) {
                    return this.createError({ message: "Starttid skal være før sluttid" });
                }

                // if no validation error, return true to indicate passed validation 
                return true;
            }
        ),
        kmDistanceValid: Yup.mixed().test(
            "distance", "Start km skal være mindre end slut km",
            function () {
                const { startKm, endKm } = this.parent;

                // Checks if both start km and end km are defined and if km distance is valid.
                // if invalid distance (end km before start km) return an error
                if (startKm && endKm && !DistanceRules.validateDistance(startKm, endKm)) {
                    return this.createError({message: "Start km skal være mindre end slut km"});
                }

                // if no validation error, return true to indicate passed validation
                return true;
            }
        ),
    });



    const validateTaskData = async (isSend: boolean) => {
        const schema = isSend ? validationSchemaSend : validationSchemaSave;

        try {
            await schema.validate(taskData, { abortEarly: false });
            setErrors({});
            
            // if no validation error, return true to indicate passed validation
            return true;
            
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationError: TaskErrors = {};
                
                // Iterates through all errors and adds them to the validationError object
                error.inner.forEach((validationErrorDetails) => {
                    // Assigns the error message to the corresponding field path in the validation error object
                    validationError[validationErrorDetails.path as string] = validationErrorDetails.message;
                });
                setErrors(validationError);
            }
            return false;
        }
    };


    const handleFieldChange = (field: keyof TaskData, value: string) => {
        // Trim the value and set it to an empty string if it is empty
        const trimmedValue = value.trim();
        const finalValue = trimmedValue === "" ? "" : trimmedValue;

        // Update the task data state with the new value for the field
        setTaskData((prevData) => {
            const updatedData = { ...prevData };
            updatedData[field] = finalValue;
            return updatedData;
        });

        // Updates errors state if the field is empty, removing any error associated with it
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };

            // If the value is empty, remove the error for this field
            if (finalValue === "") {
                delete updatedErrors[field];
            }

            // Validate startTime and endTime for correct time format if the field isn't empty
            if ((field === "startTime" || field === "endTime") && finalValue !== "") {
                const isValidTime = TimeRules.timeRegex.test(finalValue);
                if (!isValidTime) {
                    // Sets an error message if the time format is not correct
                    updatedErrors[field] = field === "startTime"
                        ? "Starttid skal være hh:mm format"
                        : "Sluttid skal være hh:mm format";
                } else {
                    // Remove error if the time is valid
                    delete updatedErrors[field];
                }
            }

            // Validate startKm and endKm for correct km format if the field isn't empty
            if ((field === "startKm" || field === "endKm") && finalValue !== "") {
                const isValidKm = KmRules.kmRegex.test(finalValue);
                if (!isValidKm) {
                    // Sets an error message if km format is not correct
                    updatedErrors[field] = "Ikke korrekt km format";
                } else {
                    // Remove error if km format is valid
                    delete updatedErrors[field];
                }
            }

            return updatedErrors;
        });
    
        
        // Validate time period (startTime should be before endTime)
        if (field === "startTime" || field === "endTime") {
            const isTimeValid = TimePeriodRules.validateTimePeriod(taskData.startTime, taskData.endTime);
            if (!isTimeValid) {
                // sets error message if startTime is after endTime
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    timePeriodValid: "Starttid skal være før sluttid",
                }));
            } else {
                // removes time period error if valid
                setErrors((prevErrors) => {
                    const { timePeriodValid, ...restErrors } = prevErrors;
                    return restErrors;
                });
            }
        }

        // Validate distance (startKm should be less than endKm)
        if (field === "startKm" || field === "endKm") {
            const isKmValid = DistanceRules.validateDistance(taskData.startKm, taskData.endKm);
            if (!isKmValid) {
                // sets error message if endKm is less or equal to startKm
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    kmDistanceValid: "Start km skal være mindre end slut km",
                }));
            } else {
                // removes distance error if valid
                setErrors((prevErrors) => {
                    const { kmDistanceValid, ...restErrors } = prevErrors;
                    return restErrors;
                });
            }
        }
    };   
    
    
    // This function switches the view to history without performing any database save operation
    function handleAnnullerClick(): void {
        console.log("Annuller...")
        changeViewToHistory();
    }


    

    
    // TODO: HERFRA MAAAAAAANGLER FÆRDIGGØRELSE + KOMMENTARER
    
    
    
    

    const handleSaveClick = async () => {
        // Checks if all fields in taskData are empty
        const areAllFieldsEmpty = Object.values(taskData).every((value) => value.trim() === "");

        // Changes view to '/history' if all fields are empty
        if (areAllFieldsEmpty) {
            console.log("Alle felter er tomme... Skifter view");
            changeViewToHistory(); 
            return; 
        }

        // Validates data if all fields isn't empty
        const isValid = await validateTaskData(false);
        if (isValid) {
            console.log("Valid indtastning. Gemmer som kladde...")
            // TODO: save to db
            //saveToDatabase();
            changeViewToHistory();
            
        } else {
            console.log("Fejl i indtastning. Kan ikke gemme...")
            NotificationUser.notifyUser("Fejl i indtastning...")
        }
    };

    const handleSendClick = async () => {
        const isValid = await validateTaskData(true); 
        if (isValid) {
            console.log("Send indtastning...");
            // TODO: send data
            //await sendToDatabase();
            changeViewToHistory();
        } else {
            console.log("Fejl i indtastning. Kan ikke sende...");
        }    
    };

    
    

    function saveToDatabase() {

    }
    
    
    
    const sendToDatabase = async () => {
        try {
            
            //  
            const taskToSend: TaskToSendDTO = {
                startTime: taskData.startTime,
                startKm: taskData.startKm,
                endTime: taskData.endTime,
                endKm: taskData.endKm,
                comment: taskData.remark,
                taskStatus: ETaskStatus.AwaitingApproval
            };

            
            const response = await fetch(SEND_TASK_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskToSend), 
            });

            console.log("After fetch");
            
            if (!response.ok) {
                const errorMessage = await response.text();
                NotificationUser.notifyUser(errorMessage);
                return;
            }

            console.log("Data sendt til serveren");
            NotificationUser.notifyUser("Task sent successfully!")

        } catch (error) {
            console.error(error);
            NotificationUser.notifyUser("Kan ikke sende data, prøv igen");
        }
    };

    
    
    
    return (
        <div className='regMainComponent-container mainComponent-wrapper'>
            <RegTaskHeadlineComp
                title={NEW_TASK_PAGE_TITLE} 
            />
            
            <StartRegComp
                titleStartTime={"Start tid"}
                titleStartKm={"Start km"}
                timeStart={taskData.startTime}
                kmStart={taskData.startKm}
                errorTimeMessage={errors.startTime}
                errorKmMessage={errors.startKm}
                onTimeChange={(value) => handleFieldChange('startTime', value)}
                onKmChange={(value) => handleFieldChange('startKm', value)}
                
            />
            
            <EndRegComp titleEndTime={"Slut tid"} 
                        titleEndKm={"Slut km"} 
                        titleRemark={"Bemærkning"} 
                        timeEnd={taskData.endTime} 
                        kmEnd={taskData.endKm} 
                        remarkVal={taskData.remark} 
                        errorTimeMessage={errors.endTime}
                        errorKmMessage={errors.endKm}
                        onTimeChange={(value) => handleFieldChange('endTime', value)} 
                        onKmChange={(value) => handleFieldChange('endKm', value)} 
                        onRemarkChange={(value) => handleFieldChange('remark', value)}
                       
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
