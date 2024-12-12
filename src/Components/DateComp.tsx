import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DateCompProps{
    title: string;
    value?: Dayjs;
    errorMessage?: string;
    onDateChange: (value: Dayjs | null) => void;
}

// DateComp is a functional component that uses the DateCompProps interface to define the props: title, value, onDateChange 
const DateComp: React.FC<DateCompProps> = ({ title, value, errorMessage, onDateChange }) => {
    
    const handleDateChange = (newVal:Dayjs | null) => {
        if (newVal){
            onDateChange(newVal);
        }
    };
    

    return (
        <div className="regComponent-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    format={"DD-MM-YYYY"}
                    label={title}
                    sx={{ m: 2, width: '30ch' }}
                    slotProps={{ textField: {
                            size: 'small',
                            error: !!errorMessage,   
                            helperText: errorMessage || '', 
                        } 
                    }}
                    value={value ? dayjs(value) : null}
                    onChange={handleDateChange}
                />
            </LocalizationProvider>
        </div>
    )

}
export default DateComp;