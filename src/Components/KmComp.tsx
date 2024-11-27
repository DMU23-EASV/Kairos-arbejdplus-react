import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import React, {useState} from "react";

interface KmCompProps {
    title: string;
    value: string;
    onChange: (value: string) => void;
}

// KmComp is a functional component that uses the KmCompProps interface to define the props ({ title, value, onChange }).
const KmComp: React.FC<KmCompProps> = ({ title, value, onChange }) => {
    
    // State management for the km input value and error status
    // inputValue stores the current string input, updated via setInputValue (like a "setter").
    // error tracks if the input is invalid, toggled via setError.
    const [inputValue, setInputValue] = useState<string>(value);
    const [error, setError] = useState<boolean>(false);

    
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
        // sets error = true if input value isn't valid 
        setError(value != '' && !isValidKm(value));

        // updates parent component
        onChange(value);
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
