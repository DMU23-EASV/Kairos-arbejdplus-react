import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./Services/AuthProvider";
import BottomNavigationComp from "./Components/BottomNavigationComp.tsx";
import TopNavigationComp from "./Components/TopNavigationComp.tsx";
import LoginComp from "./Components/LoginComp.tsx";
import TimeComp from "./Components/TimeComp.tsx";
import React, { useContext, useEffect, useState } from "react";
import HistoryComp from "./Components/History.tsx";
import { TaskProvider } from './TaskContext.tsx';
import { TaskModel } from './Models/TaskModel.ts';

function App() {
    return (
        <AuthProvider>
                <Router>
                    <Main />
                </Router>
        </AuthProvider>
    );
}

const Main: React.FC = () => {
    const { isLoggedIn, login, logout } = useAuth();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    // Wait until authentication status is checked
    useEffect(() => {
        console.log("isLoggedIn:", isLoggedIn); // Log the value of isLoggedIn
        // Assuming `isLoggedIn` can change asynchronously
        if (isLoggedIn !== undefined) {
            setIsAuthChecked(true);
        }
    }, [isLoggedIn]);

    // If authentication status hasn't been checked yet, show loading state
    if (!isAuthChecked) {
        return <div><h1>Loading...</h1></div>;
    }


    return (
        <div>
            {isLoggedIn ? (
                <>
                    <TaskProvider>
                        <TopNavigationComp isLoggedIn={isLoggedIn} onLogout={logout} />
                        <Routes>
                            <Route path="/" element={<h1 style={{color: 'black'}}>Body Goes Here</h1>} />
                            <Route path="/tasks" element={
                                <div> 
                                    <TimeComp 
                                        title={"Start tid"} />
                                    <TimeComp title={"Slut tid"} />
                                </div>
                            } />
                            <Route path="/history" element={<HistoryComp />} />
                            <Route path="/notifications" element={<h1 style={{color: 'black'}}>Notifications Page</h1>} />
                        </Routes>
                        <BottomNavigationComp /> 
                    </TaskProvider>      
                </>
            ) : (
                <LoginComp onLogin={login} />
            )}
        </div>
    );
};

export default App;
