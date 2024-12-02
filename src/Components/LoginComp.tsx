import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {APP_NAME} from "../Constants.ts";
import {Link} from "react-router-dom";
import './LoginComp.css'

interface LoginCompProps {
    onLogin: () => void; // Needs to be changed to some form of login validation call
}

let username: string = ""
let password: string = ""


export default function LoginComp({ onLogin }: LoginCompProps) {
    
    return (
        
        <div className='Login-wrapper'>
            <div style={{ marginBottom: 50}}>
                <label style={{ 
                    fontFamily: 'Maven Pro', 
                    fontSize: 62,
                    color: 'black',
                    }}>
                    {APP_NAME}
                </label>

            </div>
            <div>
                <TextField
                    style={{marginBottom: 10}}
                    id="outlined-required"
                    label="Brugernavn"
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
            <div className='login-wrapper-buttons'>
                <Button
                    variant="contained"
                    onClick={onLogin}
                    component={Link}
                    to="/tasks"
                >
                    Login
                </Button>
                
                <Button variant="contained"> 
                    Forgot Password
                </Button>
                
            </div>
        </div>
    );
}