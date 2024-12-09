import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./Services/AuthProvider";
import BottomNavigationComp from "./Components/BottomNavigationComp.tsx";
import TopNavigationComp from "./Components/TopNavigationComp.tsx";
import LoginComp from "./Components/LoginComp.tsx";
import TimeComp from "./Components/TimeComp.tsx";
import React from "react";
import Usersettings from "./Components/UserSettingsComp.tsx";
import {User} from "./Models/User.ts";

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

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <TopNavigationComp isLoggedIn={isLoggedIn} onLogout={logout} />
                    <Routes>
                        <Route path="/" element={<h1 style={{color: 'black'}}>Body Goes Here</h1>} />

                        <Route path="/settings" element={
                            <Usersettings user={new User()}/>
                        } />

                        <Route path="/tasks" element={
                            <div> 
                                <TimeComp 
                                    title={"Start tid"} />
                                <TimeComp title={"Slut tid"} />
                            </div>
                        } />
                        <Route path="/history" element={<h1 style={{color: 'black'}}>History Page</h1>} />
                        <Route path="/notifications" element={<h1 style={{color: 'black'}}>Notifications Page</h1>} />

                    </Routes>
                    <BottomNavigationComp />
                    
                </>
            ) : (
                <LoginComp onLogin={login} />
            )}
        </div>
    );
};

export default App;
