import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import React, {useEffect, useState} from "react";
import {KmRules} from "../Services/ValidationRules/KmRules.ts";

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
    
    

    // Handles input changes and validates dynamically
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (value == ''){
            // updates parent component - with no error
            onKmChange(value);
            onErrorChange(false);
            
        } else {

            // validates user input
            let isValid: boolean = KmRules.validateKm(value); 
               

            if (isValid) {
                // updates parent component - with no error
                onKmChange(value);
                onErrorChange(false);
                
            } else {
                // updates parent component - with error
                onKmChange(value);
                onErrorChange(true);
            }
        }
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
