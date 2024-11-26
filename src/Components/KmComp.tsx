import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import InputAdornment from "@mui/material/InputAdornment";


function KmComp({ title }: { title: string }) {
    
    // State management for the input value and error status
    // inputValue stores the current number input, updated via setInputValue (like a "setter").
    // error tracks if the input is invalid, toggled via setError.
    const [inputValue, setInputValue] = useState<string>();
    const [error, setError] = useState<boolean>(false);

    
    // Validates km input from user using regex (only numbers)
    const isValidKm = (value: string): boolean => {
        const timeRegex = /^(?:[0-9]{1,6}|1000000)$/;
        return timeRegex.test(value);
    };

    // Handles input changes and validates dynamically
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // updates input value
        setInputValue(value);
        // sets error = true if input value isn't valid 
        setError(value != '' && !isValidKm(value));
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
                helperText={error ? 'Indtast gyldige antal km' : ''}
                InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                }}
            />
        </div>
    );
}

export default KmComp;
