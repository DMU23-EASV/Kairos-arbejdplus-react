import StartRegComp from './StartRegComp';
import * as Yup from 'yup';
import {useEffect, useRef, useState} from "react";
import RegTaskHeadlineComp from "./RegTaskHeadlineComp.tsx";
import EndRegComp from "./EndRegComp.tsx";
import Button from "@mui/material/Button";
import {NEW_TASK_PAGE_TITLE} from "../Constants.ts";
import {Link} from "react-router-dom";
import { Stack } from '@mui/material';
import {TimeRules} from "../Services/ValidationRules/TimeRules.ts";
import {KmRules} from "../Services/ValidationRules/KmRules.ts";
import {TimePeriodRules} from "../Services/ValidationRules/TimePeriodRules.ts";
import {DistanceRules} from "../Services/ValidationRules/DistanceRules.ts";


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

function MainRegComp() {

    // Reference to a hidden Link element for program navigation to "/history"
    const linkRefHistory = useRef<HTMLAnchorElement>(null);

    function changeViewToHistory(): void {
        // Navigates user to "/history" if linkRefHistory isn't null
        if (linkRefHistory.current) {
            linkRefHistory.current.click();
        }
    }
    

    // Object state for task details: start time, start km, end time, end km and remarks.
    const [taskData, setTaskData] = useState<TaskData>({
        startTime: "",
        startKm: "",
        endTime: "",
        endKm: "",
        remark: "",
    });

    // State to manage an array of error objects.
    const [errors, setErrors] = useState<TaskErrors>({});


    const validationSchemaSave = Yup.object({
        startTime: Yup.string().matches(TimeRules.timeRegex, "Start time must be in HH:mm format")
            .nullable()
            .transform((curr, orig) => orig === "" ? null : curr)  
            .notRequired(),
        startKm: Yup.string().matches(KmRules.kmRegex, "Invalid km format")
            .nullable()
            .transform((curr, orig) => orig === "" ? null : curr)  
            .notRequired(),
        endTime: Yup.string().matches(TimeRules.timeRegex, "End time must be in HH:mm format")
            .nullable()
            .transform((curr, orig) => orig === "" ? null : curr)  
            .notRequired(),
        endKm: Yup.string().matches(KmRules.kmRegex, "Invalid km format")
            .nullable()
            .transform((curr, orig) => orig === "" ? null : curr)  
            .notRequired(),
        remark: Yup.string().nullable()
            .transform((curr, orig) => orig === "" ? null : curr)  
            .notRequired(),
        
        timePeriodValid: Yup.mixed().test(
            "timePeriod", "Start tid skal være før sluttid",
            function (value) {
                const { startTime, endTime } = this.parent;
                
                if (startTime && endTime) {
                    const isValid = TimePeriodRules.validateTimePeriod(startTime, endTime);
                    if (startTime && endTime && !isValid) {
                        return this.createError({message: "Starttid skal være før sluttid"});
                    }
                }
                return true;
            }
        ),
        kmDistanceValid: Yup.mixed().test(
            "distance", "Start km skal være mindre end slut km",
            function () {
                const { startKm, endKm } = this.parent;
                
                if (startKm && endKm) {
                    const isValid = DistanceRules.validateDistance(startKm, endKm);
                    if (startKm && endKm && !isValid) {
                        return this.createError({message: "Start km skal være mindre end slut km"});
                    }
                }
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
        timePeriodValid: Yup.mixed().test(
            "timePeriod", "Start tid skal være før sluttid",
            function (value) {
                const { startTime, endTime } = this.parent;
                const isValid = TimePeriodRules.validateTimePeriod(startTime, endTime);
                if (startTime && endTime && !isValid) {
                    return this.createError({ message: "Starttid skal være før sluttid" });
                }
                return true;
            }
        ),
        kmDistanceValid: Yup.mixed().test(
            "distance", "Start km skal være mindre end slut km",
            function (value) {
                const { startKm, endKm } = this.parent;
                const isValid = DistanceRules.validateDistance(startKm, endKm);
                if (startKm && endKm && !isValid) {
                    return this.createError({ message: "Start km skal være mindre end slut km" });
                }
                return true;
            }
        ),
    });



    const validateTaskData = async (isSend: boolean) => {
        const schema = isSend ? validationSchemaSend : validationSchemaSave;

        try {
            await schema.validate(taskData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationError: TaskErrors = {};
                error.inner.forEach((err) => {
                    validationError[err.path as string] = err.message;
                });
                setErrors(validationError);
            }
            return false;
        }
    };


    const handleFieldChange = (field: keyof TaskData, value: string) => {
        const trimmedValue = value.trim() || "";

        // Update the task data state with the new value for the field
        setTaskData((prevData) => ({ ...prevData, [field]: trimmedValue }));

        if (trimmedValue === ""){
            setErrors((prevErrors) => {
                const {[field]: _, ...restErrors } = prevErrors;
                return restErrors;
            });
            return;
        }
        
        // Validate startKm and endKm for numeric format
        if (field === "startKm" || field === "endKm") {
            const isValid = KmRules.kmRegex.test(trimmedValue);
            if (!isValid) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "Ugyldigt km format",
                }));
            } else {
                setErrors((prevErrors) => {
                    const { [field]: _, ...restErrors } = prevErrors;
                    return restErrors;
                });
            }
        }

        // Validate startTime and endTime for correct time format
        if (field === "startTime" || field === "endTime") {
            
            const isValidTime = TimeRules.timeRegex.test(trimmedValue);
            
            if (!isValidTime) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "Ugyldigt tidsformat (hh:mm)",
                }));
            } else {
                setErrors((prevErrors) => {
                    const { [field]: _, ...restErrors } = prevErrors;
                    return restErrors;
                });
            }
            
            
        }
    };
    
    
    
    const handleAnnullerClick = () => {
    
        console.log("Annuller...")
        changeViewToHistory();
    }
    
    
    
    const handleSaveClick = async () => {
        const isValid = await validateTaskData(false);
        
        if (isValid) {
            console.log("Valid indtastning. Gemmer som kladde...")
            // TODO: save to db
            changeViewToHistory();
            
        } else {
            console.log("Fejl i indtastning. Kan ikke gemme...")
        }
    };

    const handleSendClick = async () => {
        const isValid = await validateTaskData(true); // For Send
        if (isValid) {
            console.log("Send indtastning...");
            // TODO: send data
        } else {
            console.log("Fejl i indtastning. Kan ikke sende...");
        }    };
           
    /*
            
    async function saveToDatabase() {
        console.log("Saving to database...")
        // simulation
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log("Data saved to database")
    }

    async function onSendClick(){
        
        
    }
    */
    
    
    
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
                timeStart={taskData.startTime}
                kmStart={taskData.startKm}
                errorTime={!!errors.startTime}
                errorKm={!!errors.startKm}
                onTimeChange={(value) => handleFieldChange('startTime', value)}
                onKmChange={(value) => handleFieldChange('startKm', value)}
                
            />
            
            <EndRegComp titleEndTime={"Slut tid"} 
                        titleEndKm={"Slut km"} 
                        titleRemark={"Bemærkning"} 
                        timeEnd={taskData.endTime} 
                        kmEnd={taskData.endKm} 
                        remarkVal={taskData.remark} 
                        errorTime={!!errors.endTime}
                        errorKm={!!errors.endKm}
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
