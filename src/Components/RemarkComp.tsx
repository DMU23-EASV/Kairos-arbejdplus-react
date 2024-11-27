import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import React, {useState} from "react";

interface RemarkCompProps {
    title: string;
    value: string;
    onChange: (value: string) => void;
}

// RemarkComp is a functional component that uses the RemarkCompProps interface to define the props ({ title, remark, onChange }).
const RemarkComp: React.FC<RemarkCompProps> = ({ title, value, onChange }) => {

    // State management for the remark input value
    const [inputValue, setInputValue] = useState<string>(value);
    

    // Handles input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // updates input value
        setInputValue(value);

        // updates parent component
        onChange(value);
    };


    return (
        <div className='regComponent-container padTop'>
            
            <TextField
                id="outlined-multiline-static"
                label={title}
                sx={{ m: 1, width: '30ch' }}
                multiline
                rows={3}
                value={inputValue}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                }}
            />
        </div>
    );
}

export default RemarkComp;
