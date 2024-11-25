import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';


interface LoginCompProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

export default function ButtonAppBar({ isLoggedIn, onLogout }: LoginCompProps) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed"
                sx={{ zIndex: 1, 
                    position: 'absolute', 
                    top: 0, 
                    left: 0,
                    backgroundColor: 'AppWorkspace', 
                    }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        component={Link}
                        to="/tasks"
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Maven Pro"}}>
                        ArbejdPlus
                    </Typography>
                    {isLoggedIn ? (
                        <Button 
                            color="inherit" 
                            variant="outlined"
                            onClick={onLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button 
                            color="inherit"
                            variant="outlined">
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}