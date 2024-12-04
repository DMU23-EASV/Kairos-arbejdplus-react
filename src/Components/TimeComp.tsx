import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from 'react';
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';


interface TimeCompProps {
    title: string;
    value: string;
    errorMessage?: string;
    onTimeChange: (value: string) => void;
}


// TimeComp is a functional component that uses the TimeCompProps interface to define the props ({ title, value, onChange }).
const TimeComp: React.FC<TimeCompProps> = ({ title, value, errorMessage, onTimeChange }) => {
    const [inputValue, setInputValue] = useState<string>(value);
    
    // Get current time
    // note: .padStart(2, '0') adds a leading zero if needed
    const date:Date = new Date();
    const timeNow:string = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    
    const setCurrentTime = () => {
        setInputValue(timeNow);
        onTimeChange(timeNow);
    }
    
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const newValue = event.target.value;
        
        setInputValue(newValue);
        onTimeChange(newValue);
    };

    useEffect(() => {
        setInputValue(value);
    }, [value]);
   
    
    return (
        <div className='regComponent-container'>
            <TextField className={'labels-taskRegistration'}
                       label={title}
                       size="small"
                       id="outlined-start-adornment"
                       sx={{ m: 2, width: '30ch' }}
                       value={inputValue}
                       onChange={handleChange}
                       error={!!errorMessage}
                        // text if error : text if no error
                       helperText={errorMessage || ''}
                       InputProps={{
                           startAdornment: <InputAdornment position="start" />,
                           endAdornment: (
                               <InputAdornment position="end">
                                   <IconButton onClick={setCurrentTime}
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









    
    
   
    
    

 

    

    

    