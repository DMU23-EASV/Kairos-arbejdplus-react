import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {APP_NAME} from "../Constants.ts";
import {Link} from "react-router-dom";
import './LoginComp.css'
import {useState} from "react";

interface LoginCompProps {
    onLogin: (username: string, password: string) => void; 
}

export default function LoginComp({ onLogin }: LoginCompProps) {
    
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const handleLogin = () => {
        onLogin(username, password); // Needs to be changed to some form of login validation call
    }
    
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
                    defaultValue=""
                    color="primary"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    id="outlined-password-input"
                    label="Kodeord"
                    type="password"
                    color="primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='login-wrapper-buttons'>
                <Button
                    variant="contained"
                    onClick={handleLogin}
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