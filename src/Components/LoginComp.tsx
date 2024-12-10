import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {APP_NAME, LOGIN_ENDPOINT} from "../Constants.ts";
import {useNavigate} from "react-router-dom";
import './LoginComp.css'
import {useState} from "react";
import { getTasks } from '../Services/TaskService.ts';
import TaskListContext from '../TaskListContext.tsx';

interface LoginCompProps {
    onLogin: (username: string, password: string) => void; 
}

export default function LoginComp({ onLogin }: LoginCompProps) {
    
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        try {
            const response = await fetch(LOGIN_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                        username: username,
                        password: password
            }),
            });
            
            if (response.status === 401) {
                alert('Unauthorized: Invalid username or password.');
                return;
            }
            
            if (!response.ok) {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage || 'Something went wrong'}`);
                return;
            }
            sessionStorage.setItem('username', username);

            console.log(`UserName??? ${username}`)
            
            onLogin(username, password);


            if (username) {
                try {

                    const response = await getTasks({username});

                    TaskListContext.Provider(response);
                } catch (error) {
                    console.error("UseEffect : GetTasks Context ", error);
                }
            } else {
                console.error("Username is not available in sessionStorage.");
            }

            
            navigate("/tasks");
            
        } catch (error) {
            console.error('Error during login:', error);
            alert('Unable to connect to the server. Please try again later.');
        }
        
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