import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { User } from '../Models/User';
import { useState } from 'react';

interface props {
    user: User;
}

function Usersettings( {user}:props){

    const [email, setEmail] = useState<string>(user.Email?? "");
    const [username, setUsername] = useState<string>(user.Username ?? "");
    const [firstname, setFirstname] = useState<string>(user.FirstName ?? "");
    const [lastname, setLastname] = useState<string>(user.LastName ?? "");
    const [Phonenumber, setPhoneNumber] = useState<number | undefined>(user.PhoneNumber ?? undefined);
    const [changePassword, setChangePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    function UpdatePassword(): void {
        console.log("Update password pressed")
        console.log(ValidatePasword(password, confirmPassword))
    }

    function ValidatePasword(password?: string, confirmePassword?: string): boolean {
        if (password === null || password === undefined) return false;
        if (confirmePassword === null || confirmePassword === undefined) return false;
        return password === confirmePassword;
    }

    return (
        <>
            <div className='usersettings-wrapper'>
                <TextField
                    className='Login-textfield'
                    id="outlined-uncontrolled"
                    label="Fornavn"
                    value={firstname}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}/>

                <TextField
                    className='Login-textfield'
                    id="outlined-uncontrolled"
                    label="Efternavn"
                    value={lastname}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}/>

                <TextField
                    className='Login-textfield'
                    id="outlined-uncontrolled"
                    label="Brugernavn"
                    value={username}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}/>

                <TextField
                    className='Login-textfield'
                    id="outlined-uncontrolled"
                    label="Email"
                    value={email}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}/>

                <TextField
                    className='Login-textfield'
                    id="outlined-uncontrolled"
                    label="Telefon nr."
                    value={Phonenumber}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}/>

                {changePassword && (
                    <>
                        <TextField id="outlined-uncontrolled"
                                   label='Password'
                                   onChange={password => setConfirmPassword(password.target.value)}/>

                        <TextField id="outlined-uncontrolled"
                                   label='Gentag password'
                                   onChange={password => setPassword(password.target.value)}/>

                        <Button variant="outlined"
                        onClick={() => {UpdatePassword()}}>
                            Gem
                        </Button>

                    </>
                )}

                <Button
                    variant="outlined"
                    onClick={() => {setChangePassword(!changePassword)}}>
                    Updater kodeord
                </Button>




                <div className='usersettings-button-wrapper'>
                    <Button variant="outlined">Tilbage</Button>
                    <Button variant="outlined">Gem</Button>
                </div>
            </div>
        </>
    )

}

export default Usersettings