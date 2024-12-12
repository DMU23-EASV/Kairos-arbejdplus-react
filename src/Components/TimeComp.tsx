import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import {UtilityDateAndTime} from "../Services/UtilityDateAndTime";

interface TimeCompProps {
    title: string;
    value: string;
    errorMessage?: string;
    onTimeChange: (timeValue: string) => void;
    onTimeChangeError?: (errorMessage: string) => void;
}


// TimeComp is a functional component that uses the TimeCompProps interface to define the props: title, value, errorMessage, onTimeChange 
const TimeComp: React.FC<TimeCompProps> = ({ title, value, errorMessage, onTimeChange }) => {
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = event.target.value;
        onTimeChange(newTime);
    };

    const setCurrentTime = () => {
        const time = new Date();
        const formattedTime = UtilityDateAndTime.convertDateTimeToStringTime(time);
        onTimeChange(formattedTime);
    };
    
    

    return (
        <div className='regComponent-container'>
            <TextField
                className={'labels-taskRegistration'}
                label={title}
                size="small"
                id="outlined-start-adornment"
                sx={{ m: 2, width: '30ch' }}
                value={value}
                onChange={handleChange}
                error={!!errorMessage}
                helperText={errorMessage || ''}
                InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={setCurrentTime} className='timeIcon-button'>
                                <AccessTimeSharpIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default TimeComp;
