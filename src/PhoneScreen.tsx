import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface PhoneScreenProps {
    children?: React.ReactNode; // Explicitly define that children is optional
}
const PhoneScreen: React.FC<PhoneScreenProps> = ({ children }) => {
    const [value, setValue] = React.useState(0);
    

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            
            <div style={{ flex: 1 }}>{children}</div>
            
            <Paper
                elevation={3}
                style={{
                    position: "sticky",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    
                }}
            >
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                    showLabels
                    style={{
                        backgroundColor: "black",
                        position: "fixed",
                        bottom: 0,
                        right: 0,
                        left: 0,
                        color: "white",
                    }}
                >
                    <BottomNavigationAction
                        label="Task"
                        icon={<AssignmentIcon style={{ color: "white" }} />}
                    />
                    <BottomNavigationAction
                        label="History"
                        icon={<HistoryIcon style={{ color: "white" }} />}
                    />
                    <BottomNavigationAction
                        label="Notification"
                        icon={<NotificationsIcon style={{ color: "white" }} />}
                    />
                </BottomNavigation>
            </Paper>
        </div>
    );
};

export default PhoneScreen;
