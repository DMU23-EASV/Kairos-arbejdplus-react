import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import React, {useEffect, useState} from "react";

interface KmCompProps {
    title: string;
    value: string;
    error?: boolean;
    onKmChange: (value: string) => void;
}


// KmComp is a functional component that uses the KmCompProps interface to define the props ({ title, value, onChange }).
const KmComp: React.FC<KmCompProps> = ({ title, value, error, onKmChange }) => {
    const [inputValue, setInputValue] = useState<string>(value);
    
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        
        setInputValue(newValue);
        onKmChange(newValue);
    }

    useEffect(() => {
        setInputValue(value)
    }, [value]);
    
    
    return (
        <div className='regComponent-container'>
            <TextField
                label={title}
                size="small"
                id="outlined-start-adornment"
                sx={{ m: 2, width: '30ch' }}
                value={inputValue}
                onChange={handleChange}
                error={!! error}
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
