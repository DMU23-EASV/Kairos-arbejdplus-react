import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';

function TimeComp({ title }: { title: string }) {
    
    // Get current time
    // note: .padStart(2, '0') adds a leading zero if needed
    const date = new Date();
    const timeNow = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    // State management for the input value and error status
    // inputValue stores the current text input, updated via setInputValue (like a "setter").
    // error tracks if the input is invalid, toggled via setError.
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

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
        // sets error = true if input value isn't valid 
        setError(value != '' && !isValidTime(value)); 
    };

    // Updates input with the current time (button click event)
    const setTimeNow = () => {
        setInputValue(timeNow);
        setError(false);
    };

    return (
        <div>
            <TextField
                label={title}
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                value={inputValue}
                onChange={handleInputChange}
                error={error}
                // text if error : text if no error
                helperText={error ? 'Indtast gyldigt tidspunkt (hh:mm)' : ''}
                InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={setTimeNow}>
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
