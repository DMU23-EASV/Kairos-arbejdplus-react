import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from 'react';
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';

interface TimeCompProps {
    title: string;       
    value: string;       
    errorTime: boolean;
    onTimeChange: (value: string) => void; 
    onErrorChange: (error: boolean) => void;
}

// TimeComp is a functional component that uses the TimeCompProps interface to define the props ({ title, value, onChange }).
const TimeComp: React.FC<TimeCompProps> = ({ title, value, errorTime, onTimeChange, onErrorChange }) => {
    
    // Get current time
    // note: .padStart(2, '0') adds a leading zero if needed
    const date:Date = new Date();
    const timeNow:string = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    // State management for the time input value and error status
    // inputValue stores the current text input, updated via setInputValue (like a "setter").
    // error tracks if the input is invalid, toggled via setError.
    const [inputValue, setInputValue] = useState<string>(value);
    const [error, setError] = useState<boolean>(errorTime);

    // Updates the error state when the errorTime prop changes in MainRegComp
    useEffect(() => {
        setError(errorTime); // Update local error state for time
    }, [errorTime]);

    
    // Validates time input from user using regex (hh:mm format)
    const isValidTime = (value: string): boolean => {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(value);
    };

    // Handles input changes and validates dynamically
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // updates input value
        setInputValue(value);

        // isError = false if valid input and input != '' 
        // and true if:
        const isError = value == '' || !isValidTime(value);
        setError(isError); 
        
        // updates parent component
        onTimeChange(value);
        onErrorChange(isError);
    };

    // Updates input with the current time (button click event)
    const setTimeNow = () => {
        setInputValue(timeNow);
        setError(false);
        
        // updates parent component
        onTimeChange(timeNow);
        onErrorChange(error);
    };

    return (
        <div className='regComponent-container'>
            <TextField className={'labels-taskRegistration'}
                label={title}
                size="small"
                id="outlined-start-adornment"
                sx={{ m: 2, width: '30ch' }}
                value={inputValue}
                onChange={handleInputChange}
                error={error}
                // text if error : text if no error
                helperText={error ? 'Indtast gyldigt tidspunkt (hh:mm)' : ''}
                InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={setTimeNow}
                                        className='timeIcon-button'>
                                <AccessTimeSharpIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

export default TimeComp;
