import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface LoginCompProps {
    onLogin: () => void; // Needs to be changed to some form of login validation call
}

let username: string = ""
let password: string = ""


export default function LoginComp({ onLogin }: LoginCompProps) {
    
    return (

        <Box
            component="form"
            sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
            noValidate
            autoComplete="off"
        >
            <div style={{ marginBottom: 50}}>
                <label style={{ 
                    fontFamily: 'Maven Pro', 
                    fontSize: 62,
                    color: 'black',
                    }}>
                    ArbejdPlus
                </label>

            </div>
            <div>
                <TextField
                    id="outlined-required"
                    label="Brugernavn"
                    defaultValue=""
                    color="primary"
                    value={username}
                />
                <TextField
                    id="outlined-password-input"
                    label="Kodeord"
                    type="password"
                    color="primary"
                    value={password}
                />
            </div>
            <div style={{ marginTop: 20 }}>
                <Button 
                    variant="contained"
                    onClick={onLogin}> 
                    Login
                </Button>
            </div>

        </Box>
    );
}