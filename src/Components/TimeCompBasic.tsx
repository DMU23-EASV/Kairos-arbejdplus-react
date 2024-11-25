import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function TimeCompBasic() {

    return (

        <div>
            <TextField
                label="Start tid"
                id="outlined-start-adornment"
                sx={{m: 1, width: '25ch'}}
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                    },
                }}
            />
        </div>
    );
}
export default TimeCompBasic;