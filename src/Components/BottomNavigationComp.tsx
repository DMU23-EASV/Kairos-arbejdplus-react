import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link } from "react-router-dom"
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsIcon from '@mui/icons-material/Notifications';

const BottomNavigationComp: React.FC = () => {
    const [value, setValue] = React.useState(0);
    
    return (
        <div
            style={{
                display: "flex",
            }}
        >

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
                    color="primary"
                    style={{
                        backgroundColor: "black",
                        position: "fixed",
                        bottom: 0,
                        right: 0,
                        left: 0,
                    }}
                >
                    <BottomNavigationAction
                        label="History"
                        icon={<HistoryIcon style={{ color: "white" }} />}
                        component={Link}
                        to="/history"
                    />
                    <BottomNavigationAction
                        label="Task"
                        icon={<AssignmentIcon style={{ color: "white" }} />}
                        component={Link}
                        to="/tasks"
                    />
                    <BottomNavigationAction
                        label="Notification"
                        icon={<NotificationsIcon style={{ color: "white" }} />}
                        component={Link}
                        to="/notifications"
                    />
                </BottomNavigation>
            </Paper>
        </div>
    );
};

export default BottomNavigationComp;
