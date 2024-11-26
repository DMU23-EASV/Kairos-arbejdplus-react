import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./Services/AuthProvider";
import BottomNavigationComp from "./Components/BottomNavigationComp.tsx";
import TopNavigationComp from "./Components/TopNavigationComp.tsx";
import LoginComp from "./Components/LoginComp.tsx";
import React from "react";
import StartRegComp from "./Components/StartRegComp.tsx";


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
                        <Route path="/tasks" element={
                                <StartRegComp/>
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
