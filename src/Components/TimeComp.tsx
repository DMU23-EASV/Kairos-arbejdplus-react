import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import InputAdornment from "@mui/material/InputAdornment";
import {Icon, IconButton} from "@mui/material";
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';

function TimeComp({title} : {title: string}) {
    
    // Get current time
    // Note: .toString().padStart(2,'0') adds a leading zero if needed
    const date = new Date();
    const timeNow = `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;

    // Displays current time in textfield
    const btnTimeNow = () => {
        setInputValue(timeNow);
    };
    
    
    // Sets the input value when the user types or uses the time button
    const [inputValue, setInputValue ] = useState('');
    
    // Handles input changes
    const handleInputChange = (event:any) => {
        setInputValue(event.target.value);
        console.log(inputValue);
    };
    
    
    return (
        <div>
            <TextField
                label={title}
                id="outlined-start-adornment"
                sx={{m: 1, width: '25ch'}}
                value={inputValue}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={btnTimeNow}>
                              <Icon>  
                                  <AccessTimeSharpIcon/>
                              </Icon>
                              </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
        
    );
}
export default TimeComp;