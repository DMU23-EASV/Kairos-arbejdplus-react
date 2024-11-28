import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import React, {useEffect, useState} from "react";

interface KmCompProps {
    title: string;
    value: string;
    errorKm: boolean;
    onKmChange: (value: string) => void;
    onErrorChange: (error: boolean) => void;
}

// KmComp is a functional component that uses the KmCompProps interface to define the props ({ title, value, onChange }).
const KmComp: React.FC<KmCompProps> = ({ title, value, errorKm, onKmChange, onErrorChange }) => {
    
    // State management for the km input value and error status
    // inputValue stores the current string input, updated via setInputValue (like a "setter").
    // error tracks if the input is invalid, toggled via setError.
    const [inputValue, setInputValue] = useState<string>(value);
    const [error, setError] = useState<boolean>(errorKm);

    // Updates the error state when the errorKm prop changes in MainRegComp
    useEffect(() => {
        setError(errorKm); // Update local error state for time
    }, [errorKm]);
    
    
    // Validates km input from user using regex (only numbers)
    const isValidKm = (value: string): boolean => {
        const timeRegex = /^(?:[1-9][0-9]{0,5}|0|1000000)$/;
        return timeRegex.test(value);
    };

    // Handles input changes and validates dynamically
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // updates input value
        setInputValue(value);

        // isError = false if valid input and input != '' 
        // and true if:
        const isError = value == '' || !isValidKm(value);
        setError(isError);

        // updates parent component
        onKmChange(value);
        onErrorChange(isError);
    };
    

    return (
        <div className='regComponent-container'>
            <TextField
                label={title}
                size="small"
                id="outlined-start-adornment"
                sx={{ m: 2, width: '30ch' }}
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
