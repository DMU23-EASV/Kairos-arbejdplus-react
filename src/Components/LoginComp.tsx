import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {APP_NAME, LOGIN_ENDPOINT} from "../Constants.ts";
import {useNavigate} from "react-router-dom";
import './LoginComp.css'
import {useState} from "react";

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
                body: JSON.stringify({ username, password }),
                credentials: 'include', // Ensures HttpOnly cookies are included
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

            // Session storage for non-sensitive user data
            sessionStorage.setItem('username', username);

            // Notify parent component of login
            onLogin(username, password);

            console.log("Login successful. HttpOnly cookie set by server.");

            // Navigate to another page after successful login
            navigate("/history");
        } catch (error) {
            console.error('Error during login:', error);
            alert('Unable to connect to the server. Please try again later.');
        }
    };



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
