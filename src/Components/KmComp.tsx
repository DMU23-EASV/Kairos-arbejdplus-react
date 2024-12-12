import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";


interface KmCompProps {
    title: string;
    value: string;
    errorMessage?: string;
    onKmChange: (kmValue: string) => void;
}


// KmComp is a functional component that uses the KmCompProps interface to define the props: title, value, errorMessage, onKmChange 
const KmComp: React.FC<KmCompProps> = ({ title, value, errorMessage, onKmChange }) => {
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onKmChange(event.target.value);
    }

    
    return (
        <div className='regComponent-container'>
            <TextField
                label={title}
                size="small"
                id="outlined-start-adornment"
                sx={{ m: 2, width: '30ch' }}
                value={value}
                onChange={handleChange}
                error={!!errorMessage}
                // text if error : text if no error
                helperText={errorMessage || ''}
                InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                }}
            />
        </div>
    );
}

export default KmComp;
