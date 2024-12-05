import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import React, {useState} from "react";

interface RemarkCompProps {
    title: string;
    value: string;
    onChange: (remarkValue: string) => void;
}

// RemarkComp is a functional component that uses the RemarkCompProps interface to define the props ({ title, remark, onChange }).
const RemarkComp: React.FC<RemarkCompProps> = ({ title, value, onChange }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };


    return (
        <div className='regComponent-container padTop'>
            
            <TextField
                id="outlined-multiline-static"
                label={title}
                sx={{ m: 1, width: '30ch' }}
                multiline
                rows={3}
                value={value}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                }}
            />
        </div>
    );
}

export default RemarkComp;
